---
layout: post
title:  "you can use github actions to track your web analytics for free (sorta)"
date:   2023-11-15 19:08:19 -0400
---

I'm *not* done exploring funny uses of Github Actions, ok.

[Part I was how to run a web backend using GitHub Actions](/2023/10/09/you-can-use-github-actions-to-run-a-backend-web-server-kinda.html). This is Part II.

<hr style="margin-bottom:10px" />

#### TLDR >> You can use GitHub Actions to track your web analytics for free!! sorta.

<hr style="margin-bottom:10px" />

Why:
- I don't know
- cause you can.

Also, it's fun. And finally, GitHub Actions should have some way of running backend code (called/triggered by web? anonymous users?) because that would be so great, but that's just my take. give us web code server hosting already.

#### How does it work?

- your frontend javascript code pings the GitHub API and asks it to run a workflow
  - YES, you will need to encode your personal access token in your frontend
  - YES, GitHub says to [not do that](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#keeping-your-personal-access-tokens-secure)
  - YES, you should not do that
  - BUT, you can set your personal access token to """"""only"""" have the `actions:write` permissions on a single repo, and, *as far as I can tell*, someone could mess with your analytics very lightly by disabling your workflow (i.e. turning it off), but they couldn't ... do... other. terrible. things. I think. I'm pretty sure! Like, 70% sure.
  - [the code on the frontend looks like this](https://gist.github.com/gregsadetsky/47357f6f5ceeea8a898aafbaa8375c50).
- GitHub Actions will receive the request to run the workflow from the frontend and comply
- the [GitHub Actions workflow file is this one](https://github.com/gregsadetsky/github-actions-free-analytics/blob/main/.github/workflows/log.yaml). you need to add this workflow file to your repo.
- the workflow file will create a .json file for the web request under `.logs` and commit that to your repo

#### Pros / Cons

**Cons**

- this should never be used in production by anyone.
- personal access tokens are... probably not okay to publish on frontend web sites.
- your repo will be littered with .json files for every web request
  - ((were I to continue pursuing this - and I won't - I would create a second workflow that runs every 5 minutes, and merges all of the log json files into a single file, as a sort of map/reduce.))

**Pros**

- you never have to login to Google Analytics again

(fin)