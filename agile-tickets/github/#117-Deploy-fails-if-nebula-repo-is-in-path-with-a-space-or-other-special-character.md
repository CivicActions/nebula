# #117: Deploy fails if nebula repo is in path with a space or other special character

* Source: https://github.com/CivicActions/nebula/issues/117
* Created by: gregelin
* Created at: 2015-07-05T22:42:11Z
* Updated at: 2015-07-05T22:42:11Z
* Closed at: 


## Comment

* Source: https://github.com/CivicActions/nebula/issues/117
* Commented by: gregelin
* Created at: 2015-07-05T22:42:11Z
* Updated at: 2015-07-05T22:42:11Z

`cd &quot;$(git rev-parse --show-toplevel)/frontend&quot;` in `bin/build-frontend` causes an error if path to the repository contains a space. It causes an error 129 during execution:

```
Launching instance...
To see how to connect Docker to this machine, run: docker-machine env 87efeae-www9.gregelin.net
Machine created. Waiting a few seconds before getting the IP and ID
exit status 129
web uses an image, skipping
```


