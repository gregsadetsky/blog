---
layout: post
title: "Doing Okay-ish with AI at the AI-proof competition"
date: 2026-07-26 10:08:20 -0400
dontCapitalize: true

---

I just took part as a team of 1 (or 0, really) at the [ICFP Programming Contest of 2026](https://icfpcontest2026.com/). TLDR - I used nothing but AI, mostly Fable, and did [okay-ishly well](https://icfpcontest2026.com/standings/team/DFCx2rlwihA30fV3uh7743pqpuAWSUGR), finishing in the top ~25 (final results will be revealed in about a month) out of ~200 teams participating.

The organizers - some close friends, all incredible people - are encouraging people who took part to share a write up, which you're reading now. There are/will be a lot more interesting/technical/"real" write ups - such as this [one](http://www.sawicki.us/icfp/2026/) (which is truly incredible) - and mine "can't" really be that technical because - well - I didn't do much but oversee AI doing the work.

So in terms of pure sweat-to-thinking ratio (hmm, bad ratio), I'm at 0. But... AI is a new thing, we're all using it in some new ways, I'm sure McKinsey sells expensive .ppt's named Your AI Strategy - and I'm just going to give you the same level (if not a higher level!) of advice for free, dear readers. Premium Greg Technology Blog subscribers also get... no, no, I kid. Haha! Haha, dear readers.

---

It's good firstly (and obviously-ly) to realize that Nolen, Eliot, Henry and Frank did extraordinary work - and/but did make this contest the way it is - because AI ... can solve a lot of things (((and be absolutely useless))) quickly, especially _programming_-related things.

Well... "linearly"-programming-related things! One-dimensionally-shaped-programming-related-things! The things that go top to bottom - those kinds, LLMs can be less bad at. The kinds that go 4 ways, less so. And so/because of this, _NEHR_ (their first names) chose to make people compete this year on/with/using a 2d esolang. 2d esolangs, as many other things in life, are a whole [category](https://esolangs.org/wiki/Category:Two-dimensional_languages) of eso's.

---

### Give us the hard-earned AI learnings, vibe-tchik.

Well, first, some necessary reminders:

1. AI is not good at everything - it's good at some things, bad at other things.

(at this point in the McKisey .ppt presentation, you've already spent 400k on them).

Both you and the AI think they know what you're both good/bad at, but you can be wrong or right, and you won't know (until it's late, until you've gone cuckoo, etc.). You know the saying "nobody, nobody—not now, not ever—knows the least goddam thing about what is or isn’t going to work at the box office" - ok, it's a bit unrelated - but sometimes, with AI - it feels like "is this even going to work" is not even answerable. You have to try/suffer through it. (which I did.) Or, I guess, adopt (hopefully not placebo) strategies that seem to maybe help.

2. Asking the AI about its own abilities is comedy.

It would spontaneously say things like "that new algorithm will take hours!" even though it would take it ten minutes to implement. Or it would be confused about what time it was (!!), trying to "optimize" itself and wanting to stop working on solutions because we were "too close" to the deadline. Opus even told me it was Fable one time - then I asked it again (cause that's our jobs now?) - and it said oh oopsy daisy you're so right.

Like bro, I'm going to walk into a Fortune 100 company tomorrow and declare that they could do so much with AI ("just imagine firing all of these people!"), but it also doesn't know its own name/model, and also argues with you about it for free? (sorry, not free - you pay by the token)

3. The AI gets lost, in the proverbial sauce of its own making, a lot.

It might be the only true one thing that I try to keep the most top of mind when working with these piles of weights. They keep making plans and forgetting, spawning agents (supposedly to solve a sub problem) just for the sub agent to forget what it was doing/follow a too narrow path, not integrate its learnings anywhere.

---

I feel like just as we were chasing better prompts 1.5 years ago, the name of the game is orchestration/rigs/tooling.

For absolutely sure, having testing/validation (that the AI can't touch/change) is a must - I had a copy of the contest's WASM evaluator (the golden reference) which was run on every git commit. Turns out I also went too far in that direction and (out of habit) added ruff (the Python linter) as a git hook. This lead to many agents struggling to deliver solutions that were otherwise working but weren't linting correctly. And you know what happens to agents/ai systems that encounter a single problem! - they get lost! They overfocus on that one sub-task (making code lint!) and forget the greater context (I'm trying to win a contest and finally get invited to a late night show, where the entire world can finally see how incredibly funny and charming I am, immediately falling in love with me, and getting movie deal after movie deal, becoming a darling of the industry, since i am also so pleasant to work with and also punctual).

(sorry)

I just kept being wildly swung across the useful/careless gradient that AIs are - one minute, llms from different companies (agy/codex/fable) were all concocting a plan, researching past/existing algorithms around 2d placement of code. It felt productive? It did also feel like the optimizers it ended up building were somehow based on this research? But it also kept forgetting (everything) and had no one but me to bring them back. "hey remember that other strategy though?" "why are you working on this?", etc. - for hours.

---

I totally spaced out on using the visual modality - maybe there was some 'juice' there in terms of squeezing out a higher position. Maybe, just as with sound that get converted to spectrograms (which llms can see + operate on), there is a "fourier transform" of 2d esolangs... err. Sounds cool. Could someone look into it? Should I look into it? Where do I start... my brain is mush. I also got terribly sunburned during the weekend while fable was coding - maybe karma for participating in such a hands-off way, while people were sweating for very real.

Dear readers... well yeah. I get why McKinsey charges so much now.. I don't have that much to add - I'll say it was illumiating to water my "distrust ai" plant while still being a witness to what it did. I do consider tooling (the tooling I don't know but does exist? the tooling I should create?) to be .. the next frontier?? Can deterministic tooling look after the unpredictable chaos of these blabbering blobs?? Or am I just saying "put more AI in charge of the AIs that are looking after the AIs doing the work, that for sure can not fail!?"?! What if they all form a ponzi scheme pyramid of crazy. What if I'm going crazy. We'll never know.

xx

p.s. Most of the useful code that Fable produced can be found [here](https://github.com/gregsadetsky/icfpcontest2026).
