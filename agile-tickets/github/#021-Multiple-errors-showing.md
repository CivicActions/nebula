# #21: Multiple errors showing

* Source: https://github.com/CivicActions/nebula/issues/21
* Created by: rakanowicz
* Created at: 2015-06-25T16:30:15Z
* Updated at: 2015-06-28T14:50:24Z
* Closed at: 2015-06-28T14:50:24Z


## Comment

* Source: https://github.com/CivicActions/nebula/issues/21
* Commented by: rakanowicz
* Created at: 2015-06-25T16:30:15Z
* Updated at: 2015-06-28T14:50:24Z

Added the last drug Quinidex and got multiple messages. The prior drug (Aceon) also produced one of these messages (but only one). 

![image](https://cloud.githubusercontent.com/assets/12954654/8359687/ecbdea7e-1b35-11e5-9e5c-92b49218630e.png)

Unchecked Quinidex and it still shows one message. 

![image](https://cloud.githubusercontent.com/assets/12954654/8359723/23e01748-1b36-11e5-9302-c4b545b44b72.png)



Check Quinidex again and all messages go away

![image](https://cloud.githubusercontent.com/assets/12954654/8359742/3bb11034-1b36-11e5-8925-20327c518015.png)


![image](https://cloud.githubusercontent.com/assets/12954654/8359925/6b5866ce-1b37-11e5-9d57-0efc80107fc7.png)


![image](https://cloud.githubusercontent.com/assets/12954654/8359930/71077bbe-1b37-11e5-8fee-5e78a36c6a01.png)



## Comment

* Source: https://github.com/CivicActions/nebula/issues/21#issuecomment-115727749
* Commented by: RobertLRead
* Created at: 2015-06-26T15:22:44Z
* Updated at: 2015-06-26T15:22:44Z

This is an intermittent error that occurs when we can&apos;t make a connection to the FDA.  I&apos;m not sure how to handle it.  I think providing one error message would be better.  Possibly a timeout-and-retry would be better as well.  I consider this a low priority until we get some of the other issues beaten back.


