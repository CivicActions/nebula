# #22: X axis has no label (and this info should perhaps just be included as part of the &quot;side effects&quot; title?) 

* Source: https://github.com/CivicActions/nebula/issues/22
* Created by: stevecurtis
* Created at: 2015-06-25T16:35:16Z
* Updated at: 2015-06-28T14:52:15Z
* Closed at: 2015-06-28T14:52:15Z


## Comment

* Source: https://github.com/CivicActions/nebula/issues/22
* Commented by: stevecurtis
* Created at: 2015-06-25T16:35:16Z
* Updated at: 2015-06-28T14:52:15Z

Something like 

Side Effects
(Absolute number of adverse events reported by users to FDA [program title] from dates X to Y) 

or some such.  


## Comment

* Source: https://github.com/CivicActions/nebula/issues/22#issuecomment-115318558
* Commented by: rakanowicz
* Created at: 2015-06-25T16:39:33Z
* Updated at: 2015-06-25T16:39:33Z

Steve, I created a revised wire earlier today that took into account feedback from Kev; he said the same thing and I do agree. See revised [wire] (https://civicactions.mybalsamiq.com/projects/agile-gsa/PV-%20Drug%20List%20Vertical%20Revised%2006272015)


## Comment

* Source: https://github.com/CivicActions/nebula/issues/22#issuecomment-115384461
* Commented by: ethanteague
* Created at: 2015-06-25T20:20:20Z
* Updated at: 2015-06-25T20:20:20Z

I can give it a label, but moving the x-axis to the top would require a big api change.


## Comment

* Source: https://github.com/CivicActions/nebula/issues/22#issuecomment-115392242
* Commented by: stevecurtis
* Created at: 2015-06-25T20:46:55Z
* Updated at: 2015-06-25T20:46:55Z

What about just adding the language suggested above directly below the &quot;Side Effects&quot; title? We need some explanation of what the values on the X axis are, and it would be less cluttery to just include them up there? 


## Comment

* Source: https://github.com/CivicActions/nebula/issues/22#issuecomment-115656194
* Commented by: rakanowicz
* Created at: 2015-06-26T12:02:55Z
* Updated at: 2015-06-26T12:02:55Z

We&#x2019;ve heard from a couple of people that the &#x201C;Side Effects&#x201D; heading at the top is confusing so that&#x2019;s why I suggest just removing it. The side effects are listed on the left side of the chart and don&#x2019;t describe the drug legend. And we need to be consistent with language:  side effects -&gt; adverse effects. 

Ron Akanowicz
Information Architect
ron.akanowicz@civicactions.com 
786-853-1666

CivicActions, Inc. | empowering social change





On Jun 25, 2015, at 4:20 PM, Ethan Teague <notifications@github.com> wrote:

&gt; I can give it a label, but moving the x-axis to the top would require a big api change.
&gt; 
&gt; &#x2014;
&gt; Reply to this email directly or view it on GitHub.
&gt; 




## Comment

* Source: https://github.com/CivicActions/nebula/issues/22#issuecomment-115734782
* Commented by: gregelin
* Created at: 2015-06-26T15:38:33Z
* Updated at: 2015-06-26T15:38:33Z

The time dimension of the reports is _really_ important. Is it 5265 adverse reports over the last month? last year? Is that big percentage of users? Small?

The lack of context is a _common_ problem with gov data. There are some tricks to address. For example:
- Compare to a common baseline (e.g., compare to reports for aspirin)
- Compare to highest and lowest
- Group stuff into categories (new drug, established drug, small user base, average user base, very large user base)

I think we could use publicly available data to categorize size of user base and ratio of reports for a dozen well known drugs (aspirin, lipitor, etc) and a few rare drugs to represent what could be done with more time. 


## Comment

* Source: https://github.com/CivicActions/nebula/issues/22#issuecomment-115831279
* Commented by: rakanowicz
* Created at: 2015-06-26T18:52:30Z
* Updated at: 2015-06-26T18:53:10Z

Greg: I posted an image in Slack a little while ago. Is that label better? See [wire] (https://civicactions.mybalsamiq.com/projects/agile-gsa/PV%20-%20Drug%20List%20Vertical%20Revised%2006262015)

The details of the description need to be confirmed by DEV; but basically something like that?


</notifications@github.com>