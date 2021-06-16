# Attempted schematic to create common install with predefined config

```
schematics .:ng-new
```
 

 ## Issues:
 - Is it possible to change folder "context" so things like EsLint's add-new can just work (they seem to need to be IN the new angular app I am creating in the first step)
 - Find how to switch to Yarn 2. Do we need "pre" step or process to install a bunch of things (ng cli, yarn, etc.)


 # Current failure point: 

![Fails on EsLint](eslint-failure.PNG)