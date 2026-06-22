---
layout: post
title: "Self-hosting High Availability is just Backups"
date: 2026-06-21 10:08:20 -0400
dontCapitalize: true

---

Everyone needs backups, we all know it in our bones, but you can also live your life without any backups.

It’s easier, faster, simpler, less messy, to not have backups. Not having backups is the option that works immediately, you don’t have to test it or be good at it. Everyone is a professional at not having backups, even those who don’t know what a backup is.

I’ve heard driving without a seatbelt also feels more free - I’ve never done it so I would not be able to say, officer - but I guess it makes sense. It’s easier too! You can’t forget to not buckle up!

No backups means taking a bit of risk and we take risks everyday, so it’s probably gonna be ok. You cross the street and take planes, right? That’s risk. Living is risking it. So why bother with backups?

Ok but say you weren’t an insane person - that’s too blunt sorry - rather, say you had lived long enough to know that computers fail, get lost, misplaced, stolen, that mistakes happen, that malware happens, that interns will occasionally git push -f, that for every piece of code you vibe, one day, some unpredictable dangerously-skip’ed-permission agent on the loose is going to “”optimize”” your precious files away.

You need backups, man! And woman! But this article isn’t about backups. It’s actually about HA - “high availability”.

Folks who self-host web servers - a reasonable choice! - often meet other folks on technical forums and engage in conversation which devolves into two predictable positions: self hosting is smart fun empowering and technically interesting, and it’s also nice to know you don’t have to give aws/render trillions of currencies per month to like, host a popular web site that [simulates a door-stopping spring](https://boing.greg.technology/).

The other camp, however, will say: yes, but I don’t want to deal with all of this. My time and sanity are worth a lot to me, and also, don’t you guys’es servers fail at some unpredictable times and you have to deal with that? Well, I don’t want that.

I say: you always have to deal with something anyway. Problems don’t go away, managed services don’t not fail. But yes, to your point, imaginary person I’m arguing with not made from straw, self hosting, often, is just a single server somewhere - which is a redundancy of 0. It’s definitely a pet, which means it’s not [cattle](https://cloudscaling.com/blog/cloud-computing/the-history-of-pets-vs-cattle/).

But hey! Good news - it doesn’t have to be this way.

I’m bad at submarine [marketing](https://www.paulgraham.com/submarine.html) - or whatever the name is - but I did write this entire blog post to 1) elicit joy, wonder, etc. But also 2) to share/announce that my good friend Antoine Leclair has been working on adding true, fully redundant high availability to [Disco](https://disco.cloud/), our self hosting open source software.

As far as I can tell, it'll be the first git-push-deploys, open-source, self-hosting platform where even the control plane has no single point of failure, without making you run Kubernetes. There is still work to be done on this, but it should let you be both in-cloud or on-prem (your precious thunderbolted mac minis!) and, importantly, withstand life's chaos at more than a few [nines](https://uptime.is/).

And it'll also be a paid addon, “open core”ish, to our existing open source daemon and CLI.

I could go into the reasoning behind this new bit of licensing, but in the tersest terms, we want to offer a paid service to those who run commercial/big/backup-worthy services, and let everyone else run their solo servers for free, as it’s always been the case.

I do have ONE question, folks. Is that something you’d pay for? hi@greg.technology is my email (very annoying to spell over the phone) - I would be happy to hear from you all.

With love, xx
