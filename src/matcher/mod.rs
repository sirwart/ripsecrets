use crate::matcher::p_random::p_random;
use grep::matcher::{Match, Matcher, NoCaptures, NoError};
use regex::bytes::{Regex, RegexBuilder};
use std::collections::HashSet;
use std::error::Error;
pub mod p_random;

// We only flag random strings that occur on the same line as one of our four keywords
pub const RANDOM_STRING_REGEX: &str = r#"(?:secret|token|key|password|Secret|SECRET|Token|TOKEN|Key|KEY|Password|PASSWORD)\w*\s*(?:=|:)\s*['"` \t]([A-Za-z0-9+/_\-.~=]{15,80})(?:['"` \t\n]|$)"#;

#[derive(Clone, Debug)]
pub struct IgnoringMatcher {
    regex: Regex,
    ignore_regex: Regex,
    random_string_regex: Regex,

    ignore_secrets: HashSet<Vec<u8>>, // A set of secrets that have been declared in the .secretsignore to ignore
}

impl IgnoringMatcher {
    pub fn new(
        pattern: &str,
        ignore_secrets: HashSet<Vec<u8>>,
    ) -> Result<IgnoringMatcher, Box<dyn Error>> {
        let regex = RegexBuilder::new(pattern).build()?;
        let ignore_regex =
            RegexBuilder::new("[^\\n]*pragma: allowlist secret[^\\n]*(?:\\n|$)").build()?;
        let random_string_regex = RegexBuilder::new(RANDOM_STRING_REGEX).build()?;
        Ok(IgnoringMatcher {
            regex,
            ignore_regex,
            random_string_regex,
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
        if *b >= '0' as u8 && *b <= '9' as u8 {
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
            let m = self
                .regex
                .find_at(haystack, pos)
                .map(|m| Match::new(m.start(), m.end()));
            match m {
                None => return Ok(None),
                Some(m) => {
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
                            // TODO: Don't run another regex, since that can mask secrets.
                            //       Instead look at the capture location of the original regex
                            let mut random_locs = self.random_string_regex.capture_locations();
                            let random = self.random_string_regex.captures_read_at(
                                &mut random_locs,
                                haystack,
                                m.start(),
                            );
                            if random.is_some() && random.unwrap().start() == m.start() {
                                let str_pos = random_locs.get(1).unwrap();
                                let potential_random_string = &haystack[str_pos.0..str_pos.1];

                                if self.ignore_secrets.contains(potential_random_string)
                                    || !is_random(potential_random_string)
                                {
                                    pos = m.end();
                                    continue; // advance past this since we want to ignore
                                }
                            }
                            return Ok(Some(m));
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
