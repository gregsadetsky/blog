---
layout: post
title: "$16k and a solar panel"
date: 2026-11-08 00:00:00 -0000
dontCapitalize: true

---

Something about hearing about the thing and experiencing it ain't the same - it's probably always been this way.

I've read about running LLMs locally and open source models, but you know - I'm just a [normal](https://www.youtube.com/watch?v=lr_vl62JblQ) man with a normal computer. I don't have _that_ much RAM. I've run [llama](https://github.com/ggml-org/llama.cpp), for fun, but who hasn't.

I hadn't realized models were a thing-thing and that you could run them and that they were so, so good.

Now I have.

It's incredible.

If you have $16k and can drive/walk/subway to a Micro Center, you should buy 2x [NVIDIA DGX Sparks](https://www.microcenter.com/product/699008/nvidia-dgx-spark) and run a local model (GLM 5.3 Flash quantized to 4 bits). If you also had a solar panel, you could just run it all, all of the AI, all of the coding models, perfectly, and absolutely locally, on a desert island.

(you need 2 Sparks because GLM doesn't fit into one. You can run other cool models on one Spark. that's ok too.)

(oh and also - go to [this site](https://shir-man.com/tokens-per-second/?speed=30) and see how many tokens per second we're getting for 8 people using the Sparks *simultaneously*, and you'll start to get a taste for why I'm slightly going bonker-ino.)

GLM is crazy man. The very fine staff at the [Recurse Center](https://www.recurse.com/) decided to offer a local model to the community, and I was happy to help set it up. It looks like this:

(authorized folks) -> (a small Django server running on Digital Ocean with Disco, checking API access) -> (2x NVIDIA DGX Sparks umbilically connected through a fancy [AI cable](https://marketplace.nvidia.com/en-us/enterprise/personal-ai-supercomputers/qsfp-cable-0-4m-for-dgx-spark/))

The possibilities are truly boggling. Nobody will pull this model away from you, and nobody can charge you money for it (more than what you paid for the hardware and power). The Sparks are not "spontaneous Christmas gift for the kiddos" cheap, but, they're not unreasonable if you have more than 1 car. Or if you are any shape of company. Or are a public institution. Or a country that's allowed to buy them.

Many (not all) security concerns go away or are at least manageable (prompt injection is still real!). The "model" (a bunch of floats!) is not going to "talk" to anyone. You're running the matrix math yourself. What the above-layers do (your coding harness, your API layer, etc.) is all yours to decide. You can firewall stuff off. You can be off the mothereffing grid and it will all work. It's local-local-local. (((we run a Digital Ocean droplet to offer an Internet-accessible API-gated service, but this could sooo be behind Tailscale/a VPN/your on-prem bunker...)))

All of the "radical" fantasies from self-hosting enthusiasts (I am sometimes one) are fully fulfilled - you do not depend on anyone’s whims, and do not have to trust others (you do have to trust yourself and apply updates; it's not crazy work).

Ah yes, you won't get updated models automatically ((but it's not like open source models aren’t improving constantly)). There may be a world where whatever model is out today is the last model you’ll ever have. But nobody can take that model away, and that model is... Opus 5-ish-ish [good](https://artificialanalysis.ai/models/comparisons/glm-5-3-flash-vs-claude-opus-5-medium) (((our version is a blip quantized-er/dumber))).

I'm half shoocked, half-more-excited-than-ever.

Not to sound like exactly how I'm going to sound, but having an "AI brick" - a little piece of furniture tokens-in-tokens-out'ing - seems to me like the most standard little object we'll all have in our future little apartments. Maybe that's delulu. Who knows, I've delulu'd before! It was fun!! xx
