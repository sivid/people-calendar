## people-calendar
OuO

#### To use this repository
1. install `nodejs` https://nodejs.org/
2. `npm install`
3. `node index.js`

#### also, redis
Since I'm on Windows.. https://github.com/MSOpenTech/redis
I used Chocolatey to install Redis.  Surprising easy.
then install Redis as a service with 
`redis-server --service-install`
`redis-server --service-start`

Put html/css/js files in /public folder

---
#### commands to remember:
##### local testing
`heroku local web`

##### to deploy to heroku
`git push heroku master`  pushing to github works too..


##### REST API testing
`http-prompt localhost:5000`
##### change to URI; post with json body 
```
cd /api
post aaa=bbb
```