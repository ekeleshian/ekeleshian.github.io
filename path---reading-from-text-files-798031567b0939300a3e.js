webpackJsonp([93995046729774],{518:function(n,a){n.exports={data:{site:{siteMetadata:{title:"math lizard",author:"Elizabeth Keleshian"}},markdownRemark:{id:"/home/mathlizard/myblog/ekeleshian.github.io/src/pages/reading_from_text_files/index.md absPath of file >>> MarkdownRemark",html:'<h2>The Background</h2>\n<p>I wanted to integrate my machine learning project into my blog website.   To set up the server, I decided to use Google Cloud Functions as I didn’t want to deal with the mundane tasks of server maintenance.  One of my GCF’s was tasked to read from a giant CSV file and extract a piece from it to send over to the client.  This created a legitimate bottleneck for two reasons:</p>\n<ol>\n<li>GCFs are allocated at most 2 GB of memory</li>\n<li>Blocking I/O is really slow and costly.  </li>\n</ol>\n<p>I had to find a way for my program to store only specific lines from the file into memory, as opposed to its default behavior which is to store every line into memory.  </p>\n<h2>What Worked</h2>\n<h4>The Set-Up</h4>\n<p>I stored my csv file in Google Cloud Storage.  This was done quite easily in the Google Cloud’s console.  When uploading the file, two things were generated: a bucket and a blob.  A bucket is a container that stores the data.  A blob is a Google object that converts the file into a GCS-friendly structure.  In order to read the contents from the blob, first:</p>\n<h5>Install GCS client library for Python:</h5>\n<p><code class="language-text">$ pip install --upgrade google-cloud-storage</code></p>\n<h5>Authenticate a service account for thedata:</h5>\n<p>Go to GC’s console to the IAM &#x26; admin tab to create a new service account.  This will generate a JSON file which will be downloaded to your hard disk. </p>\n<h5>Then in the terminal:</h5>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">$ mv ~/Downloads/myproject-hash.json ~/myproject/\n$ export GOOGLE_APPLICATION_CREDENTIALS=&quot;/home/mathlizard/myproject/myproject-hash.json&quot;</code></pre>\n      </div>\n<h5>Then in a juypter notebook:</h5>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python"><span class="token keyword">from</span> google<span class="token punctuation">.</span>cloud <span class="token keyword">import</span> storage\nstorage_client <span class="token operator">=</span> storage<span class="token punctuation">.</span>Client<span class="token punctuation">(</span><span class="token punctuation">)</span>\nbucket <span class="token operator">=</span> storage_client<span class="token punctuation">.</span>get_bucket<span class="token punctuation">(</span><span class="token string">"my_bucket_name"</span><span class="token punctuation">)</span> <span class="token comment">#your bucket name is a unique string that you setup in the console</span>\nblob_names <span class="token operator">=</span> <span class="token punctuation">[</span> blob<span class="token punctuation">.</span>name <span class="token keyword">for</span> blob <span class="token keyword">in</span> bucket<span class="token punctuation">.</span>list_blobs<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">]</span> <span class="token comment">#a list of your blob names</span>\nblob <span class="token operator">=</span> bucket<span class="token punctuation">.</span>blob<span class="token punctuation">(</span>blob_names<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<h4>Tackling the Problem</h4>\n<p>From the GC <a href="https://googleapis.github.io/google-cloud-python/latest/storage/blobs.html">API documentation</a>, there are three ways to read the contents of a blob, but I found that <code class="language-text">download_as_string</code> would be the best method to use as it has two optional parameters to pass <code class="language-text">start, end</code>, which represent the first and last byte of a range to be downloaded. Since the byte range was deterministic, i.e. the contents of this blob would never change during runtime, I figured that this was the way to solve my problem.  </p>\n<h5>Determine the offset:</h5>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python">data <span class="token operator">=</span> blob<span class="token punctuation">.</span>download_as_string<span class="token punctuation">(</span><span class="token punctuation">)</span>\nrows <span class="token operator">=</span> data<span class="token punctuation">.</span>split<span class="token punctuation">(</span>b<span class="token string">"\\n"</span><span class="token punctuation">)</span>\noffset <span class="token operator">=</span> <span class="token builtin">max</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token builtin">len</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token keyword">for</span> i <span class="token keyword">in</span> rows<span class="token punctuation">]</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>The row with the largest byte length covered 20901 bytes.  This was my offset value.  If each row were 20901 bytes long, then the start and end values to be passed in <code class="language-text">download_as_string</code> would just be a multiple of 20901. Therefore…</p>\n<h5>Make each row the length of the offset:</h5>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python">new_matrix <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\n<span class="token keyword">for</span> i <span class="token keyword">in</span> rows<span class="token punctuation">:</span>\n    row_length <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>\n    <span class="token keyword">if</span> row_length <span class="token operator">!=</span> <span class="token number">20901</span><span class="token punctuation">:</span>\n        difference <span class="token operator">=</span> <span class="token number">20901</span> <span class="token operator">-</span> row_length\n        new_row <span class="token operator">=</span> i <span class="token operator">+</span> b<span class="token string">\',\'</span><span class="token operator">*</span>difference <span class="token comment">#add trailing commas at the end of each row</span>\n    new_matrix<span class="token punctuation">.</span>append<span class="token punctuation">(</span>new_row<span class="token punctuation">)</span></code></pre>\n      </div>\n<h5>Write over the blob with new content:</h5>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python">byte_string <span class="token operator">=</span> b<span class="token string">\'\'</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span>new_matrix<span class="token punctuation">)</span> \nblob<span class="token punctuation">.</span>upload_from_string<span class="token punctuation">(</span>byte_string<span class="token punctuation">)</span> </code></pre>\n      </div>\n<h4>How It Works</h4>\n<p>Say I have to extract the fifth row in my blob.  Then here’s the code to do this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python"><span class="token keyword">import</span> numpy <span class="token keyword">as</span> np\nidx <span class="token operator">=</span> <span class="token number">5</span>\nrelevant_row <span class="token operator">=</span> blob<span class="token punctuation">.</span>download_as_string<span class="token punctuation">(</span>start<span class="token operator">=</span><span class="token number">20901</span><span class="token operator">*</span><span class="token punctuation">(</span>idx<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> end<span class="token operator">=</span><span class="token number">20901</span><span class="token operator">*</span><span class="token punctuation">(</span>idx<span class="token operator">+</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>\nrelevant_row <span class="token operator">=</span> np<span class="token punctuation">.</span>array<span class="token punctuation">(</span>relevant_row<span class="token punctuation">.</span>split<span class="token punctuation">(</span>b<span class="token string">","</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\nrelevant_row <span class="token operator">=</span> relevant_row<span class="token punctuation">[</span>np<span class="token punctuation">.</span>where<span class="token punctuation">(</span>relevant_row <span class="token operator">!=</span> b<span class="token string">\'\'</span><span class="token punctuation">)</span><span class="token punctuation">]</span>  <span class="token comment">#gets rid of all the trailing commas at the end</span>\nrelevant_row <span class="token operator">=</span> relevant_row<span class="token punctuation">.</span>astype<span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>I have to increment the index value by one since the first row of my data is the column names.  </p>\n<p>Wallah! My problem got fixed. Now my code does data extraction efficiently as it only reads from a specific range of data.  My GCFs aren’t complaining about exceeding memory and the website runs faster, too.  Here’s the link to the website in case you were curious how the implementation turned out AND use chrome as your browser:  <a href="https://ekeleshian.github.io/visualizations.html">a recommendation system for fonts.</a>  </p>',frontmatter:{title:"Reading From Blobs Efficiently",date:"December 22, 2018"}}},pathContext:{slug:"/reading_from_text_files/",previous:{fields:{slug:"/financial-literacy-analysis/"},frontmatter:{title:"Are Americans Financially Literate?"}},next:null}}}});
//# sourceMappingURL=path---reading-from-text-files-798031567b0939300a3e.js.map