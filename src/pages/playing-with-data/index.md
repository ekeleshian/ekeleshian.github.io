---
title: Part 2 Playing With Data
date: 2018-07-10 11:59:19

---


This post is a continuation of my [Part 1 Cleaning Up Data](https://ekeleshian.github.io/cleaning-up-data/) post, in which I describe my beginning approach to answer the _so what?!_ from financial literacy data.  After cleaning it up, AKA converting the column values into names that are actually sensable and quantifying string values into integers, what can come out of this data?  What kind of point should come across this information pertaining the financial literacy levels amongst people living in the US? 

To be perfectly frank, the mere volume of the dataset really intimidated me at the beginning.  ```count()``` sums up the numbers of observations nicely, so if you apply it, here is the result:

```python
print(df.count())

State                                                        27564
CensusDivision                                               27564
CensusRegion                                                 27564
Gender                                                       27564
AgeGroup                                                     27564
Gender/AgeNet                                                27564
Ethnicity                                                    27564
HighestLevelEducation                                        27564
MaritalStatus                                                27564
LivingArrangements                                           27564
MaritalStatusVariable                                        27564
Dependents                                                   27564
HouseholdIncome                                              27564
USVeteran?                                                   27564
EndOfMilitaryService                                         27564
RetireFromMilitary?                                          27564
SpouseUSVeteran?                                             27564
X3                                                           27564
X4                                                           27564
CurrentWorkStatus                                            27564
SpouseCurrentWorkStatus                                      27564
HouseholdRetirementStatus                                    27564
PartTimeStudent?                                             27564
TypeSchool                                                   27564
WhoExpertInFinances                                          27564
SatisfactionLevelCurrentFinances                             27564
WillingnessFinancialRisk                                     27564
SpendingVsIncome                                             27564
DifficultyLevelPayingBills                                   27564
EmergencyFunds?                                              27564
                                                             ...  
BoughtAtPawnShop?                                            27564
SoldAtPawnShop?                                              27564
PawnedAtPawnShop?                                            27564
DontKnowAtPawnShop?                                          27564
NoAnswerAtPawnShop                                           27564
DebtCollection?                                              27564
TooMuchDebt?                                                 27564
HealthInsurance?                                             27564
NoMedicineBecauseCost?                                       27564
SkippedMedicalTestBecauseCost?                               27564
IgnoreMedicalProblemBecauseCost?                             27564
GoodWithYourMoney?                                           27564
GoodAtMath?                                                  27564
FinancialKnowledge?                                          27564
FinancialEducationOfferedAtSchoolOrWork?                     27564
ReceiveFinancialEducationInHighSchool?                       27564
ReceiveFinancialEducationInCollege?                          27564
ReceiveFinancialEducationFromWork?                           27564
ReceiveFinancialEducationFromMilitary?                       27564
ParentsTeachYouAboutFinance?                                 27564
FinancialTestQ1                                              27564
FinancialTestQ2                                              27564
FinancialTestQ3                                              27564
FinancialTestQ4                                              27564
FinancialTestQ5                                              27564
FinancialTestQ6                                              27564
NationalWeightByAgeGenderEthnicityEducationCensusDivision    27564
DivisionalWeightByAgeGenderEthnicityEducationState           27564
StateWeightByAgeGenderEthnicityEducation                     27564
financialliteracyscore                                       27564
Length: 126, dtype: int64
```

As a n00b, this was A LOT of data to wrap my head around.  Not only was the volume intimidating, but was also my self-imposed pressure of making sure I applied new concepts from tutorials.  I had so many questions...._Which columns should I group by?_..._Which columns should I aggregate over?_... _What kind of aggregations should be calculated?_ ..._Wait. What about linear regression. How should I apply that?!_ 

When my mind feels flustered like this, my gut instict tells me that I need to talk it over with a professional.  So, that's what I did. Thankfully, with my networking at meetups, I met a new friend who was a developer at Slack who then introduced me to their main data guru, Roy.  To sum it up, here is what was suggested:

+ What is the problem?
+ How can you represent this problem in a way that _anyone_ can be compelled by it?
- Why should we care?

Our conversation was invaluable for me, as I learned so much just within that hour.  I think the main message, AKA, the main hurdle that I still have yet to overcome, was this: 

_Don't over-analyze the problem - the time you spend thinking about all the ways the project can be better is just a waste of time if you don't have any code to start with._ 

What is most important is results.  The optimization piece of the project should not be a topic of conversation until there are some desirable results with already written code.  Furthermore, I shouldn't expect myself to know how to optimize my own code as a n00b; this matter is one that needs the attention of a mentor to help you guide through the process of validating the calculations and optimizing the algorithms.

After my talk with Roy, I went home with my mind flooded with ideas.  So, I wrote a to-do list:

1. Define the problem, clearly and succinctly.  What I want to prove is: _financial literacy is significantly underserved in our education system._
2. Scan the survey to flag columns that are deemed relevant to the problem statement.
3. Compartmentalize flagged columns  in 'buckets' where each bucket encompasses one of the three main core ideas of financial literacy.
4. Aggregate over the dataset, looping over each row to see if bucket conditions apply, and generate a 'finacial literacy score' for each row (aka for every survey submission).
5. With aforementioned financial literacy score, compartmentalize rows by socio-economic qualities and generate visualizations to determine trends that prove the problem statement.

Tackling items 1 - 3 do not require any coding, but they do require academic research on the topic. As I have done extensive research on financial literacy in grad school, I had an idea on how to approach steps 1-3.  Based on the data provided, I created three 'buckets' that fall under financial literacy - 'Money Management', 'Planning for Future', and 'Financial Quiz Score'.  Let me stress that these are a posteriori categories, as the actual definition of financial literacy requires more paremeters than this dataset offers.  With that being said, my investigation probably produces results that raise questions about their validity, but for the sake of code and analysis, it's good to start somewhere. _Again, don't overthink it!_

These buckets did not account for all the survey questions -- but that's okay.  In the real world, there will be junk data everywhere.  Here are the column categories that fall within each bucket:
```python
money_management = ["SatisfactionLevelCurrentFinances",
"WillingnessFinancialRisk",
"ConfidenceLevelToEarn2000WithinMonth",
"DegreeOfWorryAboutRetirement",
"GoodWithYourMoney?",
"FinancialKnowledge?",
"SpendingVsIncome",
"DifficultyLevelPayingBills",
"IncomeDropPastYear?",
"SavingsAccount?",
"PayCreditCardsInFullAlways?",
"CreditCardChargedInterest?",
"Budget?",
"CreditRating",
"HaveFinancialGoals?",
"CreditCardCashAdvance?",
"TooMuchDebt?",
"ParentsTeachYouAboutFinance?"]

planning_for_future = ["EmergencyFunds?",
"SavingsChildCollegeEducation?",
"RetirementFundCalculationsAtAll?",
"PensionPlanFromEmployer?",
"RetirementsAccountNotFromWork?",
"RegularlyContributeToRetirement?",
"HardshipWithdrawalFromRetirement?",
"OtherInvestments?"]

fin_quiz_score = ["FinancialTestQ1",
"FinancialTestQ2",
"FinancialTestQ3",
"FinancialTestQ4",
"FinancialTestQ5",
"FinancialTestQ6"]
```

Notice that the names of the columns give you an idea of what they're trying to measure.  

I then spent many hours trying to figure out how to aggregate the data in way that was descibed in to-do list item #4.  First, I tweeked the formatting of the dataframe so that each unique survey id can serve as an index to its corresponding row. 
```python
df = pd.read_csv(csv_path, index_col='NFCSID')
```
I then cleaned it up through the pipeline (as discussed in [Part 1 Cleaning Up Data](https://ekeleshian.github.io/cleaning-up-data/).

```python
results = pipeline(df)
```
And then I added a new column into the dataframe, setting all its values to zero, where all the aggregated calculations of the financial literacy score are inputted here.

```python
 results['financialliteracyscore'] = 0
 ```

I then called this function:
```python
 df = financial_score_calculation(df, schema.dictionary_of_parameters)
 ```
 that generated a financial literacy score for all surveyees based on my formula, a function I called ```financial_score_calculation```, which takes in two arguments, a dataframe of the entire dataset and a dictionary of parameters.  The function then returns a dataframe with a new column, 'financialliteracyscore' that contains the metric of an individual's level of competence in his/her finances.

 Here is the code for the function:

```python
 def financial_score_calculation(df, dictionary_of_parameters):
    for parameter in dictionary_of_parameters:
        for i in dictionary_of_parameters[parameter]['target']:
            index = df.loc[df[parameter] == i].index
            for i in index:
                old_score = df.at[i, 'financialliteracyscore']
                new_score = old_score + dictionary_of_parameters[parameter]['score']
                df.at[i, 'financialliteracyscore'] = new_score
    for i in df.index:
        old_score = df.at[i, 'financialliteracyscore']
        new_score = (old_score/27.0)*100
        df.at[i, 'financialliteracyscore'] = new_score
    return df

 ```

And directly below is the second argument that is passed by the function.


```python
dictionary_of_parameters = {
        # start of money management bucket
        "SatisfactionLevelCurrentFinances": {'target': [8, 9, 10], 'score': 1},
        "WillingnessFinancialRisk": {'target': [8, 9, 10], 'score': 1},
        "ConfidenceLevelToEarn2000WithinMonth": {'target': [1], 'score': 1},
        "DegreeOfWorryAboutRetirement": {'target': [1], 'score': 1},
        "GoodWithYourMoney?": {'target': [7], 'score': 1},
        "FinancialKnowledge?": {'target': [7], 'score': 2},
        "SpendingVsIncome": {'target': [1], 'score': 1},
        "DifficultyLevelPayingBills": {'target': [3], 'score': 1},
        "IncomeDropPastYear?": {'target': [1], 'score': 1},
        "SavingsAccount?": {'target': [1], 'score': 1},
        "PayCreditCardsInFullAlways?": {'target': [2], 'score': 1},
        "CreditCardChargedInterest?": {'target': [1], 'score': -1},
        'Budget?': {'target': [1], 'score': 1},
        "CreditRating": {'target': [4,5], 'score': 1},
        "HaveFinancialGoals?": {'target': [6,7], 'score': 1},
        "CreditCardCashAdvance?": {'target': [1], 'score': -1},
        "TooMuchDebt?": {'target': [6,7], 'score': -2},
        "ParentsTeachYouAboutFinance?": {'target': [1], 'score': 1},
        #start of planning for future bucket
        "EmergencyFunds?": {'target': [1], 'score': 1},
        "SavingsChildCollegeEducation?": {'target': [1], 'score': 1},
        "RetirementFundCalculationsAtAll?": {'target': [1], 'score': 1},
        "PensionPlanFromEmployer?": {'target': [1], 'score': 1},
        "RetirementsAccountNotFromWork?": {'target': [1], 'score': 1},
        "RegularlyContributeToRetirement?": {'target': [1], 'score': 1},
        "HardshipWithdrawalFromRetirement?": {'target': [1], 'score': 1},
        "OtherInvestments?": {'target': [1], 'score': 1},
        #start of financial quiz bucket
        "FinancialTestQ1": {'target': [1], 'score': 1},
        "FinancialTestQ2": {'target': [3], 'score': 1},
        "FinancialTestQ3": {'target': [2], 'score': 1},
        "FinancialTestQ4": {'target': [2], 'score': 1},
        "FinancialTestQ5": {'target': [1], 'score': 1},
        "FinancialTestQ6": {'target': [2], 'score': 1}
    }

```

 The dictionary of parameters is the larger piece of the financial literacy buckets.  Each value is one of the aforementioned columns, and each key is a dictionary of 'target', 'score' pairs.  Each 'target' corresponds to a list of values that are desired in order to affect the financial literacy score.  Each 'score' key corresponds to a value that is either accounted for (if it's positive) or discounteded (if it's negative) when calculating the financial literacy score.

 For example, if surveyee X responded to the column "SatisfcationLevelCurrentFinances" with a value of 8, 9, or 10, then X's financial literacy score would be incremented by that score value, which in this case is 1.

 Now, I am unsure whether there is a better/optimal way to code-up the function financial_score_calculation, as acquiring the results is quite slow. 

```python
    time_0 = time.time()
    df = financial_score_calculation(df, schema.dictionary_of_parameters)
    time_now = time.time() - time_0
    print(time_now)

6.69875097275
```
When I calculate the time it takes to produce these results, you can see that it takes around 6.7 seconds.

So, going back to the to-do list, here is what has been done so far:

| To-Do              | Done?   |
|--------------------| -------:|
|Define the problem, clearly and succinctly. | Yes, _financial literacy is significantly underserved in our education system._| 
|Scan the survey to flag columns that are deemed relevant to the problem statement.| Yes |
|Compartmentalize flagged columns  in 'buckets' where each bucket encompasses one of the three main core ideas of financial literacy. | Yes, see dictionary\_of_parameters in code|
| Aggregate over the dataset, looping over each row to see if bucket conditions apply, and generate a 'finacial literacy score' for each row (aka for every survey submission). | Yes, see financial\_score_calculation() |
| Compartmentalize rows by socio-economic qualities and generate visualizations to determine if there are trends that can prove the problem statement.  | No, stay tuned... |

