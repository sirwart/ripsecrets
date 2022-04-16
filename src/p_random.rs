use std::collections::hash_map::HashMap;
use std::collections::hash_set::HashSet;

use memoize::memoize;

pub fn p_random(s: &[u8]) -> f64 {
    return p_random_distinct_values(s) * p_random_char_class(s) * p_random_bigrams(s);
}

fn p_random_bigrams(s: &[u8]) -> f64 {
    let bigrams_bytes = b"er,te,an,en,ma,ke,10,at,/m,on,09,ti,al,io,.h,./,..,ra,ht,es,or,tm,pe,ml,re,in,3/,n3,0F,ok,ey,00,80,08,ss,07,15,81,F3,st,52,KE,To,01,it,2B,2C,/E,P_,EY,B7,se,73,de,VP,EV,to,od,B0,0E,nt,et,_P,A0,60,90,0A,ri,30,ar,C0,op,03,ec,ns,as,FF,F7,po,PK,la,.p,AE,62,me,F4,71,8E,yp,pa,50,qu,D7,7D,rs,ea,Y_,t_,ha,3B,c/,D2,ls,DE,pr,am,E0,oc,06,li,do,id,05,51,40,ED,_p,70,ed,04,02,t.,rd,mp,20,d_,co,ro,ex,11,ua,nd,0C,0D,D0,Eq,le,EF,wo,e_,e.,ct,0B,_c,Li,45,rT,pt,14,61,Th,56,sT,E6,DF,nT,16,85,em,BF,9E,ne,_s,25,91,78,57,BE,ta,ng,cl,_t,E1,1F,y_,xp,cr,4F,si,s_,E5,pl,AB,ge,7E,F8,35,E2,s.,CF,58,32,2F,E7,1B,ve,B1,3D,nc,Gr,EB,C6,77,64,sl,8A,6A,_k,79,C8,88,ce,Ex,5C,28,EA,A6,2A,Ke,A7,th,CA,ry,F0,B6,7/,D9,6B,4D,DA,3C,ue,n7,9C,.c,7B,72,ac,98,22,/o,va,2D,n.,_m,B8,A3,8D,n_,12,nE,ca,3A,is,AD,rt,r_,l-,_C,n1,_v,y.,yw,1/,ov,_n,_d,ut,no,ul,sa,CT,_K,SS,_e,F1,ty,ou,nG,tr,s/,il,na,iv,L_,AA,da,Ty,EC,ur,TX,xt,lu,No,r.,SL,Re,sw,_1,om,e/,Pa,xc,_g,_a,X_,/e,vi,ds,ai,==,ts,ni,mg,ic,o/,mt,gm,pk,d.,ch,/p,tu,sp,17,/c,ym,ot,ki,Te,FE,ub,nL,eL,.k,if,he,34,e-,23,ze,rE,iz,St,EE,-p,be,In,ER,67,13,yn,ig,ib,_f,.o,el,55,Un,21,fi,54,mo,mb,gi,_r,Qu,FD,-o,ie,fo,As,7F,48,41,/i,eS,ab,FB,1E,h_,ef,rr,rc,di,b.,ol,im,eg,ap,_l,Se,19,oS,ew,bs,Su,F5,Co,BC,ud,C1,r-,ia,_o,65,.r,sk,o_,ck,CD,Am,9F,un,fa,F6,5F,nk,lo,ev,/f,.t,sE,nO,a_,EN,E4,Di,AC,95,74,1_,1A,us,ly,ll,_b,SA,FC,69,5E,43,um,tT,OS,CE,87,7A,59,44,t-,bl,ad,Or,D5,A_,31,24,t/,ph,mm,f.,ag,RS,Of,It,FA,De,1D,/d,-k,lf,hr,gu,fy,D6,89,6F,4E,/k,w_,cu,br,TE,ST,R_,E8,/O";
    let bigrams = bigrams_bytes.split(|b| *b == ',' as u8);
    let bigrams_set = HashSet::<_>::from_iter(bigrams);

    let mut num_bigrams = 0;
    for i in 0..s.len() - 1 {
        let bigram = &s[i..=i + 1];
        if bigrams_set.contains(&bigram) {
            num_bigrams += 1;
        }
    }
    return p_binomial(
        s.len(),
        num_bigrams,
        (bigrams_set.len() as f64) / (64.0 * 64.0),
    );
}

fn p_random_char_class(s: &[u8]) -> f64 {
    let mut num_numbers = 0;
    for b in s {
        if *b >= '0' as u8 && *b < '9' as u8 {
            num_numbers += 1;
        }
    }
    return p_binomial(s.len(), num_numbers, 10.0 / 64.0);
}

fn p_binomial(n: usize, x: usize, p: f64) -> f64 {
    let left_tail = (x as f64) < n as f64 * p;
    let min = if left_tail { 0 } else { x };
    let max = if left_tail { x } else { n };

    let mut total_p = 0.0;
    for i in min..=max {
        total_p += factorial(n) / (factorial(n - i) * factorial(i))
            * p.powi(i as i32)
            * (1.0 - p).powi((n - i) as i32);
    }
    return total_p;
}

fn factorial(n: usize) -> f64 {
    let mut res = 1.0;
    for i in 2..=n {
        res *= i as f64;
    }
    return res;
}

fn p_random_distinct_values(s: &[u8]) -> f64 {
    let total_possible: f64 = (64 as f64).powi(s.len() as i32);
    let num_distinct_values = count_distinct_values(s);
    let mut num_more_extreme_outcomes: f64 = 0.0;
    for i in 1..=num_distinct_values {
        num_more_extreme_outcomes += num_possible_outcomes(s.len(), i, 64);
    }
    return num_more_extreme_outcomes / total_possible;
}

fn count_distinct_values(s: &[u8]) -> usize {
    let mut values_count = HashMap::<u8, usize>::new();
    for b in s {
        let count = values_count.entry(*b).or_insert(0);
        *count += 1;
    }
    return values_count.len();
}

fn num_possible_outcomes(num_values: usize, num_distinct_values: usize, base: usize) -> f64 {
    let mut res = base as f64;
    for i in 1..num_distinct_values {
        res *= (base - i) as f64;
    }
    res *= num_distinct_configurations(num_values, num_distinct_values) as f64;
    return res;
}

fn num_distinct_configurations(num_values: usize, num_distinct_values: usize) -> f64 {
    if num_distinct_values == 1 || num_distinct_values == num_values {
        return 1.0;
    }
    return num_distinct_configurations_aux(
        num_distinct_values,
        0,
        num_values - num_distinct_values,
    );
}

#[memoize]
fn num_distinct_configurations_aux(
    num_positions: usize,
    position: usize,
    remaining_values: usize,
) -> f64 {
    if remaining_values == 0 {
        return 1.0;
    }
    let mut num_configs = 0.0;
    if position + 1 < num_positions {
        num_configs +=
            num_distinct_configurations_aux(num_positions, position + 1, remaining_values);
    }
    num_configs += (position + 1) as f64
        * num_distinct_configurations_aux(num_positions, position, remaining_values - 1);
    return num_configs;
}

#[test]
fn test_p_random_distinct_values() {
    assert_eq!(count_distinct_values(b"abca"), 3);

    assert_eq!(num_distinct_configurations(3, 2), 3.0);
    assert_eq!(num_distinct_configurations(4, 3), 6.0);
    assert_eq!(num_distinct_configurations(4, 2), 7.0);
    assert_eq!(num_distinct_configurations(6, 4), 65.0);
    assert_eq!(num_possible_outcomes(32, 1, 64), 64.0);

    assert_eq!(p_random_distinct_values(b"aaaaaaaaa") < 1.0 / 1e6, true);
    assert_eq!(p_random_distinct_values(b"abcdefghi") > 1.0 / 1e6, true);
}

#[test]
fn test_binomial() {
    assert_eq!(p_binomial(2, 0, 0.5), 0.25);
    assert_eq!(p_binomial(2, 1, 0.5), 0.75);
    assert_eq!(p_random_bigrams(b"hello_world") < 1.0 / 1e4, true);
}

#[test]
fn test_p_random() {
    assert_eq!(p_random(b"hello_world") < 1.0 / 1e6, true);
    assert_eq!(
        p_random(b"pk_test_TYooMQauvdEDq54NiTphI7jx") > 1.0 / 1e4,
        true
    );
    assert_eq!(
        p_random(b"sk_test_4eC39HqLyjWDarjtT1zdp7dc") > 1.0 / 1e4,
        true
    );
}
