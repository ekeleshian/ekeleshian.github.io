webpackJsonp([0x6a9f833080f8],{401:function(n,a){n.exports={data:{site:{siteMetadata:{title:"math lizard",author:"Elizabeth Keleshian"}},markdownRemark:{id:"/home/mathlizard/myblog/ekeleshian.github.io/src/pages/cleaning-up-data/index.md absPath of file >>> MarkdownRemark",html:'<p>In this post, will discuss my beginning approach to my first project, which revolves around financial literacy in the United States.  </p>\n<p>With an extensive Google Scholar search, I found relevant data about the topic.  The database had some messy qualities.  I recall opening\nthe csv file into Excel and feeling totally dumbfounded; the data\nlooked meaningless — just rows of arbitrary alphanumeric\nsequences that deemed it impossible to do any analysis.\nFortunately, in the directory of this database also included a pdf file of a key of all\nalpha numeric codes and their translations.  It contained the\nquestion and multiple choices of every survey question from the data.\nWith this access, I realized that luck played a huge role with\ngetting this project started (and that Google is amazing!). So, this prompted\nme to clean up the data, reformatting the data so that it was actually\nreadable.   </p>\n<p>I wrote a python file, called “schema.py”, that contained dictionaries of the survey’s\nalphanumeric codes and their respective translations. I first started decoding the attributes that expressed each survey question; for instance, the code “STATEQ” decodes to State.  Since there were 126 survey questions, there were 126 attributes, each decoded according to the nature of the survey question.</p>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python">survey_attributes <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">\'survey_code\'</span><span class="token punctuation">:</span><span class="token string">\'attribute\'</span><span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Then, I decoded the various codes for survey output.  For instance, if an item in the third question had a ‘2’, and if the said question happened to be a true/false question, then the value ‘2’ would be decoded to “False”. The decoding process is an integral part in cleaning up the data.  The more time you spend cleaning up the data, the much higher chances of generating successful and insightful results about the data.</p>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python">output_codes <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">"output1"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">:</span> <span class="token string">"True"</span><span class="token punctuation">}</span><span class="token punctuation">}</span></code></pre>\n      </div>\n<p>I then wrote a new python file, named “main.py” which contained a pipeline function, that when called, causes a chain of events in which the data frame tranforms into a readable and organized platform to work with.  </p>\n<p>In my main function, I write the path of the csv file, save it as a pandas dataframe object, and finally save and run the dataframe through the aforementioned pipeline. </p>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python"><span class="token keyword">import</span> pandas <span class="token keyword">as</span> pd\n<span class="token keyword">import</span> schema\n\n<span class="token keyword">def</span> <span class="token function">new_columns</span><span class="token punctuation">(</span>df<span class="token punctuation">)</span><span class="token punctuation">:</span> \n\tdf<span class="token punctuation">.</span>rename<span class="token punctuation">(</span>columns <span class="token operator">=</span> schema<span class="token punctuation">.</span>survey_attributes<span class="token punctuation">,</span> inplace <span class="token operator">=</span> <span class="token boolean">True</span><span class="token punctuation">)</span>\n\t<span class="token keyword">return</span> df\n\n<span class="token keyword">def</span> <span class="token function">convert_row_values</span><span class="token punctuation">(</span>df<span class="token punctuation">)</span><span class="token punctuation">:</span>\n\t<span class="token keyword">for</span> k <span class="token keyword">in</span> schema<span class="token punctuation">.</span>output_codes<span class="token punctuation">:</span>\n\t\tdictionary <span class="token operator">=</span> <span class="token punctuation">{</span>k<span class="token punctuation">:</span><span class="token builtin">dict</span><span class="token punctuation">(</span>output_codes<span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">}</span>\n\t\tdf<span class="token punctuation">.</span>replace<span class="token punctuation">(</span>to_replace <span class="token operator">=</span> dictionary<span class="token punctuation">,</span> inplace<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>\n\t<span class="token keyword">return</span> df\n\n\n<span class="token keyword">def</span> <span class="token function">pipeline</span><span class="token punctuation">(</span>dataframe<span class="token punctuation">)</span><span class="token punctuation">:</span>\n\tmodified_columns_df <span class="token operator">=</span> new_columns<span class="token punctuation">(</span>dataframe<span class="token punctuation">)</span>\n\tmaster_df <span class="token operator">=</span> convert_row_values<span class="token punctuation">(</span>modified_columns_df<span class="token punctuation">)</span>\n\t<span class="token keyword">return</span> master_df\n\n<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n\tcsv_path <span class="token operator">=</span> <span class="token string">\'/Users/elizabethkeleshian/financial_literacy_analytics/2015_state_data.csv\'</span>\n\tdf <span class="token operator">=</span> pd<span class="token punctuation">.</span>read_csv<span class="token punctuation">(</span>csv_path<span class="token punctuation">)</span>\n\tresults <span class="token operator">=</span> pipeline<span class="token punctuation">(</span>df<span class="token punctuation">)</span></code></pre>\n      </div>\n<p>You will notice that when calling the pipeline function, two other functions are called, in order to convert the column and row data into workable content.  </p>\n<p>And walla! You get a workable dataframe.</p>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python"><span class="token operator">/</span>usr<span class="token operator">/</span><span class="token builtin">bin</span><span class="token operator">/</span>python2<span class="token punctuation">.</span><span class="token number">7</span> <span class="token operator">/</span>home<span class="token operator">/</span>elizabeth<span class="token operator">/</span>financial_literacy<span class="token operator">/</span>main_<span class="token punctuation">.</span>py\n       RespondentID                 State      CensusDivision CensusRegion  \\\n<span class="token number">0</span>        <span class="token number">2015010001</span>               Arizona            Mountain         West   \n<span class="token number">1</span>        <span class="token number">2015010002</span>                  Ohio  East North Central      Midwest   \n<span class="token number">2</span>        <span class="token number">2015010003</span>              New York     Middle Atlantic    Northeast   \n<span class="token number">3</span>        <span class="token number">2015010004</span>               Florida      South Atlantic        South   \n<span class="token number">4</span>        <span class="token number">2015010005</span>            New Jersey     Middle Atlantic    Northeast   \n<span class="token number">5</span>        <span class="token number">2015010006</span>              Missouri  West North Central      Midwest   \n<span class="token number">6</span>        <span class="token number">2015010007</span>               Florida      South Atlantic        South   \n<span class="token number">7</span>        <span class="token number">2015010008</span>               Arizona            Mountain         West   \n<span class="token number">8</span>        <span class="token number">2015010009</span>        South Carolina      South Atlantic        South   \n<span class="token number">9</span>        <span class="token number">2015010010</span>              New York     Middle Atlantic    Northeast   \n<span class="token number">10</span>       <span class="token number">2015010011</span>            Washington             Pacific         West   \n<span class="token number">11</span>       <span class="token number">2015010012</span>               Florida      South Atlantic        South   \n<span class="token number">12</span>       <span class="token number">2015010013</span>           Connecticut         New England    Northeast   \n<span class="token number">13</span>       <span class="token number">2015010014</span>                 Texas  West South Central        South   \n<span class="token number">14</span>       <span class="token number">2015010015</span>                Kansas  West North Central      Midwest   \n<span class="token number">15</span>       <span class="token number">2015010016</span>            California             Pacific         West   \n<span class="token number">16</span>       <span class="token number">2015010017</span>           Connecticut         New England    Northeast   \n<span class="token number">17</span>       <span class="token number">2015010018</span>            California             Pacific         West   \n<span class="token number">18</span>       <span class="token number">2015010019</span>                 Texas  West South Central        South   \n<span class="token number">19</span>       <span class="token number">2015010020</span>          Pennsylvania     Middle Atlantic    Northeast   \n<span class="token number">20</span>       <span class="token number">2015010021</span>                 Texas  West South Central        South   \n<span class="token number">21</span>       <span class="token number">2015010022</span>                 Texas  West South Central        South   \n<span class="token number">22</span>       <span class="token number">2015010023</span>            California             Pacific         West   \n<span class="token number">23</span>       <span class="token number">2015010024</span>          Pennsylvania     Middle Atlantic    Northeast   \n<span class="token number">24</span>       <span class="token number">2015010025</span>              Michigan  East North Central      Midwest   \n<span class="token number">25</span>       <span class="token number">2015010026</span>          Pennsylvania     Middle Atlantic    Northeast   \n<span class="token number">26</span>       <span class="token number">2015010027</span>                 Texas  West South Central        South   \n<span class="token number">27</span>       <span class="token number">2015010028</span>               Florida      South Atlantic        South   \n<span class="token number">28</span>       <span class="token number">2015010029</span>                  Ohio  East North Central      Midwest   \n<span class="token number">29</span>       <span class="token number">2015010030</span>           Connecticut         New England    Northeast</code></pre>\n      </div>\n<p>From here, I then imported the matplotlib.pyplot subpackage to generate some fun data visualizations.  Stay tuned to learn how I went about this as a data science n00b…</p>',frontmatter:{title:"Early Phases of Financial Literacy Project",date:"June 13, 2018"}}},pathContext:{slug:"/cleaning-up-data/",previous:{fields:{slug:"/new-beginnings/"},frontmatter:{title:"From Math Teacher to Data Science n00b"}},next:{fields:{slug:"/playing-with-data/"},frontmatter:{title:"Playing with Financial Literacy Data"}}}}}});
//# sourceMappingURL=path---cleaning-up-data-1263db7f8840a8165bdc.js.map