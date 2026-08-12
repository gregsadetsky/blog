---
layout: post
title: "Reflections on AI"
date: 2026-08-11 10:08:20 -0400
dontCapitalize: true

---

### bad prompts

- "Don't make mistakes"
  - it will never not be funny, so I will keep repeating it. I almost want it tattooed. it's a fantastic life mantra. also, "don't have accidents" and "have more money".
- "Write a prompt that ..."
  - would it work if you said "write a prompt to create a software that has no bugs"? it would not work. "write a prompt so that the next ai can..." is asking for exponential hallucination. the tool doesn't know what prompt will "work" for it. of course, it will generate a prompt. it will not be the prompt you want.

### questions to ask yourself

- if you asked a 9 year old who's really into cars whether they could drive your car, would they say yes (they would)
  - if you asked them whether they could drive your car on the highway, would they say yes (they would)
  - would that be a good idea (no)
  - why do you trust machines that reflexively agree

- you are struggling to get the ai to do something, and so you think: that's impossible, it should work.
  - if you asked the same question to a model from 1 year ago or 2 years ago, or gpt3 from 2022, would that model be able to solve your problem? try a cheaper model right now - does it do better on the hard problem? no.
  - if a worse model does worse, how do you know the model you're using right now is good enough for the task? what if you're using a model that's 10% better or 1% better than last year but you actually need one that's 100,000% better?

### bad prompts

- "what am I missing?" - it can't know

### I only trust adverserial comparisons and testing rigs

Right now, my least distrusted tricks are:
- to make models ask and compare each other's outputs - agy vs fable vs codex vs opus. I don't have a sense of the best way for them to collaborate (typically, I ask one to provide code to all others and then to read back/integrate the findings). Maybe I should run an irc server locally for them to chat. I am not not serious about this.
- I truly spend so much time building integration and testing rigs - it's actually fun to do for hardware projects! - to try to keep regressions in check. yes, typed languages/type checkers/rust, etc. help. but keeping any of these systems "focused" and "not forgetting" is truly so hard.

### uncategorized

- I've started using /loop more to keep the machine doing a thing. I don't know how I feel about /goal yet.
- I've been approved to Anthropic's "Cyber Verification Program", and I still get blocked requests with Fable a lot (or was CVP only for Opus?). It's ~always a point of pride to be blocked - "wow, I beat the model!" - but I am not creating malware. Fable is definitely [better](https://blog.greg.technology/2026/07/26/doing-okayish-with-ai-at-the-ai-proof-competition.html) - I wish I could use it more.

### praying doesn't work

- against my own better judgement, my claude.md unfortunately has instructions against "toxic optimism" and asking it to use humble language. why would that ever work - I guess we all pray to some gods, and ours now is the proprietary trillion parameters all relu'ing in tandem. what do you want - I'm human too.
