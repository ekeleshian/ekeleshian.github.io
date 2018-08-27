---
title: Are Americans Financially Literate?
date: 2018-08-27 15:46:42
---

### My Motivation

Ever since grad school and my time in education, this question has been pondering in my head almost to an annoying level, as it's a serious problem that we're facing in this country, and that is....

_Most Americans do not know what they're doing with their money._

Here is the formal definition of [financial literacy](https://www.investopedia.com/terms/f/financial-literacy.asp): 

>Financial literacy is the education and understanding of various financial areas including topics related to managing personal finance, money and investing. This topic focuses on the ability to manage personal finance matters in an efficient manner, and it includes the knowledge of making appropriate decisions about personal finance such as investing, insurance, real estate, paying for college, budgeting, retirement and tax planning.


I explored the world of financial literacy in my Master's program at University of Pennsylvania, where I participated and investigated the effects of Wharton's [Bridges to Wealth](http://www.bridgestowealth.org/) program.  Big realizations were made here:

1) When young people are **properly educated** about compound interest, they are very likely to start investing.

2) **Collaboration** and group-led **discussions** are an integral part of bringing new people into the practice of investing.

3) **Barriers to access** is a very real problem in impoverished urban areas, where much needed credit unions are scarce or simply quiet.

4) The **social capital** that you have from your environment strongly dictates how you're going to manage your money.

5) **Home-owners** are more likely to spend their money wisely than **renters**. 

These realizations, which were then fleshed out in my thesis, were backed by **personal observations**, **survey data**, and **interviews**. But as I reflect about the thesis I wrote three years ago, I wish that my analysis contained more stats to quantify my realizations: my foundings were determined by a taking a _qualitative_ approach on the data, building up a narrative about attributes that _could potentially_ affect financial literacy.

Therefore, my motivation with this project is to justify these realizations with statistics. In other words, I want to approach this project in the eyes of a **data scientist**.

So, let's go!
___________________________________________________

### The Data

The [National Financial Capability Study](http://www.usfinancialcapability.org/downloads.php) assesses the overall financial capability of the national population. Data collection was done by each state across a large sample. I obtained their data over a Google Scholar search. 

I wrote and ran two python files in order to process the data in a format I wanted, in addition to aggregating over certain columns in order to generate a new metric. One of the python files just stored dictionaries of key-value pairs that allowed to convert labels, and the other python file behaved like a pipeline, cleaning up the data and adding more attributes. After I run the code, a new dataframe is generated and saved in a csv, called ```correct_data.csv```, which can now allow me to play with it in this jupyter notebook.

Here's a glimpse of the processed data:


```python
import pandas as pd
```


```python
df = pd.read_csv("./correct_data.csv")


```

So, let's take a look at some simple stats first


```python
df.count().head(10)
```




    NFCSID                   27564
    State                    27564
    CensusDivision           27564
    CensusRegion             27564
    Gender                   27564
    AgeGroup                 27564
    Gender/AgeNet            27564
    Ethnicity                27564
    HighestLevelEducation    27564
    MaritalStatus            27564
    dtype: int64




```python
len(df.columns)
```




    127



The data is a lot. Notice that I only printed out just the first 10 columns, indicating that many other columns aren't printed on the screen.

Let's pick out some interesting columns to start.

I want to start with the ```financialliteracyscore``` column, as this is the column that I created. It measures a person's level of comprehension on financial literacy. I created this metric based on the definition mentioned earlier: the **knowledge of compound interest**, the practice of **planning for the future**, and basic **money management**, including budgeting and owning a savings account*. 

*_By the way, the nitty-gritty of how I went about this is in my prior blog post, [Playing with Financial Literacy Data](https://ekeleshian.github.io/playing-with-data/)_.


```python
df['financialliteracyscore'].describe()
```




    count    27564.000000
    mean        34.669752
    std         17.734525
    min         -7.407407
    25%         22.222222
    50%         33.333333
    75%         48.148148
    max         81.481481
    Name: financialliteracyscore, dtype: float64




_Side note: the lowest score here is negative because some of the columns I aggregated over were metrics that would pull the score down. For instance, if a surveyee answered that they have too much debt, their score went down two points; if they use their credit cards for a cash advance, the score went down one point. The weight of this negative score was arbitruary somewhat, just based on my own perception about how bad that quality is relative to the other negative attributes. The entire rubric I created is in my prior blog [Playing with Financial Literacy Data](https://ekeleshian.github.io/playing-with-data/)_; *the rubric is called* ```dictionary_of_parameters``` *for reference.*


```python
import decimal

def rounding(num):
    num = decimal.Decimal(num)
    return round(num, 2)
    
percentile_75 = df['financialliteracyscore'].quantile(q=.75)
percentile_98 = df['financialliteracyscore'].quantile(q=.98)

print(f'Financial literacy score in the 75th percentile: {rounding(percentile_75)}%')
print(f'Financial literacy score in the 98th percentile: {rounding(percentile_98)}%')
```

    Financial literacy score in the 75th percentile: 48.15%
    Financial literacy score in the 98th percentile: 70.37%


Already, the stats looks alarming.  75% of surveyees score around 50% on this financial literacy assessment, meaning three-fourths of Americans failed the test.

Furthermore, **only 2%** of Americans know a decent amount of financial literacy, as they passed the test.

I feel like I have seen this 2% with regards to people and money before....

![Homer thinking](homer_thinking.jpg)

What I really want to do now is to partition the data into two groups: those who failed the test (98% of the paricipants) vs those who didn't (2% of the participants).  Then, with feature engineering, I can hopefully figure out the particular factors that determine financial literacy proficiency.

But before I do that, I need to make sure that this partition is reasonable, as it was determined by a metric that I created.  So, I will test my financial literacy metric by comparing the two groups with parameters that I did not use in my financial literacy metric calculation.

In turn, I will compare the two groups by the following parameters:

1) Household Income

2) Highest level of education

3) Whether they received financial education at work, school, or at home.

4) Own a home

5) Math abilities

These parameters typically correlate with financial literacy competence, but they're not included in my financial literacy metric. If my financial literacy metric is a reliable one, then these parameters should correlate nicely with the test results.

___________________________________________________



### Partitioning the data


```python
bottom_98 = df[df['financialliteracyscore'] < 70]
```


```python
top_2 = df[df['financialliteracyscore'] >= 70]
```

____________________________________________________
## Comparing Household Income

As mentioned before, I will first verify that my financial literacy metric is a reliable one, by comparing it with certain attributes that weren't used to calculate the metric. First, I will compare their household income.  

_As a side note: since we're dealing with uneven sample sizes, metrics will be determined in relative terms, i.e. percentages._


```python
def percent_calculator(df, **kwargs):
    for key, value in kwargs.items():
        if key == 'column':
            label = value
        if key == 'response':
            response = value
    numerator = df[df[label] == response][label].count()
    no_nulls = df[df[label] != 99]
    denominator = no_nulls[label].count()
    return rounding(numerator*1.0/denominator * 100)
```


```python
income_98 = bottom_98['HouseholdIncome']
income_98.value_counts().plot('bar')
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7f47649cbba8>




![png](output_18_1.png)



```python
income_2 = top_2['HouseholdIncome']
income_2.value_counts().plot('bar')
```




    <matplotlib.axes._subplots.AxesSubplot at 0x7f476493e470>




![png](output_19_1.png)



```python
income_98.value_counts(normalize = True)

```




    [50k, 75k)      0.205368
    [35k, 50k)      0.149237
    [70k, 100k)     0.134462
    [100k, 150k)    0.118090
    [0, 15K)        0.117348
    [15k, 25k)      0.110777
    [25k, 35k)      0.110740
    150k+           0.053978
    Name: HouseholdIncome, dtype: float64




```python
income_2.value_counts(normalize = True)
```




    [100k, 150k)    0.298246
    150k+           0.253589
    [70k, 100k)     0.196172
    [50k, 75k)      0.188198
    [35k, 50k)      0.047847
    [25k, 35k)      0.009569
    [15k, 25k)      0.004785
    [0, 15K)        0.001595
    Name: HouseholdIncome, dtype: float64




```python
print(f'Percent of low-income surveyees from the bottom 98%: {rounding((0.118694 + 0.112046+ 0.111783)*100)}%')
print(f'Percent of low-income surveyees from the top 2%: {rounding((0.002125 + 0.004251 + 0.013815)*100)}%')
```

    Percent of low-income surveyees from the bottom 98%: 34.25%
    Percent of low-income surveyees from the top 2%: 2.02%



```python
print(f'Percent of surveyees with income more than 100K from the bottom 98%: {rounding((0.115915 +0.051985)*100)}%')
print(f'Percent of surveyees with income more than 100K from the top 2%: {rounding((0.299681 + 0.243358)*100)}%')
```

    Percent of surveyees with income more than 100K from the bottom 98%: 16.79%
    Percent of surveyees with income more than 100K from the top 2%: 54.30%


Those in the top 2% significantly earn more money than the bottom 98%.  Since income typically correlates with financial literacy, we're off to a good start.
___________________________________________________________________

## Comparing Level of Education


```python
education_98 = bottom_98['HighestLevelEducation']
education_2 = top_2['HighestLevelEducation']
education_98.value_counts(normalize = True)

```




    College, no degree     0.283699
    Bachelor's             0.226566
    HS diploma             0.163938
    Post Graduate          0.131084
    Associate's            0.109960
    GED or alternative     0.062813
    Did not complete HS    0.021940
    Name: HighestLevelEducation, dtype: float64




```python
education_2.value_counts(normalize=True)
```




    Post Graduate         0.344498
    Bachelor's            0.342903
    College, no degree    0.154705
    Associate's           0.098884
    HS diploma            0.049442
    GED or alternative    0.009569
    Name: HighestLevelEducation, dtype: float64




```python
print(f'Percent of surveyees from bottom 98% who did not attend college: {rounding((0.284866+ 0.165045+ 0.022199+0.063366)*100)}%')
```

    Percent of surveyees from bottom 98% who did not attend college: 53.55%



```python
print(f'Percent of surveyees from top 2% who did not attend college: {rounding((0.164718+ 0.056323+0.011690 )*100)}%')
```

    Percent of surveyees from top 2% who did not attend college: 23.27%


According to the percentages above, those in the top 2% are relatively more educated. This correlates nicely with the financial literacy metric. 

__________________________________________________________________

## Comparing Financial Education


```python
target = ["FinancialEducationOfferedAtSchoolOrWork?", 
          "ReceiveFinancialEducationInHighSchool?",
          "ReceiveFinancialEducationInCollege?", 
          "ReceiveFinancialEducationFromWork?",
          "ReceiveFinancialEducationFromMilitary?",
          "ParentsTeachYouAboutFinance?",
         ]
```


```python
fin_ed_98 = bottom_98[target]

fin_ed_98 = fin_ed_98[fin_ed_98['FinancialEducationOfferedAtSchoolOrWork?']!= 99]
# fin_ed_98.hist(column = "FinancialEducationOfferedAtSchoolOrWork?")
import matplotlib.pyplot as plt

plt.hist(fin_ed_98['FinancialEducationOfferedAtSchoolOrWork?'])
plt.xlabel('Responses')
plt.ylabel('Frequency')
plt.text(0, 12000, '0 = IDK\n1 = Yes, but did not participate \n2 = Yes, and participate \n3 = No')
```




    Text(0,12000,'0 = IDK\n1 = Yes, but did not participate \n2 = Yes, and participate \n3 = No')




![png](output_32_1.png)



```python
fin_ed_2 = top_2[target]
fin_ed_2 = fin_ed_2[fin_ed_2['FinancialEducationOfferedAtSchoolOrWork?']!=99]

plt.hist(fin_ed_2['FinancialEducationOfferedAtSchoolOrWork?'])
plt.xlabel('Responses')
plt.ylabel('Frequency')
plt.text(0, 350, '0 = IDK\n1 = Yes, but did not participate \n2 = Yes, and participate \n3 = No')
```




    Text(0,350,'0 = IDK\n1 = Yes, but did not participate \n2 = Yes, and participate \n3 = No')




![png](output_33_1.png)



```python
fin_ed_2['FinancialEducationOfferedAtSchoolOrWork?'].value_counts(normalize=True)
```




    3    0.467021
    2    0.402128
    1    0.081915
    0    0.048936
    Name: FinancialEducationOfferedAtSchoolOrWork?, dtype: float64




```python
fin_ed_98['FinancialEducationOfferedAtSchoolOrWork?'].value_counts(normalize=True)
```




    3    0.588611
    2    0.212364
    1    0.099683
    0    0.099343
    Name: FinancialEducationOfferedAtSchoolOrWork?, dtype: float64



**40% of the top 2** received financial education from school/work, and only **21% of the bottom 98** received financial education from school/work. 



```python
fin_ed_98 = bottom_98[target]
fin_ed_copy_98=fin_ed_98.copy()
fin_ed_copy_98 = fin_ed_copy_98[fin_ed_copy_98['ParentsTeachYouAboutFinance?'] != 99]

plt.hist(fin_ed_copy_98["ParentsTeachYouAboutFinance?"])
plt.xlabel('Responses')
plt.ylabel('Frequency')
plt.text(0, 12000, '0 = IDK\n1 = Yes\n2 = No')

```




    Text(0,12000,'0 = IDK\n1 = Yes\n2 = No')




![png](output_37_1.png)



```python
fin_ed_2 = top_2[target]
fin_ed_copy_2=fin_ed_2.copy()
fin_ed_copy_2 = fin_ed_copy_2[fin_ed_copy_2['ParentsTeachYouAboutFinance?'] != 99]

plt.hist(fin_ed_copy_2["ParentsTeachYouAboutFinance?"])
plt.xlabel('Responses')
plt.ylabel('Frequency')
plt.text(0, 600, '0 = IDK\n1 = Yes\n2 = No')
```




    Text(0,600,'0 = IDK\n1 = Yes\n2 = No')




![png](output_38_1.png)



```python
fin_ed_copy_98['ParentsTeachYouAboutFinance?'].value_counts(normalize=True)
```




    2    0.518070
    1    0.452904
    0    0.029026
    Name: ParentsTeachYouAboutFinance?, dtype: float64




```python
fin_ed_copy_2['ParentsTeachYouAboutFinance?'].value_counts(normalize=True)
```




    1    0.726886
    2    0.270988
    0    0.002125
    Name: ParentsTeachYouAboutFinance?, dtype: float64



**45% from the bottom 98** claimed that their parents taught them about finance, as opposed to **73% from the top 2** 

________________________________________________

So far, I have demonstrated stark constrasts between the two groups by comparing attributes that weren't included in my financial literacy metric.  This means that I am on the right track in terms of verifying that this partition makes sense. I have two more comparisons to make, the next one being owning a home.

## Comparing Home Ownership


```python
copy_bottom_98 = bottom_98.copy()
copy_bottom_98 = copy_bottom_98[copy_bottom_98['OwnHome?']!=99]
plt.hist(copy_bottom_98["OwnHome?"])
plt.xlabel('Responses')
plt.ylabel('Frequency')
plt.text(0, 12000, '0 = IDK\n1 = Yes\n2 = No')
```




    Text(0,12000,'0 = IDK\n1 = Yes\n2 = No')




![png](output_43_1.png)



```python
copy_top_2 = top_2.copy()
copy_top_2 = copy_top_2[copy_top_2['OwnHome?']!=99]
plt.hist(copy_top_2["OwnHome?"])
plt.xlabel('Responses')
plt.ylabel('Frequency')
plt.text(0, 300, '0 = IDK\n1 = Yes\n2 = No')
```




    Text(0,300,'0 = IDK\n1 = Yes\n2 = No')




![png](output_44_1.png)



```python
copy_bottom_98['OwnHome?'].value_counts(normalize =True)

```




    1    0.61616
    2    0.37946
    0    0.00438
    Name: OwnHome?, dtype: float64




```python
copy_top_2['OwnHome?'].value_counts(normalize=True)
```




    1    0.928799
    2    0.070138
    0    0.001063
    Name: OwnHome?, dtype: float64



**38% of the bottom 98** don't own a home, as opposed to **7% of the top 2**.

______________________________________________________________

## Comparing Math Ability

This is the last attribute I will use to compare the split and hopefully will be able to validate my partitioning.


```python
copy_math_98 = bottom_98[bottom_98['GoodAtMath?']!=99]
plt.hist(copy_math_98["GoodAtMath?"])
plt.xlabel('Responses')
plt.ylabel('Frequency')
plt.text(0, 8000, '0 = IDK\n1 = Strongly Disagree \n4 = Neither agree nor disagree \n7 = Strongly Agree')
```




    Text(0,8000,'0 = IDK\n1 = Strongly Disagree \n4 = Neither agree nor disagree \n7 = Strongly Agree')




![png](output_48_1.png)



```python
copy_math_2 =top_2[top_2['GoodAtMath?']!=99]
plt.hist(copy_math_2["GoodAtMath?"])
plt.xlabel('Responses')
plt.ylabel('Frequency')
plt.text(1, 600, '0 = IDK\n1 = Strongly Disagree \n4 = Neither agree nor disagree \n7 = Strongly Agree')
```




    Text(1,600,'0 = IDK\n1 = Strongly Disagree \n4 = Neither agree nor disagree \n7 = Strongly Agree')




![png](output_49_1.png)



```python
copy_math_98['GoodAtMath?'].value_counts(normalize=True)
```




    7    0.391393
    6    0.256746
    5    0.145802
    4    0.105781
    3    0.039833
    1    0.034255
    2    0.022159
    0    0.004032
    Name: GoodAtMath?, dtype: float64




```python
copy_math_2['GoodAtMath?'].value_counts(normalize=True)
```




    7    0.847872
    6    0.098936
    5    0.037234
    4    0.009574
    1    0.003191
    3    0.002128
    2    0.001064
    Name: GoodAtMath?, dtype: float64




```python

plt.boxplot([copy_math_98['GoodAtMath?'], 
            copy_math_2['GoodAtMath?']], labels=['Bottom 98', 'Top 2'])
```




    {'whiskers': [<matplotlib.lines.Line2D at 0x7f8e4edf2940>,
      <matplotlib.lines.Line2D at 0x7f8e4edf2dd8>,
      <matplotlib.lines.Line2D at 0x7f8e4ed80748>,
      <matplotlib.lines.Line2D at 0x7f8e4ed80b70>],
     'caps': [<matplotlib.lines.Line2D at 0x7f8e4edf8240>,
      <matplotlib.lines.Line2D at 0x7f8e4edf8668>,
      <matplotlib.lines.Line2D at 0x7f8e4ed80f98>,
      <matplotlib.lines.Line2D at 0x7f8e4ed89400>],
     'boxes': [<matplotlib.lines.Line2D at 0x7f8e4edf27f0>,
      <matplotlib.lines.Line2D at 0x7f8e4ed802e8>],
     'medians': [<matplotlib.lines.Line2D at 0x7f8e4edf8a90>,
      <matplotlib.lines.Line2D at 0x7f8e4ed89828>],
     'fliers': [<matplotlib.lines.Line2D at 0x7f8e4edf8eb8>,
      <matplotlib.lines.Line2D at 0x7f8e4ed89c50>],
     'means': []}




![png](output_52_1.png)


**39% of the bottom 98** claim strongly that they're good at math, as opposed to **85% of the top 2**. Furthermore, the spread of responses is much larger from the bottom 98 when examining the box plot and histograms directly above.

### Summary:

| Comparison       | Top 2 %         | Bottom 98%  |
| :------------- :|:-------------:| :-----:|
| Household Income | 54% earn more than 100K | 17% earn more than 100K |
| Highest Level of Education   |  23% did not attend college    |  54%   did not attend college|
| Financial Education| 40% received from work or school; 73% received from parents     | 21% received from work or school; 45% received from parents
|Home Ownership  | 7% do not own home | 38% do not own home|
| Math Abilities  | 85% very confident in abilities | 39% very confident in abilities|
