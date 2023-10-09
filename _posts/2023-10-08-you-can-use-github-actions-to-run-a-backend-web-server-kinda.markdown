---
layout: post
title:  "you can use github actions to run a backend web server, kinda"
date:   2023-10-08 23:33:19 -0400
---

I really don't know what to think about any of this.

hi, greg technology here. long time blog reader, not frequent blog poster.

ok so here was my thought process:
- github pages is an award winning, world changing, olympic/nobel-level gift to the world. it is great. it is beyond great. it gives free web hosting for absolutely most web sites. if you want to publish to the web, and your site has content, basically, github pages solves all of your problems. it doesn't create new problems in the world ---- it's a net positive world problem solver. it's [this meme](https://knowyourmeme.com/memes/yeah-sex-is-cool-but) but except it says "github pages" instead of "garlic bread."
  
  no, but think about it. it's beyond fast (it uses [fastly](https://www.fastly.com/) as its cdn, and fastly rocks), it's free, and you can deploy anything from tiny pure-html sites up to cool frontend react-y/[vite](https://vitejs.dev/)-bundled apps. life is so, so good. github pages absolutely rocks. it rocks.
- ok but you can't host backend web sites using it though. there's no express/node/python here. backend web sites need to live elsewhere. that blows so much.

so that's what I thought, and then I thought "yeah but why." and then I also thought - "there must be a way."

and there is a way. it works. I tested it. here's how:

```
    ┌─────────────────┐
    │  person using   │
    │  their browser  │
    └───────┬────▲────┘
            │    │
            │    │
            │    │
            │    │
            │    │
   ┌────────▼────┴───────┐
   │ small server that   │
   │ I would run         │◄───────────────────────────────────────────────────┐
   │                     │                                                    │
   └─────┬────┬────┬─────┘                                                    │
         │    │    │                                                          │
         │    │    │                                                          │
       ┌─▼────▼────▼───────────────────────────────┐                          │
       │                                           │                          │
       │               GITHUB ACTIONS              ├───────────┐              │
       └─┬─────────────────────┬───────────────────┘           │              │
         │                     │                               │              │
         │                 ┌───▼────────────────┐              │              │
┌────────▼────────────┐    │  another repo with │     ┌────────▼────────┐     │
│ a repo containing   │    │  an express server │     │yet another repo │     │
│ backend code like   │    │                    │     │                 │     │
│ an express server   │    └───────────┬────────┘     └─────────┬───────┘     │
└──────────┬──────────┘                │                        │             │
           │                           │                        │             │
           │                           │                        │             │
           └───────────────────────────▼────────────────────────▼─────────────┘
```

sorry, does this graph work for you? anyway ok, here's the plan explained again:

- someone connects to yourdomain.com
- yourdomain.com is a cname that points to crazyfreebackendhosting.com
- crazyfreebackendhosting.com is a server that makes all of this extremely complicated stuff work.
- crazyfreebackendhosting.com has oauth permissions to do stuff related to your repositories hosted on github, because you previously gave me the required permissions. basically I can call the API on behalf of your repos
- crazyfreebackendhosting.com -- when it gets a web request! -- calls [this specific github actions API](https://docs.github.com/en/rest/actions/workflows?apiVersion=2022-11-28#create-a-workflow-dispatch-event) i.e. it calls the "start a github action job right now" on the corresponding repo
- your repo boots up, and receives the web request (through github actions "[inputs](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#inputs)")
- your repo processes the single web request, and sends back the web response to crazyfreebackendhosting.com, which I then forward back to the user's web browser

### ok but it kinda does work!

it kinda works. it's just slow as molasses (about 15 seconds per web request). but it works -- look, I have a [weird test repo here](https://github.com/gregsadetsky/this-repo-demonstrates-that-you-can-use-github-actions-as-a-way-to-run-backend-web-servers-badly) and you can check the [github actions workflow file](https://github.com/gregsadetsky/this-repo-demonstrates-that-you-can-use-github-actions-as-a-way-to-run-backend-web-servers-badly/blob/main/.github/workflows/github-actions-demo.yml) and also the bizarre web """[gateway](https://github.com/gregsadetsky/this-repo-demonstrates-that-you-can-use-github-actions-as-a-way-to-run-backend-web-servers-badly/blob/main/github-actions-gateway.mjs)""". why am I trying so desperately to convince you.

### it all works. this was a really strange exercise. but it works

I derive satisfaction from making things work. this thing work. I derived whatever I wanted to derive. dy/dx. it's derived. it's done.

the truth is -- ok, so I might/could bring this to a fruitier fruition. I could actually launch it, register crazyfreebackendhosting.com, actually let you let me do API calls on your behalf (i.e. connect your repos and store your oauth tokens)

but it's so much work! to get web requests answered in 15 seconds! while abusing github actions and being a little web gremlin weirdo.

it's ok. I'm letting it go. but please know that this is possible.

and github should absolutely offer some sort of extremely light backend web hosting. some wasm-thing?? [wasmtime](https://wasmtime.dev/)?? it would be so exciting and fun. it would be incredible.

goodbye.