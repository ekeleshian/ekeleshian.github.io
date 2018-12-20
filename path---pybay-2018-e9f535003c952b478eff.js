webpackJsonp([85966596966028],{523:function(n,a){n.exports={data:{site:{siteMetadata:{title:"math lizard",author:"Elizabeth Keleshian"}},markdownRemark:{id:"/home/mathlizard/myblog/ekeleshian.github.io/src/pages/pybay2018/index.md absPath of file >>> MarkdownRemark",html:'<h2>TakeAway 1: Visualizing the Data Structure</h2>\n<p>Raymond showed us <a href="http://www.pythontutor.com/visualize.html#mode=edit">Visualize Python</a>, a unique website that uncovers the true nature of objects in Python.  </p>\n<p>This website is gnarly!  It enlightens a few points:</p>\n<ol>\n<li>Lists just point to stuff</li>\n<li>A list can point to anything, including other lists</li>\n<li>Lists are objects that have useful functionality, like indexing, that really leverage its identity as an object</li>\n</ol>\n<p>For instance, suppose you had this following ‘skeleton’ of a list that intends to describe the hierarchical structure of a corporation:</p>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python">TITLE_NAME<span class="token punctuation">,</span> TOP<span class="token punctuation">,</span> BOTTOM <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span></code></pre>\n      </div>\n<p>This means that the 0th index will be the actual name of the title. The first index will return a subset (a list) of the hierarchy above this index, and the bottom index will return a subset (a list) of the hierarchy below this index. </p>\n<p>The CEO will have no one on top of him.  </p>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python">first <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">\'CEO\'</span><span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">]</span>\nsecond <span class="token operator">=</span> first<span class="token punctuation">[</span>BOTTOM<span class="token punctuation">]</span><span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">\'VP\'</span><span class="token punctuation">,</span> first<span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">]</span></code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python"><span class="token keyword">print</span><span class="token punctuation">(</span>first<span class="token punctuation">[</span>TOP<span class="token punctuation">]</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">None</code></pre>\n      </div>\n<p>That makes sense because no one is on top of the CEO</p>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python"><span class="token keyword">print</span><span class="token punctuation">(</span>first<span class="token punctuation">[</span>BOTTOM<span class="token punctuation">]</span><span class="token punctuation">[</span>TITLE_NAME<span class="token punctuation">]</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">VP</code></pre>\n      </div>\n<p>See how indexing can leverage the notion of a list being an object?</p>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python">third <span class="token operator">=</span> second<span class="token punctuation">[</span>BOTTOM<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">\'Senior Exec\'</span><span class="token punctuation">,</span> second<span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">]</span>\nfourth <span class="token operator">=</span> third<span class="token punctuation">[</span>BOTTOM<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">\'Exec\'</span><span class="token punctuation">,</span> third<span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">]</span>\nfifth <span class="token operator">=</span> fourth<span class="token punctuation">[</span>BOTTOM<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">\'Manager\'</span><span class="token punctuation">,</span> fourth<span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">]</span></code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python">third<span class="token punctuation">[</span>TOP<span class="token punctuation">]</span><span class="token punctuation">[</span>TOP<span class="token punctuation">]</span><span class="token punctuation">[</span>TITLE_NAME<span class="token punctuation">]</span></code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">&#39;CEO&#39;</code></pre>\n      </div>\n<p>The skeleton of our list also allowed us to write code that is intuitive and logical. For example, the above code returns the object that is two levels above the third object, which in this case, is the CEO</p>\n<p>If you copy and paste a code like this on the website, you get an image that resembles this:\n\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/visualize_lists-a502c15be943e60b255448333349da03-65e86.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 800px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 28.82136279926335%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAACXBIWXMAAAsSAAALEgHS3X78AAAA2UlEQVQY062QyW7DMAxE9f+flmuBBGmTtEbbeI9XybJl6ZWx60ty6aEEBhwNQWpIFUIgBM88B/4jVHTNmZyn6zPM8I2xBb1J0UNKqzMGG4uW0JlCtBhtc9o+EX4VlFJPpD/BuVSMOdTu5YwZPU0fc6sPlE1EUb9TNBfy6oO02JPVb2TVJ2l55Nbd85myPtKamKo5iZkT2lxk4Ih6/apotMVOgWFCsGb7y8U8s8D/8SJqH5Xy6yCrjAvs5GQFh/ee7b4QFtz5pj3z9a2y2ixD1uKzjU1/xFZ7jB+zINQg2OQPMwAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="visualize"\n        title=""\n        src="/static/visualize_lists-a502c15be943e60b255448333349da03-42603.png"\n        srcset="/static/visualize_lists-a502c15be943e60b255448333349da03-f931c.png 200w,\n/static/visualize_lists-a502c15be943e60b255448333349da03-e8031.png 400w,\n/static/visualize_lists-a502c15be943e60b255448333349da03-42603.png 800w,\n/static/visualize_lists-a502c15be943e60b255448333349da03-5b8b9.png 1200w,\n/static/visualize_lists-a502c15be943e60b255448333349da03-c7ea5.png 1600w,\n/static/visualize_lists-a502c15be943e60b255448333349da03-65e86.png 2172w"\n        sizes="(max-width: 800px) 100vw, 800px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<p>The visualization here sheds light on the true nature of lists — they’re just objects that point to other objects, in this case, either strings or lists.</p>\n<hr>\n<h2>TakeAway2: Elegant construction of Binary Tree</h2>\n<p>With the same logic, we can construct a binary tree that depicts domestic relationships and hierarchies.</p>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python">NAME<span class="token punctuation">,</span> MAMA<span class="token punctuation">,</span> BABA <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span> \n\n<span class="token keyword">def</span> <span class="token function">person</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span>mama<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span>baba<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>  <span class="token comment">#by default, mama and baba point to None</span>\n    <span class="token keyword">return</span> <span class="token punctuation">[</span>name<span class="token punctuation">,</span> mama<span class="token punctuation">,</span> baba<span class="token punctuation">]</span>\n\nelize <span class="token operator">=</span> person<span class="token punctuation">(</span><span class="token string">\'Elize\'</span><span class="token punctuation">)</span>\nhagop <span class="token operator">=</span> person<span class="token punctuation">(</span><span class="token string">\'Hagop\'</span><span class="token punctuation">)</span>\n\nhripsime <span class="token operator">=</span> person<span class="token punctuation">(</span><span class="token string">\'Hripsime\'</span><span class="token punctuation">)</span>\ngarabed <span class="token operator">=</span> person<span class="token punctuation">(</span><span class="token string">\'Garabed\'</span><span class="token punctuation">)</span>\n\nlevon <span class="token operator">=</span> person<span class="token punctuation">(</span><span class="token string">\'Levon\'</span><span class="token punctuation">,</span> elize<span class="token punctuation">,</span> hagop<span class="token punctuation">)</span>\nsilva <span class="token operator">=</span> person<span class="token punctuation">(</span><span class="token string">\'Silva\'</span><span class="token punctuation">,</span> hripsime<span class="token punctuation">,</span> garabed<span class="token punctuation">)</span>\n\nelizabeth <span class="token operator">=</span> person<span class="token punctuation">(</span><span class="token string">\'Elizabeth\'</span><span class="token punctuation">,</span> silva<span class="token punctuation">,</span> levon<span class="token punctuation">)</span></code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python"><span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">\'Grandfathers: \'</span><span class="token punctuation">)</span>\n<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">\'|- (maternal)\'</span><span class="token punctuation">,</span> elizabeth<span class="token punctuation">[</span>MAMA<span class="token punctuation">]</span><span class="token punctuation">[</span>BABA<span class="token punctuation">]</span><span class="token punctuation">[</span>NAME<span class="token punctuation">]</span><span class="token punctuation">)</span>\n<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">\'|- (paternal)\'</span><span class="token punctuation">,</span> elizabeth<span class="token punctuation">[</span>BABA<span class="token punctuation">]</span><span class="token punctuation">[</span>BABA<span class="token punctuation">]</span><span class="token punctuation">[</span>NAME<span class="token punctuation">]</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">Grandfathers: \n|- (maternal) Garabed\n|- (paternal) Hagop</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python"><span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">\'Grandmothers: \'</span><span class="token punctuation">)</span>\n<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">\'|- (maternal)\'</span><span class="token punctuation">,</span> elizabeth<span class="token punctuation">[</span>MAMA<span class="token punctuation">]</span><span class="token punctuation">[</span>MAMA<span class="token punctuation">]</span><span class="token punctuation">[</span>NAME<span class="token punctuation">]</span><span class="token punctuation">)</span>\n<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">\'|- (paternal)\'</span><span class="token punctuation">,</span> elizabeth<span class="token punctuation">[</span>BABA<span class="token punctuation">]</span><span class="token punctuation">[</span>MAMA<span class="token punctuation">]</span><span class="token punctuation">[</span>NAME<span class="token punctuation">]</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">Grandmothers: \n|- (maternal) Hripsime\n|- (paternal) Elize</code></pre>\n      </div>\n<p>I love how elegant the function <code class="language-text">person</code> looks. The code kind of looks like English!  One who doesn’t know code really well or none at all would be able to understand what that function does.</p>\n<p>Since Raymond already went over pre-order and in-order, I will provide the code for postorder.</p>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python"><span class="token keyword">def</span> <span class="token function">postorder</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">:</span>\n    <span class="token keyword">if</span> p <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>\n        <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\n    <span class="token keyword">return</span> postorder<span class="token punctuation">(</span>p<span class="token punctuation">[</span>MAMA<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">+</span> postorder<span class="token punctuation">(</span>p<span class="token punctuation">[</span>BABA<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token punctuation">[</span>p<span class="token punctuation">[</span>NAME<span class="token punctuation">]</span><span class="token punctuation">]</span></code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python">postorder<span class="token punctuation">(</span>elizabeth<span class="token punctuation">)</span></code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">[&#39;Hripsime&#39;, &#39;Garabed&#39;, &#39;Silva&#39;, &#39;Elize&#39;, &#39;Hagop&#39;, &#39;Levon&#39;, &#39;Elizabeth&#39;]</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-python"><code class="language-python">postorder<span class="token punctuation">(</span>silva<span class="token punctuation">)</span>\nelizabeth</code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">[&#39;Elizabeth&#39;,\n [&#39;Silva&#39;, [&#39;Hripsime&#39;, None, None], [&#39;Garabed&#39;, None, None]],\n [&#39;Levon&#39;, [&#39;Elize&#39;, None, None], [&#39;Hagop&#39;, None, None]]]</code></pre>\n      </div>\n<hr>\n<h2>TakeAway3: easy to read data != reliable data</h2>\n<ul>\n<li>In case you do encounter data that looks like it’s meant for humans to read it, convert it into a structure that would make it easier for a computer to read it.  </li>\n<li>Sniffer tool in csv library can detect the separator in the data — super cool!!</li>\n<li>XML’s terminology comes in hand when implementing XML parsers</li>\n</ul>',frontmatter:{title:"Take Aways from PyBay 2018",date:"August 22, 2018"}}},pathContext:{slug:"/pybay2018/",previous:{fields:{slug:"/genomics-hackathon/"},frontmatter:{title:"Genomics Hackathon"}},next:{fields:{slug:"/financial-literacy-analysis/"},frontmatter:{title:"Are Americans Financially Literate?"}}}}}});
//# sourceMappingURL=path---pybay-2018-e9f535003c952b478eff.js.map