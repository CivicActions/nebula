# #34: Add a purge CDN cache step to deployment

* Source: https://github.com/CivicActions/nebula/issues/34
* Created by: davenuman
* Created at: 2015-06-26T14:08:58Z
* Updated at: 2015-06-26T15:30:36Z
* Closed at: 2015-06-26T15:30:36Z


## Comment

* Source: https://github.com/CivicActions/nebula/issues/34
* Commented by: davenuman
* Created at: 2015-06-26T14:08:58Z
* Updated at: 2015-06-26T15:30:36Z

Currently when the production site is deployed, updates are not seen for some time because we still see the CloudFlare CDN cache of the site. The API supports purging the cache so we should do that after the site is deployed.


## Comment

* Source: https://github.com/CivicActions/nebula/issues/34#issuecomment-115714830
* Commented by: davenuman
* Created at: 2015-06-26T14:52:35Z
* Updated at: 2015-06-26T14:52:35Z

Code added but I see this message in the output:
```
[Error: Rate limit enforced for cache purge. (You can try again in 60 seconds.) If you&apos;d like to make rapid changes to your cached resources, check out &quot;Development Mode&quot;.]
```
This could be due to the fact that I was just testing the api call before adding it to the script. I&apos;ll check on next deploy to see if this persists.


## Comment

* Source: https://github.com/CivicActions/nebula/issues/34#issuecomment-115732038
* Commented by: davenuman
* Created at: 2015-06-26T15:30:36Z
* Updated at: 2015-06-26T15:30:36Z

As I expected, it worked on the next deploy without error:

```
Cache purged for domain sideeffect.io
```
No code change.


