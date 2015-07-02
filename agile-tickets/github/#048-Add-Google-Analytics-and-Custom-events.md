# #48: Add Google Analytics and Custom events

* Source: https://github.com/CivicActions/nebula/issues/48
* Created by: kevwalsh
* Created at: 2015-06-26T19:32:22Z
* Updated at: 2015-06-26T21:25:18Z
* Closed at: 2015-06-26T21:25:18Z


## Comment

* Source: https://github.com/CivicActions/nebula/issues/48
* Commented by: kevwalsh
* Created at: 2015-06-26T19:32:22Z
* Updated at: 2015-06-26T21:25:18Z

I created a new property in the same account as Civicactions.com 

UA-1170467-6

```<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-1170467-6', 'auto');
  ga('send', 'pageview');

</script>```

Custom events would be ideal. (button submits, drugs added, etc)



## Comment

* Source: https://github.com/CivicActions/nebula/issues/48#issuecomment-115852423
* Commented by: RobertLRead
* Created at: 2015-06-26T19:47:57Z
* Updated at: 2015-06-26T19:47:57Z

I agree --- &quot;drugs added&quot; would be very valuable.  I will put it up immediately when you do that.  I have never done it (though I could research.)  If you have time to do it, I would prefer that you do that.  Thank you.



## Comment

* Source: https://github.com/CivicActions/nebula/issues/48#issuecomment-115887450
* Commented by: kevwalsh
* Created at: 2015-06-26T21:25:18Z
* Updated at: 2015-06-26T21:25:18Z

I&apos;ve added event tracking for the two buttons (&quot;add-drug&quot; and &quot;improve&quot;).  They can be seen in Analytics at Behavior &gt; Events &gt; Overview &gt; Event Label
![events_overview_-_google_analytics](https://cloud.githubusercontent.com/assets/643678/8387635/395b2d5e-1c28-11e5-8719-c1c79ba58216.png)



