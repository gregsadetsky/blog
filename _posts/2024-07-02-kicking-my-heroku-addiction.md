---
layout: post
title:  "kicking my heroku addiction"
date:   2024-07-02 10:08:19 -0400
---

i've been developing for the web for a long time. when i think about all of this time writing code that somehow ends up on the web, there's a lot to reminisce about. it's been a journey of more than 20 years through trends, novelties, best practices, and tricks picked up along the way. please clap.

and you know, i don't want to glorify a beautiful lost past that was supposedly strictly better. i was also less experienced and learned and grew. i used to do things differently just as my mind was different back then. what was it? messier? more supple? giddier? or just not the same, not worse or better.

if you've been in web development around the early 2000s, you probably have seen (or used) some of these - writing php and editing files in production over sftp. spinning up apache or nginx and configuring those, and also overriding them using hodgepodge .htaccess files.

i'm telling you all of this - ok, to reminisce - because it feels like the before times, in so many ways. and in probably one of the most crucial ways that made the before and the now times different: to deploy these web wonders, to host them, to keep them running through the night, to make it so others could enjoy our labor's fruits, we installed and rented and managed servers (which are computers, which are machines).

as one analogy goes, those servers were pets. pets that we cared for, and who also got sick. and also felt irreplaceable.

you didn't typically assume you'd have to move or replicate your (precious) server. it was in many ways a 1 of 1, a sum of a number of fixes and patches (all made live, undocumented, unique and bespoke.) a server was a computer you tried to leave alone. always doing bits of surgery on it, one did one's best to keep a server alive. you loved it in a special, computer-y, server-y, machine-y, sort of way.

stage left. heroku enters. ((the audience feels a shift))

what changed with heroku - how we changed as we got used to its patterns, as we adopted a new professional way of life - was to stop seeing and caring for pets, at all. rather, in our care were now very small herds of replaceable, manageable, generic, functionally clones-of-each-other cattle.

we all - adopters, users - became managing directors of micro dairy farms, where ~~cows~~ processes - our code being run - took life and died spontaneously and without much ado.

what changed ((((everything)))) was that underneath our feet, the world got flattened and abstracted. anything lower level than our code, all server management - all worries and time debugging proxies, domains, (v)hosts, all the glue and custom script-ery to update one's running code, to manage its lifecycles, absolutely all concerns about running more than 1 copy of it - evaporated.

heroku's main demo, main magic trick, its wondrously absolute appeal, was that you'd write a 4 line python server, add a 4 line file listing that server's dependencies, and 1 file stating that you wanted that web server to run (and run and run and run and run and run). that, and nothing but that, was enough to make a site exist for all.

you only had to `git push`.

`git push` and nothing else.

that was it and this is still it. even as the web expanded, as an infinity of new tools and stacks have been perfected, even if you personally might not want to deploy a python server, fine, ok - you still want your stuff to be live --- now. and you - we - i - all still want to `push`.

`git push` is the life man. we've progressed and will be doing all of this - whatever of this remains - in 91 or 15729 years so completely differently. but now - it's this. and it's great. and that's great. and what's great is great. and so that's it.

ok but sorry wait.

what exactly is the fucking problem?

i don't want to blame the economy, politicians, or the price of sugar in nicaragua. but the pleasure, nay, the privilege of having this most-sophististicated machinery at our fingertips, is that it gets unfairly, ungodly, monumentously expensive very super quickly.

in the context of A Business, all of this makes beautiful, rational, Excel sense. tally forms [costs](https://tally.so/pricing) $300 per year - for a lil form on your lil site - because if you run a business (((in north america?))), the math of whether it makes sense to try to set up forms (how? where?) and/or customize them and/or!! the fear!! of not being contactable is worth oh-so-much more than $300 per year aka $30 a month aka $1 a day, not even a latte per week. PITTANCE. so you, the Business, pay.

fine.

i - sometimes - am not always in the business of Business'ing. i [also](https://sonicgarbage.greg.technology/) Hobby a [lot](https://www.restaurants.rip/). i dilly-dally, actively, and try to make myself known online as a capital f fool and maybe also as an Idiot.

and i can't pay ~$20 per month per dilly-dallying little thought i once decided to `git push`.

<img src="/assets/heroku/heroku-tangerine.jpg">

~~Months~~ Multiple! Years! of heroku bills, also now in addition to render bills (render.com - a heroku competitor and successor, filling in for heroku's recent shortcomings, general loss of good vibes, and salesforce-iness)

*YEARS OF MONIES FOR WANTS OF FOLLIES*.

that's thousands of dollars - the smallest of potatoes for Business!! such small!! - for nothing. or not nothing. i got laughs for it, the stray compliment by email. press? friendships. pride. climbing the slopes of maslow.

but these past few years - I looked at myself in the digital selfie zoom camera mirror image - and really, really, really thought - how do i get off this wagon?

how do i kick an addiction to heroku?

...the answer soon ... in part 2... coming soon... stay tuned..... ars longa vita brevis...... xx
