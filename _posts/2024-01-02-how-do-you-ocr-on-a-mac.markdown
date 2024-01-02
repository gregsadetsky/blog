---
layout: post
title:  "how do you ocr on a mac using the cli or just python for free"
date:   2024-01-02 10:08:19 -0400
---

a kind reader reached out about [all of my iphone alarms](/2024/01/01/all-of-my-iphone-alarms.html) and asked how specifically did I run OCR on my mac. I'm not one to gatekeep, so here's how you can get yourself a nice local ocr 'service' that works in the terminal/CLI/python and costs 0 dollars:

- ((by the way sharing Shortcuts [is really weird](https://9to5mac.com/2021/03/24/icloud-shortcut-sharing-broken/) which is why I'm having you do this all manually...))
- (also, most of the stuff below only needs to be done once -- after that, actually ocr'ing is easy)
- open the **Shortcuts** app in your Applications folder
- click the "**+**" button to create a new shortcut
- in the right sidebar, search for "**extract text**"

<p style="text-align: center;"><img src="/assets/how-to-ocr/step1.png" style="width:300px"></p>

- you should see "**Extract Text from Image**" in the list of possible actions. **drag it** from the right sidebar into the main area on the left
- in the "Extract text from ..." action that's now on the left, click on the pale "**Image**" blue-ish pill
- pick "**Shortcut Input**"

<p style="text-align: center;"><img src="/assets/how-to-ocr/step2.png" style="width:300px"></p>

- you'll see a big "**Receive *Any* input from *Nowhere***" action appear above the "Extract text from Shortcut Input". it's all good, leave it as is
- in the right sidebar, search for "**copy**". you should see "**Copy to Clipboard**". drag that action below the "**Extract text from ...**" one.
  - dragging the "Copy to ..." action below the "Extract from ..." is really annoyingly hard. just keep dragging it *really* below and it will work at some point.
- your final setup should look like this:

<p style="text-align: center;"><img src="/assets/how-to-ocr/step3.png" style="width:600px"></p>

- in the last action, make sure that after "**Copy**" it does say "**Text from Image**"!
- you're like almost done!!
- in the window title bar, type stuff to name the shortcut. because [I'm from a generation](https://twitter.com/TheIdOfAlan/status/1458117496087748618), I recommend naming it "extract-text" or "ocr-text" or something simple with no spaces and all lowercases. sorry. **press enter** after naming the shortcut otherwise it won't remember the name (...??)

<p style="text-align: center;"><img src="/assets/how-to-ocr/step4.png" style="width:300px"></p>

- ok you may be actually done here I think
- try out the shortcut in your terminal:

```bash
shortcuts run ocr-text -i <A PATH TO SOME IMAGE>
```

- then try **command-V** -- do you see the resulting text? if yes, you're good to go!!!
- from python, you can do the following:

```python
import subprocess

file_path = '... some file path ...'
ocr_out = subprocess.check_output(
    f'shortcuts run ocr-text -i "{file_path}"', shell=True
)
print(ocr_out)
```

- THAT'S IT! x
