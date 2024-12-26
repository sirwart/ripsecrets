use crate::matcher::p_random::p_random;
use grep::matcher::{Match, Matcher, NoCaptures, NoError};
use regex::bytes::{Regex, RegexBuilder};
use std::collections::HashSet;
use std::error::Error;
pub mod p_random;

// We only flag random strings that occur on the same line as one of our four keywords
pub const RANDOM_STRING_REGEX: &str = r#"(?i:key|token|secret|password)\w*["']?]?\s*(?:[:=]|:=|=>|<-)\s*[\t "'`]?([\w+./=~-]{15,80})(?:[\t\n "'`]|$)"#;

#[derive(Clone, Debug)]
pub struct IgnoringMatcher {
    regex: Regex,
    ignore_regex: Regex,

    ignore_secrets: HashSet<Vec<u8>>, // A set of secrets that have been declared in the .secretsignore to ignore
}

impl IgnoringMatcher {
    pub fn new(
        pattern: &str,
        ignore_secrets: HashSet<Vec<u8>>,
    ) -> Result<IgnoringMatcher, Box<dyn Error>> {
        let regex = RegexBuilder::new(pattern).build()?;
        let ignore_regex =
            RegexBuilder::new(r"[^\n]*pragma: allowlist secret[^\n]*(?:\n|$)").build()?;
        Ok(IgnoringMatcher {
            regex,
            ignore_regex,
            ignore_secrets,
        })
    }
}

fn is_random(to_test: &[u8]) -> bool {
    let p = p_random(to_test);
    if p < 1.0 / 1e5 {
        return false;
    }
    let mut contains_num = false;
    for b in to_test {
        if *b >= b'0' && *b <= b'9' {
            contains_num = true;
            break;
        }
    }
    if !contains_num && p < 1.0 / 1e4 {
        return false;
    }
    return true;
}

impl Matcher for IgnoringMatcher {
    type Captures = NoCaptures;
    type Error = NoError;

    fn find_at(&self, haystack: &[u8], at: usize) -> Result<Option<Match>, NoError> {
        let mut pos = at;
        while pos < haystack.len() {
            let captures = self.regex.captures_at(haystack, pos);
            match captures {
                None => return Ok(None),
                Some(captures) => {
                    let mut m = captures.get(0).unwrap();
                    let mut is_submatch = false;
                    // Want to skip over the 0th (the entire match) and the 1st (the giant | statement of all patterns)
                    for i in 2..captures.len() {
                        if let Some(sub_match) = captures.get(i) {
                            m = sub_match;
                            is_submatch = true;
                            break;
                        }
                    }

                    if self.ignore_secrets.contains(&haystack[m.start()..m.end()]) {
                        pos = m.end();
                        continue;
                    }

                    let ignore = self.ignore_regex.find_at(haystack, m.end());
                    match ignore {
                        // If we match ignore on the same line then keep going
                        Some(ignore) => {
                            pos = ignore.end();
                        }
                        None => {
                            // If we matched on the random string detector check to make sure it's actually a random string
                            if is_submatch {
                                let potential_random_string = m.as_bytes();
                                if !is_random(potential_random_string) {
                                    pos = m.end();
                                    continue; // advance past this since we want to ignore
                                } else {
                                    // If we did hit the random string regex, we want to count the secret matched
                                    // As only the secret matched, not the entire regex match. This becomes especially
                                    // important when using the --only-matching option
                                    return Ok(Some(Match::new(m.start(), m.end())));
                                }
                            }
                            return Ok(Some(Match::new(m.start(), m.end())));
                        }
                    }
                }
            }
        }
        Ok(None)
    }

    fn new_captures(&self) -> Result<NoCaptures, NoError> {
        Ok(NoCaptures::new())
    }
}
