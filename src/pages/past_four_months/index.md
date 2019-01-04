---
title: Key Learnings So Far
date: 2019-01-02 17:59:19

---

*To give you some context: exactly a year ago, I started the journey of changing my career from math teacher to data scientist.  The first half of the year involved learning python part-time, attending meet-ups in the evenings, and participating in hackathons on the weekends. My learning and maturity dramatically accelerated while at a bootcamp named [DSR](https://datascienceretreat.com/), where I dropped everything in SF to move and live in Berlin.  It recently concluded and now I'm back in the Bay Area, reflecting, writing, and continually learning. My thoughts are sorted by importance in ascending order.*

*P.S. follow me on twitter @_mathlizard (if you're in SF, would love to meet up.)*  


##8. Google Cloud Functions

Server maintenance, which involves dealing with Linux, is a pain. That's why for [my portfolio project](https://github.com/DerpMind/font_recommender/tree/master/Jesus_app), I took the serverless route with cloud functions.  I used Google Cloud Functions (GCFs), they have their pros and cons.  

Pros:  Documentation and tutorials are decent; it's serverless; it's cheaper than paying monthly for domain; after final deployment, website works with no issues. 

Cons:  No emulator to debug, run, & debug python cloud functions; deployment issues, which included receiving non-descriptive error messages and exploding depending on how the constraints in the requirements.txt file were coded. 

As a side point: if the client side of your project doesn't share the same domain as your GCFs, you will have to deal with CORS issues.   This wasn't emphasized in the tutorials, so here's an [example](https://cloud.google.com/functions/docs/writing/http) of its quick implementation.

As a cool side-affect: I was able to gain a deeper understanding about http requests, like how you can pass data through the HTTP body or as a query in the url string, how there are different types of headers and when to use them, how to build the data structure during request handling, and how you can use curl as a simple client in order to run the code quickly. I also encountered a memory-related bottleneck that turned into a cool engineering problem that I had to tackle (I even wrote a [blog post](https://ekeleshian.github.io/reading_from_text_files/) about it). Overall, I recommend GCFs for anyone who's trying to run a website.  


##7. Climbing High to Start the Race in Tech

The barriers to entry in tech is quite high, because there are certain nuanced tools that one must pick up and learn well before there's even a topic of discussion about getting a job as a coder.  They're *pre-requisites* so to speak:   

#### Git
 Rebasing and cherrypicking; partitioning work with meaningful and compartmentalized commits; knowing which files need to be tracked and staged; using `tig`.
#### Unix-isms
Using CLI tools to get stuff done, my favorite so far being `wget`; reconfiguring environment variables and functions in .bashrc;  making aliases for common commands in .bashrc.   
#### The Open-Source-Community
Posting an issue when getting a weird bug from the source code; making a clear and concise description of the problem when reaching out in forums; using tech jargon and vocabulary in writing to effectively communicate your thoughts; reading about newcomings in HackerNews and blogs.



##6. Finding Effective Resources from Online and the Local Region

Knowing how and when to ask for help is an acquired skill.  I've learned that one must employ certain strategies when reaching out.  Strategies include:  

1)  Parameterize google queries with a certain time range.  API's are constantly being iterated with new versions. "Past year" will give you results that are most current and most likely relevant to your problem.
2)  Subscribe to techie IRC channels. This is a great way to virtually interact with your peers. I was able to learn regular expressions quite well after being quizzed by someone in Python's channel.  
3)  Participate and network at local tech meet-ups. You will find veterans who are hungry to help with your technical problems.  I befriended a woman who worked as an experienced programmer with a similar non-traditional background as me.  She is now my mentor and gives me insight that I wouldn't otherwise receive from a forum or tutorial.
4)  Be mindful that stackoverflow has various communities under it, like one for ubuntu, one for data science, etc, so make sure you consider these subforums when asking for help. 


##5. "If I can't code it, I don't understand it."

The instructors at DSR really emphasized this idea as a way to check if you really understand something.  This method of learning forces you to distinguish the high- and low-level characteristics of an algorithm, which in turn provides a much richer understanding of the logic and moving parts behind your code.  Consider cross-entropy as an example.  An amateur would only be able to explain *what* cross-entropy does and *when* it's used, but a professional will be able to explain *how* and *why* cross-entropy works for your context.  Sure, you can easily find libraries that have an API for machine learning algorithms. However, the abundance of such API's will hinder your chances of understanding what your code is actually doing, which can then easily pave the way for difficult and frustrating debugging. Make sure you invest the time to code up ML algorithms from scratch, starting with the ones you frequently use.   


##4. Project Architecture

The early phases of a project must include a design that's well drawn out and encapsulates the properties and functions of the project.  Most times, project brainstorming involves an exchange of words, but words can easily be misinterpreted, especially if tech jargon isn't being used.  I encountered this when working on my last project; my partner and I had different interpretations of the idea while building it!  You could imagine the snowball effect of issues that can occur.  If you're building an app or website, make sure you draw out the sequential actions of your client and server.  Then, there will be no ambiguity during implementation, which in turn makes the coding experience much smoother. 


##3. Adjusting to a Full-Time Work Flow of a Data Scientist

There's no falsehood in the phrase that data clean-up is majority of the work.  This is because it's incredibly rare to be handed with perfect data.  It's important to be knowledgeable about data's various properties and their implications.  Data can be tabular where there are columns and rows or non-tabular where it lacks structure.  It can have nulls, floats, ints, strings, and other various objects.  It can be imbalanced, where you have more much more data from one class than the other.  It can have redundancies, where you find a high correlation coefficient in a set of features.  It can be massive where you have to distribute it across multiple machines.  It can be small where you have to employ some method(s) of data augmentation.  It can be online where the data is continually being updated, or offline where the data is static.  It can be grouped by some feature(s) and aggragated over some certain condition(s). It can have outliers in which you may or may not ignore. As you can see, there can be various problems with data; mentioned here is just a preview of the possibilities. As such, one must be fluent in data-wrangling. DSR substantially helped in this realm by having us get submerged into these problems using SQL, numpy, and pandas.  


##2. Becoming 'Language Agnostic'

As a self-taught programmer in data science, my first language was Python.  Before the retreat, I was religiously looking for pythonic tasks, barring my chances from learning other languages as I didn't have the mental eagerness to drop everything I learned from Python to make room to learn a different language.  Since the retreat, I've come to realize that it's not as daunting and arduous to learn a new language as it may appear from the perspective of tech newbie.  The underlying abstractions from a given programming language can have a lot of overlap with the abstractions from another language, i.e. the concepts of immutable and mutable objects, functions and callbacks, synchronous and asynchronous coding.  In turn, the rate in learning a programming language after knowing one fluently will increase over time.  This epiphany was brought into light during my implementation of visualizations in my project.  Python has great libraries for data visualization, but due to web-integration and graphics customization, JavaScipt was a better candidate.  So, I learned d3.  As a cool side-affect, I've gained a much deeper appreciation and admiration for visualizations.


## 1. Effective Debugging

Don't. Let. The. Computer. Win. One must learn how to debug by a series of frustrating and intensive experiences, as there's really no way to learn it explicity via tutorials.  Error message(s) may be too vague or orthogonal to help, or worse yet, they may not even appear.  I have reached a point where debugging has no longer become a daunting task, but rather a fun one, because I've learned how to act as a detective by employing debugging tools, reading the stacktrace, and then going to the place where the code exploded.  `set_trace` from Python's pdb library, `debbuger;` command in JavaScript, and the web inspector were my three best friends while working on my project.  When none of the three debugging tools helped, I reached out to the community either through Google, IRC channel, or a helpful veteran at a meet-up.  There is (mostly) always a solution if you know how to use your debugging tools, when you are in a positive frame of mind. 