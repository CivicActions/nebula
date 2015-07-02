# #87: Handle the fact that AHRQ doesn&apos;t contain drug in some elegant manner.

* Source: https://github.com/CivicActions/nebula/issues/87
* Created by: RobertLRead
* Created at: 2015-06-29T22:22:34Z
* Updated at: 2015-06-30T18:33:31Z
* Closed at: 


## Comment

* Source: https://github.com/CivicActions/nebula/issues/87
* Commented by: RobertLRead
* Created at: 2015-06-29T22:22:34Z
* Updated at: 2015-06-30T18:33:31Z

Tyson made it very clear that he wanted to see whatever information was in Adverse Events, whether in AHRQ or not.


## Comment

* Source: https://github.com/CivicActions/nebula/issues/87#issuecomment-117211242
* Commented by: ethanteague
* Created at: 2015-06-30T14:40:23Z
* Updated at: 2015-06-30T14:40:43Z

I think the logic we have in place is allowing for this, @RobertLRead . For example, go to ?saved=ibuprofen+xanax, and type in &quot;cocaine.&quot; You&apos;ll notice this is not in autocomplete (meaning it is not in the AHRQ dataset), but does return adverse events in the barchart, as it is in the fda dataset. Is there more we should be doing?


## Comment

* Source: https://github.com/CivicActions/nebula/issues/87#issuecomment-117245965
* Commented by: rakanowicz
* Created at: 2015-06-30T16:29:04Z
* Updated at: 2015-06-30T16:29:04Z

[Does this help?]
(https://civicactions.mybalsamiq.com/projects/agile-gsa/Drug%20List%20Vertical%20Revised%2006292015)


