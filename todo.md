###tests
tests now use https://github.com/substack/tape

###how to store stuff in redis
Redis' Set supports intersect/union/remove and lots of other actions.  It might be enough to handle our date overlap logic... but where's the fun in that eh?

### how to arrange stuff in memory
Each Day consists of three Blocks.

A Block can have property, block.timestamp.  
The timestamp of a Block can be either

1. the same timestamp as the start (00:00) of that Day.  (represents morning)
2. the same timestamp as 08:00 of that Day.  (represents afternoon)
3. the same timestamp as 16:00 of that Day.  (represents night)
timestamps are seperated by 8 hours, so that going across Days will be easier.

For each user, we have the following options:  
http://stackoverflow.com/questions/210729/data-structure-for-non-overlapping-ranges-within-a-single-dimension  
http://stackoverflow.com/questions/12720505/data-structure-for-range-query  
https://en.wikipedia.org/wiki/Skip_list  
https://en.wikipedia.org/wiki/Interval_tree  
I'll do two sorted disjoint linked lists (one for can-go; one for can't-go) for each user.  Sounds the easiest.  

One element of a list must have two Blocks: ele.startBlock and ele.endBlock. It represents a date range.  
startBlock and endBlock are both inclusive.  

Can almost see the mountain of edge cases /cry

###APIs
clients should send us their timezone `moment.tz.guess()`


###webpage, UI/UX
Discussed with Jinny, will see what comes up.

###others
considering https://elements.heroku.com/addons/redistogo
