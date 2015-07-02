# #90: stopgap removal of remove method in error handler prevents data from &#x2026;

* Source: https://github.com/CivicActions/nebula/pull/90
* Created by: RobertLRead
* Created at: 2015-06-30T00:57:26Z
* Updated at: 2015-06-30T14:30:35Z
* Closed at: 2015-06-30T14:30:35Z


## Comment

* Source: https://github.com/CivicActions/nebula/pull/90
* Commented by: RobertLRead
* Created at: 2015-06-30T00:57:26Z
* Updated at: 2015-06-30T14:30:35Z

&#x2026;being removed, I think it was written in error somehow, or is no longer appliccable

@ethanteague Note that this retains some debugging statements.  I would be tempted to merge it as is and take out the debugging statements later---but it is up to you.  You may be able to think of a better way of doing the error handling --- this just puts a band-aid on the immediate severe problem.


