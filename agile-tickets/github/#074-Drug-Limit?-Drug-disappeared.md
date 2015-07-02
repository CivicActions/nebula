# #74: Drug Limit? Drug disappeared

* Source: https://github.com/CivicActions/nebula/issues/74
* Created by: rakanowicz
* Created at: 2015-06-29T19:17:55Z
* Updated at: 2015-06-30T14:36:52Z
* Closed at: 2015-06-30T14:36:52Z


## Comment

* Source: https://github.com/CivicActions/nebula/issues/74
* Commented by: rakanowicz
* Created at: 2015-06-29T19:17:55Z
* Updated at: 2015-06-30T14:36:52Z

Enter the list of drugs in image. Then I added Motrin. It was added to the list and then when I clicked in the field to enter another drug Motrin disappeared. Now it doesn&apos;t accept another drug. Is there a limit? 

![image](https://cloud.githubusercontent.com/assets/12954654/8416187/fa4c815c-1e71-11e5-8874-ce0908bda2b4.png)


When I clicked back in the drug field Motrin disappeared: 
![image](https://cloud.githubusercontent.com/assets/12954654/8416180/f0e74fb6-1e71-11e5-97f2-7ac32ceb41ed.png)



## Comment

* Source: https://github.com/CivicActions/nebula/issues/74#issuecomment-116878227
* Commented by: ethanteague
* Created at: 2015-06-29T23:26:30Z
* Updated at: 2015-06-29T23:26:30Z

@RobertLRead | @grugnog: Gonna need some extra eyes on this - sure I&apos;m missing the obvious, but inside of the ajax function error callbacks, I&apos;m saying that if a sessionStorage item doesn&apos;t match a checkbox, remove it. This logic is causing things to be eaten, randomly. I&apos;ve not been able to modify this with success. If I remove, then junk terms can get through. Strangely, this random munching of data only occurs after 6 or 7 entries. I&apos;ve tried using setTimeout functions around the remove to give the sessionStorage items to be built, but no luck. I&apos;m 4 hours into this task, so I&apos;m gonna have to set it down, as time is tight.




## Comment

* Source: https://github.com/CivicActions/nebula/issues/74#issuecomment-116878601
* Commented by: RobertLRead
* Created at: 2015-06-29T23:29:11Z
* Updated at: 2015-06-29T23:29:11Z

@ethanteague @grugnog Okay I think we can partially reprioritize this.  One thing I am worried about is that I believe in haste I coded on an N-squared or N-cubed algorithm based on the number of drugs.  When the you et 6 or 7 drugs, it becomes slow and unresponsive.  It is hard to separate that weirdeness from the duplicative weirdness.  I think i will try improving the efficiency of my loops...


## Comment

* Source: https://github.com/CivicActions/nebula/issues/74#issuecomment-116879881
* Commented by: grugnog
* Created at: 2015-06-29T23:38:44Z
* Updated at: 2015-06-29T23:38:44Z

@RobertLRead rather than try and optimize the code, I am wondering if it might be simpler to do a little more work on the backend (as we originally planned, I think). I think it would be very simple to aggregate data from both FCC and AHRQ on the backend into a single JSON structure. That way it would only require a single AJAX callback, and I am guessing the need for the looping and session storage stuff would all go away (the performance issues would, at the very least). It&apos;s a little risky at this stage, but it seems like it would simplify quite a lot. If you can put together a sample of what the &quot;ideal&quot; JSON structure would be on the front end I can have a quick play on a branch and see if I can get it working tonight.


