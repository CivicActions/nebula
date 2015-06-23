On Monday afternoon we interviewed P. Tyson Kamikawa, 
Director of Shared Platforms and IT Effectiveness at Harvard Medical School.

We have published a [video](https://www.youtube.com/watch?v=NlZQSLsXYFA_) of this interview.

each comment attributed by initials to who said it - 

TK: What about including dosage in the drug variable? This is important to doctors' understanding of drug reaction. 
ET: Don't recall seeing in data stream
TK: Each drug should be listed at a certain dosage in the data 
- Dif't dosages then are separate products 
ET: Phase II tool - this is a good idea 
TK: When adverse event data collected, dosage was recorded 

TK: Short description of drug returned? 
RA: Was initially in wireframe
ET: Also Phase II? 
- Do you mean that it would appear while autocomplete pops up drug name? 
TK: That's one option, but what I was suggesting was a short sentence that would appear next to the drug selected in the list below. List could be stacked vertically, rather than on one horizontal line as it is now, with brief descriptions to the side of each drug, so that dr could confirm that they're looking at the right drug combo.  

TK: National vs name brand vs generic vs competing brands 
- NDC code - return NDC name? 
- Drug family - stack up all in same family - as severity (rates of incidence) tends to change between drug types - 
- Each dosage and each drug type has distinct name 
- Drugs.com - one is able to see comprehensive drug family info there
- Able to inquire after full range of drugs within a family at one time? 


Tyson basically confirmed the value of our approach for the "Caregiver" audience.  We
performed a value exercize with him of various features, and here is his input:

- $100 -- Basic "Caregiver" functionality, ability to see absolute number of adverse events
for a drug regimen
- $300 -- Abilty to see adverse events as a probability of usage (we believe this can be approximated with the AHRQ data)
- $200 -- Warming of incompatible drug regimen
- $200 -- "Blink chart" ability to easily compare multiple drug regimens
- $100 -- Print out reports for patients
- $100 -- Ability to compare severity

Although we did not get a dollar value for it, Tyson also wants a short description of the
drug family on the screen to avoid confusion of the drug name.  Addtionally, he suggested
knowing a set of drugs in the same family would be very valuable (Ron had already planned this.)

Tyson seemed to generally agree a goog architecture would be to provide a way for the
information to NOT be associated with Patient information in our system, but to preserve
a URL that could be saved and kept in the doctor's own Patient Information System if they choose to do so.
