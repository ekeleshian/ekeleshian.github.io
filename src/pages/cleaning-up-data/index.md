---
title: Part 1  Cleaning Up Data
date: "2018-06-13"
---

In this post, I will discuss my beginning approach to my first project, which revolves around financial literacy in the United States.  

With an extensive Google Scholar search, I found relevant data about the topic.  The database had some messy qualities.  I recall opening 
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

I wrote a python file, called "schema.py", that contained dictionaries of the survey's
alphanumeric codes and their respective translations. I first started decoding the attributes that expressed each survey question; for instance, the code "STATEQ" decodes to State.  Since there were 126 survey questions, there were 126 attributes, each decoded according to the nature of the survey question.

```python
survey_attributes = {'survey_code':'attribute'}
```

Then, I decoded the various codes for survey output.  For instance, if an item in the third question had a '2', and if the said question happened to be a true/false question, then the value '2' would be decoded to "False". The decoding process is an integral part in cleaning up the data.  The more time you spend cleaning up the data, the much higher chances of generating successful and insightful results about the data.

```python
output_codes = {"output1": {1: "True"}}
```

I then wrote a new python file, named "main.py" which contained a pipeline function, that when called, causes a chain of events in which the data frame tranforms into a readable and organized platform to work with.  

In my main function, I write the path of the csv file, save it as a pandas dataframe object, and finally save and run the dataframe through the aforementioned pipeline. 

```python

import pandas as pd
import schema

def new_columns(df): 
	df.rename(columns = schema.survey_attributes, inplace = True)
	return df

def convert_row_values(df):
	for k in schema.output_codes:
		dictionary = {k:dict(output_codes[k])}
		df.replace(to_replace = dictionary, inplace=True)
	return df


def pipeline(dataframe):
	modified_columns_df = new_columns(dataframe)
	master_df = convert_row_values(modified_columns_df)
	return master_df

def main():
	csv_path = '/Users/elizabethkeleshian/financial_literacy_analytics/2015_state_data.csv'
	df = pd.read_csv(csv_path)
	results = pipeline(df)


```
You will notice that when calling the pipeline function, two other functions are called, in order to convert the column and row data into workable content.  

And walla! You get a workable dataframe.

```python
/usr/bin/python2.7 /home/elizabeth/financial_literacy/main_.py
       RespondentID                 State      CensusDivision CensusRegion  \
0        2015010001               Arizona            Mountain         West   
1        2015010002                  Ohio  East North Central      Midwest   
2        2015010003              New York     Middle Atlantic    Northeast   
3        2015010004               Florida      South Atlantic        South   
4        2015010005            New Jersey     Middle Atlantic    Northeast   
5        2015010006              Missouri  West North Central      Midwest   
6        2015010007               Florida      South Atlantic        South   
7        2015010008               Arizona            Mountain         West   
8        2015010009        South Carolina      South Atlantic        South   
9        2015010010              New York     Middle Atlantic    Northeast   
10       2015010011            Washington             Pacific         West   
11       2015010012               Florida      South Atlantic        South   
12       2015010013           Connecticut         New England    Northeast   
13       2015010014                 Texas  West South Central        South   
14       2015010015                Kansas  West North Central      Midwest   
15       2015010016            California             Pacific         West   
16       2015010017           Connecticut         New England    Northeast   
17       2015010018            California             Pacific         West   
18       2015010019                 Texas  West South Central        South   
19       2015010020          Pennsylvania     Middle Atlantic    Northeast   
20       2015010021                 Texas  West South Central        South   
21       2015010022                 Texas  West South Central        South   
22       2015010023            California             Pacific         West   
23       2015010024          Pennsylvania     Middle Atlantic    Northeast   
24       2015010025              Michigan  East North Central      Midwest   
25       2015010026          Pennsylvania     Middle Atlantic    Northeast   
26       2015010027                 Texas  West South Central        South   
27       2015010028               Florida      South Atlantic        South   
28       2015010029                  Ohio  East North Central      Midwest   
29       2015010030           Connecticut         New England    Northeast
```


From here, I then imported the matplotlib.pyplot subpackage to generate some fun data visualizations.  Stay tuned to learn how I went about this as a data science n00b...