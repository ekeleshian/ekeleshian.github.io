---
title: Exploring Data on Financial Literacy
date: "2018-06-10"
---

My recent project, which I feel very excited about,
is centered on financial literacy data in the US.  Due to my academic 
background in this topic, I have been very eager to explore financial
literacy amongst Americans. Luckily, I found some awesome
 data with a pretty extensive Google Scholar search. A questionnairre was
distributed in 2015, asking Americans about their monetary management skills,
spending behavior, investments (if any), plans for 
retirement, and a six-question quiz assessing the surveyee's 
financial knowledge.  The database contained more than 27,000 survey submissions, each
generating more than 100 data points of responses.

This database had some messy qualities.  I recall opening 
the csv file into Excel and feeling totally dumbfounded; the data
looked meaningless -- just rows of arbitrary alphanumeric
sequences that deemed it impossible to do any analysis. 
Fortunately, in the directory of this database also included a pdf file of a key of all
alpha numeric codes and their translations.  It contained the 
question and multiple choices of every survey question from the data. 
With this access, I realized that luck played a huge role with 
getting this project started (and that Google is amazing!). So, this prompted
me to clean up the data, reformatting the data so that it was actually
readable.   

I wrote a python file that contained dictionaries of the survey's
alphanumeric codes and their respective translations.

![Decoding Questions](./Screen Shot 2018-06-10 at 4.14.43 PM.png)



I wrote a chain of functions that call 




