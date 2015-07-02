# #66: Bar chart scrolls within the page

* Source: https://github.com/CivicActions/nebula/issues/66
* Created by: rakanowicz
* Created at: 2015-06-29T17:37:50Z
* Updated at: 2015-06-30T14:00:58Z
* Closed at: 2015-06-30T14:00:58Z


## Comment

* Source: https://github.com/CivicActions/nebula/issues/66
* Commented by: rakanowicz
* Created at: 2015-06-29T17:37:50Z
* Updated at: 2015-06-30T14:00:58Z

The bar chart scrolls within the page and produces a second vertical scroll bar. 
The title of the chart also disappears. 
Can the entire chart be displayed on the page fixed o that when one scrolls down the Page one is also scrolling down all the side effects (so the Page is as long as the list of SEs). Keep chart title fixed in place. 

![image](https://cloud.githubusercontent.com/assets/12954654/8414165/06348a4a-1e64-11e5-9797-0a7364789a1a.png)

title gets lost:
![img_0031](https://cloud.githubusercontent.com/assets/12954654/8414173/190126e2-1e64-11e5-90ec-53d94bddc958.PNG)




## Comment

* Source: https://github.com/CivicActions/nebula/issues/66#issuecomment-116782881
* Commented by: RobertLRead
* Created at: 2015-06-29T18:19:36Z
* Updated at: 2015-06-29T18:19:36Z

@rakanowicz I suspect this cannot be done.  I tried it over the weekend, and basically Google Charts has some weaknesses that make this bad.  I would like to suggest this be moved to &quot;LOW&quot;.


## Comment

* Source: https://github.com/CivicActions/nebula/issues/66#issuecomment-116783324
* Commented by: rakanowicz
* Created at: 2015-06-29T18:21:17Z
* Updated at: 2015-06-29T18:21:17Z

Can the title &quot;Reported Side Effects&quot; be fixed? taken off chart and added to page?


## Comment

* Source: https://github.com/CivicActions/nebula/issues/66#issuecomment-116890485
* Commented by: ethanteague
* Created at: 2015-06-30T00:43:28Z
* Updated at: 2015-06-30T00:43:28Z

@rakanowicz | @RobertLRead: I can fix this so that there is no scroll, in fact, that is the default behavior. I put in the scroll, and a container div.


