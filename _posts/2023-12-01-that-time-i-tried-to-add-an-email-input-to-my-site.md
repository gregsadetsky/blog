---
layout: post
title:  "i met my waterloo - that time i tried to add an email input to my site"
date:   2023-12-01 23:33:19 -0400
---

here's how I got here:

> it is the year 2023 AD and I would like, on my tiny tiny web pages hosted on github pages, to have an <input> for my visitors' email addresses, and for those email addresses to be submitted and then stored somewhere. they could be emailed to me. they could be appended to a google sheets. that's all ok. I just want those email addresses.

<small>(ok, it's very funny that the &lt;input&gt; above is an actual input...)</small>

---
---
---

news flash:

### I don't know how to add a little email input form to my little sites

# [without paying $290/year](https://tally.so/pricing)

## which is very frustrating to me.

---
---
---

ok but I did find a way and I'm just going to dump it on you. and I'm sure it won't work? in a month? something subtle and hard to debug will silently start failing? with no warning? for sure. FOR SURE.

but as of today - and today is all we have - it works. here goes:

1. sign up for mailchimp (this is a required step - I wish it wasn't?)
2. create an embedded signup form on mailchimp. it will be a bunch of html. we will modify it and extract stuff from it.
3. add this, roughly, to your html:

```html
<form action="" style='text-align: center;'>
    <input type="hidden" name="c" value="?"/>
    <input type="hidden" name="subscribe" value="Subscribe">
    <input type="email" name="EMAIL" placeholder="you@awesome.com" autofocus>
    <div aria-hidden="true" style="position: absolute; left: -5000px;">
        <!-- YOU NEED TO CHANGE THE BELOW -->
        <input type="text" name="........." tabindex="-1" value="">
    </div>
</form>
```

  - yes, leave the action empty. YES, have the `"c"` hidden input with the `"?"` value, otherwise NOTHING will work. (because of [cors](https://stackoverflow.com/a/70997063)).
  - in the embedded code you were given, there will be a hidden input with a bizarre `name` (`b_...` in my case). it's for spam protection. just copy the field you have into the form above. don't use a `"......."` name, I'm sure that would make it all not work / get you in major trouble.

4\. almost there?

5\. here's some typescript-ish for you:

```typescript
// THIS IS VERY IMPORTANT
// 5.1 take the <form action="..." value from your original mailchimp embedded form
// 5.2 AND REPLACE /subscribe/post with /subscribe/post-json 
// 5.3 so that it looks kinda like below.
// 5.4 there will be GET arguments after /subscribe/post like ?u=... KEEP THEM.
const FORM_URL =
  "https://......list-manage.com/subscribe/post-json?u=.....";

function validateEmail(value: string) {
  const input = document.createElement("input");

  input.type = "email";
  input.required = true;
  input.value = value;

  return typeof input.checkValidity === "function"
    ? input.checkValidity()
    : /\S+@\S+\.\S+/.test(value);
}

export function maybeEmailSignup({ form }: { form: HTMLFormElement }) {
  const emailValue = form.querySelector("input[type=email]")?.value;

  // double check that email input is not empty and semi legit looking
  if (!emailValue || !emailValue.includes("@") || !validateEmail(emailValue)) {
    return;
  }

  fetch(FORM_URL, {
    method: "POST",
    mode: "no-cors",
    body: new FormData(form),
  });
}
```

6\. you're so good! you're so done! you're done! go. go have a life.

7\. test your form once a month cause this is all so extremely fragile and untrustworthy.

8\. we used to have `<?php mail(...)` back in the day. we used to run code on servers. we were [normal and innocent](https://www.youtube.com/watch?v=lr_vl62JblQ). we didn't know how good we had it.
