# #92: Push each drug to Google Analytics as it is added to the tool

* Source: https://github.com/CivicActions/nebula/issues/92
* Created by: kevwalsh
* Created at: 2015-06-30T13:51:45Z
* Updated at: 2015-06-30T21:25:38Z
* Closed at: 


## Comment

* Source: https://github.com/CivicActions/nebula/issues/92
* Commented by: kevwalsh
* Created at: 2015-06-30T13:51:45Z
* Updated at: 2015-06-30T21:25:38Z


We configured Google Analytics to use Site Search to record the most popular saved searches.  For example  http://sideeffect.local/?saved=FINASTERIDE+FUROSEMIDE is recorded as a search for &quot;Finasteride furosemide&quot;.  

This only records people who access that comparison via a shared URL.  

In order to capture each drug individually as a search event, we want to push  http://sideeffect.local/?saved=FINASTERIDE and http://sideeffect.local/?saved=FUROSEMIDE as each of those drugs gets added to the tool.  





## Comment

* Source: https://github.com/CivicActions/nebula/issues/92#issuecomment-117349597
* Commented by: kevwalsh
* Created at: 2015-06-30T21:25:38Z
* Updated at: 2015-06-30T21:25:38Z

best way to do this is as `ga(&apos;send&apos;, &apos;pageview&apos;, &apos;{/?saved=DRUGNAME}&apos;);`


