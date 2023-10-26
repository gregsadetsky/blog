---
layout: post
title:  "'Serializable' and other SQL isolation levels"
date:   2023-10-25 19:08:19 -0400
---

I invited my friend [Antoine Leclair](https://github.com/antoineleclair) to chat with me about database isolation levels, and specifically, the [Serializable](https://www.postgresql.org/docs/current/transaction-iso.html#XACT-SERIALIZABLE) one.

What is serializable? Well, it's complicated. I mean -- I've never been really sure of what it meant. Or even... what database isolation levels were for? I thought... using transactions was enough? To protect me? But protect me from what? "from bad things happening"..? I didn't really know.

Well, now I know a little bit more thanks to Antoine! And hopefully this will be useful to you too.

Watch below. And, here's the [audio-only version of it](/assets/serializable/ep0.serializable.mp3). And I'm also including a [whisper](https://github.com/ggerganov/whisper.cpp)-transcribed version below.

Be well!

---

<iframe style="width:100%; min-height: 400px; margin-top: 20px; margin-bottom:20px;" src="https://www.youtube.com/embed/FopmARbtmWk?si=Ua5LLbAO1T7rrOXq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

<p style="margin-bottom:30px"><b>Transcript</b> (sorry, it's kind of a mess... maybe gpt could clean it up?)</p>

Okay, I think this is working.

So hi everybody.

My name is Greg.

I'm here with my friend Antoine.

Hi Antoine.

Hi Greg.

Hey.

Okay, so this is a first for us.

I mean we're friends.

We've been friends for a while, but I don't think we talked to each other in English over video so we're very nervous and we're very happy to be here.

And the reason, I don't know, is this better?

I don't know.

So I think this is more like you see more of our beautiful backgrounds and Antoine's incredible mic setup and also all the weights that he has.

So why are we here today?

So Antoine is one of the, not to put you on the spot, I think best developers I've ever worked with.

There, I said it.

I've always, always admired him.

He's always been, not he, you have always been very inspiring to see work and especially when you're thinking about tech and architecting.

And we're going to talk about web tech today and I know you do more than the web, but there's enough challenges in the web stuff that it's an interesting thing to think about.

But basically, yeah, when I've seen you, when we've talked about architecting and we've talked about either like scaling and a lot of things and databases and stuff, like you've always really impressed me with how much you know and how much kind of the, you're seeing problems in advance in a very calm way.

And you usually make your way around them very smartly.

So I've always really enjoyed that.

And we've had one conversation.

We've had, there's one topic of conversation that's always really, really, it's kind of obsessed me a little bit and it still obsesses me, but I think today we get to finally, I mean, we're recording this, right?

It's like the goal is maybe it will interest other people.

Maybe other people will also now be obsessed with this.

I don't know if that's a good thing, but what I want to do today is talk about database serialization.

Is that okay?

I know, you know, but is that, is that still okay?

Are you still there?

Yeah, totally.

Yeah.

Okay, cool.

Okay.

So I will just for everybody's, you know, kind of contacts, whatever, like I do some software development, I've done database stuff.

I code some Python, but I do it in a dumb, naive way.

I think I make stuff work.

I publish it on the web.

I'm happy.

I don't think too much about these things.

They just kind of work.

But I also like to work with people who think about them a little bit deeper than I, because they usually get me out of trouble or they just point out problems.

So here is my point of view.

And I would kind of, maybe let's kind of maybe we can start a conversation here.

My point of view is that you don't need to think about serialization, like whatever serializable stuff that we're going to talk about today.

I think you don't need to think about it.

I know it's not true, but I'm just trying to like get us to talk about this.

So my point of view is like database transactions, which is like, I think what I think I know, right?

So the fact that when you do like database stuff, and I usually use Django.

I know you use more like SQL alchemy and obviously your SQL foo is more advanced than mine.

But in Django, you know, when I have like important database stuff to do, I might like remember there's transactions.

And in my mind, a transaction is a safe way to do complicated SQL stuff, right?

Like I'm reading a value, and I want to update it and I want to make sure I'm not even sure, but that like somebody else isn't going to like read and write it at the same time as me.

I'm a little bit confused, but in a way I would just go and make a transaction that just feels like the safe thing to do.

But I feel like that's not enough.

And I'm not thinking about it clearly enough.

And I want you to help me dispel that and maybe teach me.

So I'll be asking all the dumb questions that are going through my mind, and hopefully you can help me and hopefully this will help somebody else.

So please help me explain or please help me understand what's wrong about the way I'm thinking about it.

And what am I missing?

And what is serializable?

And what are transactions and what are databases?

Awesome.

Yeah.

So I guess let's begin with like what, yeah, I guess the topic of today is like isolation levels more than like serializable in the sense that serializable is one isolation level that you can choose from many isolation levels in database systems like PostgreSQL.

And I guess we'll focus on the PostgreSQL today to avoid like going in many directions.

So like without any transactions, if you just open like two connections to the database in parallel and in one connection you read something and then in another connection you write something.

And then in the first connection you go back and read something again.

Like you will see the updates from each of the connections all happening like at the same time as the lines are entered basically.

So like there's no isolation level in the sense that every time you hit enter, if you are like manually typing, you will just see the results in both connections happening.

For just like updating like a few things like that using like a terminal, most of the time it makes sense to just like go like that and not have a transaction open.

But when you are dealing with other stuff, like for example, you are buying a ticket, like I guess we can use an example of tickets.

Let's say you verify if a seat is available, then when it's available, you buy it, like you reserve it.

Let's say, yeah, let's say reserve.

You reserve it.

So in the same connection, like in the same flow of SQL queries, you would select and obtain that seat basically.

And then you will update that row to say like I reserve it.

Then let's say in two connections, like another one, someone else is doing the same thing at the same time.

Right, they are buying a ticket.

Yeah, exactly.

Yeah, on the same, like at the same time, the two connections or at the same time, almost at the same time, they check to find a ticket.

They find the same ticket.

And then since they got the same ticket, then they try to reserve it.

Since you don't have any transaction open, then they will both write to the database that same row saying, yeah, I reserved it.

So the first one will say, oh, I reserved it for user ID ABC.

And the second one will just override the change with, oh, I reserve it with a user

CDF.

Okay.

Okay.

So this is really good.

And I think, yeah, you really set the context right because I wanted to mention it and I didn't, but this is great.

Yeah.

Let's talk today about a ticketing system, right?

Because I think there are kind of like simpler database things where transactions are like not necessary and we can, we could also talk about them, but yeah, let's focus on this case because it does happen.

And we're also, we also happen to like, maybe we're going to work on a ticketing system together, which is a whole thing that I'm excited about.

But right.

So ticketing system has like, sorry.

And I know this is really obvious, but just to state it, and I'll be stating obvious dumb things from now on.

Ticketing system, it's like, if there's an event that has 10 tickets, you don't want to sell 11 tickets, right?

If the limit was 10.

Exactly.

Yeah.

And so what is, and I know like this would probably help if we had like graphs and stuff.

And the only thing that I can do is like this thing, which is not helpful.

It just says welcome to the episode.

But let's say I could like with my hands, like create database tables.

So what are the tables?

Like maybe like even call the tables so we can kind of work through them, even if it's mental right now.

So is this like one table and is there like one row per ticket?

And to know how many tickets there are, you do like a select count and then you're like, oh, there's nine tickets so I can sell a 10th one.

Is that kind of how you're imagining it?

Just to make sure.

Yeah.

So far it could be that.

Yeah, definitely.

And also even like to go one step further, I guess.

Let's say you just list the available tickets on the site.

Okay.

Okay.

And select star.

Yeah.

Yeah.

Let's say, yeah, select star exactly from the tickets available.

And like, let's say you have another SQL query that says like select count from tickets.

So that you say like, oh, I have like 10 tickets available and here's the list.

Those are two different SQL queries.

And if while you are like selecting those tickets, another client will buy one ticket.

So the first query would say like select tickets, you have like 10 tickets remaining.

And then the other client buys a ticket.

And then the next query select star from tickets, you get only nine tickets to show on the page.

So like on the same page, it would show like we have 10 tickets available and then you will list only nine tickets available because you're not within a transaction.

What you see is basically like everything happening live on the site while you're doing the queries.

Right.

So like you're always getting the truth, but you're only getting the truth when that line runs.

And obviously we're talking about the problem of websites that have more than one user, which some of my websites don't have that problem.

But many websites do have that problem.

So okay, this is becoming clear, but now I'll say the most controversial thing.

Right.

But that's what transactions solve.

Right.

And I know the answer is no.

But in my mind, if you like told me this and you did, I would go, okay, great.

I really agree with you.

If I'm selling a ticket and there's like obviously a chance that two people might try to buy the same ticket, I should do select count.

I should check the number.

And then if it's like less than 10, let's just say it's hard coded.

Then I can do whatever, like insert into purchase tickets or something.

Right.

And that block, I just need to make a transaction.

And if it's a transaction, if two people do it, something magical will happen and there will be no problems.

But that's not true.

Right.

And that's exactly the conversation today.

Right.

Yeah, exactly.

Yeah.

So by default, when you start a transaction in PostgreSQL, the isolation level that you get is read committed.

In the sense that the example I just said, like you're getting things live as they happen.

So like you could show like 10 tickets available and only list nine after that because it's been bought like between the two queries.

That's what you get by opening a transaction right now in PostgreSQL.

If you don't set the isolation level, you get read committed.

So that's the happening live.

And the only benefit of doing that is that opening a transaction is that you could make many changes and they wouldn't be visible to other connections until you commit at the end.

And if something goes wrong, then you could also roll back or abort and not write any of those changes to the database.

So that means that the read committed, and I guess this is just the stuff that like I haven't touched committed to memory because I've seen these like isolation, like it's a list.

But I think kind of the point of this call that I'm doing with you is like, it's kind of important to know what they mean, right?

You can't really use a database and not really care about isolation levels.

Like is that a good takeaway?

Yeah, yeah, definitely.

Like at some point, the difference between some isolation level becomes very subtle.

But like I think that the one that you should remember is that like read committed, the default one is definitely like not protecting you from updates happening at the same time as you are doing things.

Interesting.

And so let's just go to read committed and I'll try to state it in a way that like is simple enough that I'll understand it.

So what you're saying is, while I am reading the number of tickets, and I decide even if it's incorrect, but if I decide to like insert that ticket, it just means that other people are not seeing my insert until my transaction is done.

Exactly.

Yeah.

I see.

So, okay.

Well, so, okay.

But that doesn't work for tickets, right?

Exactly.

Yeah, that doesn't work for tickets.

And like the use cases for that isolation level is like, to me is really like for stuff that is not that important.

Like if you were to write a bunch of logs or analytics or things like that, like it's not that important.

You're just like writing and what you want is performance more than like truthness in the data.

Yeah, yeah, yeah.

Right, right, right.

I mean, it's kind of, it's kind of ironical in a certain way that like the read committed one is really good for writing.

Well, writing, writing that doesn't take into account other things, writing that doesn't take into account reads.

I'm still trying to come up with like, just like an easy mnemonic for me to remember, but okay.

So I accept that read committed, like doesn't work, right?

Because if we just walk through the exercise, if you have to read commit transactions, first of all, they could still be happening at the same time.

Is that accurate?

Right.

They would still like be like, right.

And they're like both within transaction bubbles.

So like the fact that I'm inserting in one is not going to affect the other, but they could still read at the top of their individual transactions.

There's one ticket left.

They could both decide, great.

And they could both insert that like purchase ticket.

And at the end of both of those transactions, you still end up with 11 tickets sold.

Is that accurate?

Yeah, yeah, definitely.

And also like in that case, even if you're using the transaction, let's say you read those like the count, you have 10 tickets available.

And during that time, another one comes there, like you both open transactions.

And then during that time, someone else comes and they buy a ticket and commit.

Then in your own transaction, you see those changes happening anyway, because they've been committed in that other transaction.

So it's not protecting you even like if you are both in transactions.

Right.

Okay.

So that sucks.

Okay.

So we're not going to build our ticketing platform with that.

And this is the little PSA that also was really interesting is that we got started and I was like, let's use Django.

I love Django.

And I will absolutely still build a million Django projects from now on.

But you, you know, we typically like don't necessarily work with Django, even though

I think you respect it, but don't answer it.

Fine if you don't.

But I think you do.

And you were surprised, right?

Like you're kind of the moment that we had and we had a conversation.

You were like, hey, like you use Django, like you set up the models.

We're like trying to do this ticketing thing, like just an MVP.

And then you were saying, wait a second, the default isolation level in Django is not the thing we're going to talk about now, so it's realizable.

And you said, actually, Django seems to like not really help you when you try to do things like more correctly, like the way that you need to do for tickets.

And then we kind of got into a weird, like, we were like, huh, like maybe Django is not the best for this.

So maybe I'll leave out the conversation about Django because I'm not fully sure.

Maybe some also super smart people who like know Django really well, way better than I do have figured out the Django serializable thing.

But just like PSA, right?

Like something about Django, like a default isolation thing for ticketing platforms, if you happen to build one, just like take note that something could happen that you wouldn't expect.

Okay.

So let's exit Django.

Let's just talk about back to like Python, even if it doesn't matter, but most probably

SQL, databases, and then the answer to this, right?

Which is like the other isolation level, which is called serializable.

So can you explain to me what serializable, you've convinced me that read committed is not the right choice for tickets.

What should we do?

And again, I know the answer, but what is it and why?

Right.

So there are many isolation levels.

Read uncommitted is one of them.

Sorry.

Yeah.

Actually there is read uncommitted, which is like in PostgreSQL, it's not even supported that much.

They just use read committed.

Then you have like read committed and you have repeatable read and you have serializable.

So in our example of buying tickets, let's say you select the number of tickets and you open transactions, like you have two clients opening transactions and like in the first one, they both use the serializable isolation level, which is the strictest one.

In the first one, you select the count of the tickets, you get 10.

And then in the other transaction, they buy a ticket and they commit the transaction.

But in the first transaction where you got the count of 10, you continue, you select all the available tickets, you will get the 10 tickets because they are isolated and you don't see changes from other transactions while you are in your own transaction.

Same with a repeatable read.

Basically you are in your own frozen in time view of the data.

Can I just change the example so that there's only one ticket remaining?

It'll just be easier for my brain.

Oh yeah, totally.

Yeah, yeah.

Let's do that.

You select the tickets and you get a count of like, you get to have one.

Nine remaining.

Yeah.

Okay.

One remaining and then you list the one remaining and the other one you buy the ticket.

So the first transaction that got the count and listed all the tickets, which is just one in that case, you still get that picture of the world that happened when the transaction started.

So you show that on the page.

It's all happened at the same time basically.

So it's kind of true that there's one ticket remaining.

And then the other one could buy the ticket, no problem.

And then let's say the user, the first user refreshes the page, they'll see a count of zero and no ticket remaining.

So at that point in time when you started that vision of the world, let's say, you had one ticket and the whole data is consistent.

You get a full picture.

And even if you continue to do things for one minute, you would still see that picture in time of how the data was.

Yeah.

So far that makes sense.

Okay.

Now let's go back to the case where two users would buy the ticket at the same time.

Right.

And we're talking about the same time.

Let's just say, really, one begins 10 milliseconds later and both take for some weird slow-mo illness of whatever, maybe they take about a second, but they are really like two contiguous blocks of time.

One is just slightly shifted into future.

Exactly.

Exactly that.

Yeah, yeah, yeah.

So first client tries to buy a ticket.

So they select the tickets to see how many tickets are left, something like that.

And then the second one would be like, okay, I found one, so I will buy that one.

So you update that row to say that ticket has been bought by that user, for example.

Same thing is happening on the second thread, basically, the other client trying to buy a ticket at the same time.

So they select the tickets, they see one ticket, because they do it at the same time, basically.

The first one tries to find tickets, they get one, and the other customer that wants to buy a ticket, they select tickets, they find one as well.

So they're trying to buy the same ticket at the same time, basically.

And then let's say the first one, the first customer, the machine was a bit faster, for example, and commits the change, the first one.

So then the second one, the transaction will just fail.

It will reject the transaction.

When you try to commit, it will fail.

So then the responsibility of handling that failure is in the code, like the Python code, for example.

Right.

So in that case, if you didn't do anything, the second customer would probably just see an error page.

Right.

And you don't want that to happen, obviously.

Right.

So in the real application, what would happen is that the Python code in that example would just go over that section of code, start again, and find a ticket, and try to buy a ticket.

But then it could not find a ticket this time, because then it's in the world past the first transaction.

Yeah, exactly.

So then it would return something to the user saying, "Oh, sorry, that ticket has been bought while blah, blah, blah."

So it's not available anymore.

Okay.

So it does the right thing.

It raises an exception, which in Python, there's a whole ethos about, it's good, right?

We want exceptions.

We want things to be clear.

And obviously, you would catch it.

I'm a little bit curious.

I mean, I'm curious about a million things here, but is it accurate to say that this the failing transaction, the second one, right?

The one that's a little bit slower or just came a little bit more in the future.

Is it failing on the update or the insert?

It's not the selects that are just going to make it fail, right?

If you have two blocks of transactions and they just select stuff, there's no isolation thing.

Exactly.

Yeah, yeah.

So in a sense that you still get a picture of that data in time, but then yeah, definitely if there's no update, there's no chance that a transaction will fail.

It will just succeed.

So, right.

So the two transactions might both do a select star and got it.

And I mean, if they start a little bit later, if there's nine rows, there's still nine rows.

It kind of doesn't matter.

And they're isolated.

Okay, that's good.

Just again, trying to rephrase this.

But obviously an update, an insert, whatever, it is changing the database.

Is that, and I'm sorry, I don't mean to be like, let's look into Postgres source code because I don't think then we'll emerge from that rabbit hole.

But is it truly that any, there's a categories of like SQL verbs or commands or whatever that affect the database.

And those are the ones that Postgres watches or uses to determine whether it's going to break other transactions.

Like what is the real trigger point of like-

Yeah.

So yeah, to that point, I'm not sure how in Postgres it's implemented, but I would think that when you update something, it marks the data as being updated.

And then if you try to write on something that has been updated within that transaction, then, so I think it's not that much about the SQL that you wrote, but more about the data and the tables and the rows.

Right.

And of course there's like a whole other topic, which is more hyper, like hardcore intense.

And I'm sure there's like beautiful articles about this, sorry everybody that I didn't do my research, but I'm sure there's like thinking about whether it's the whole table that was affected or certain rows, right?

Like, cause like, you know, is it just like, oh, anything changed in the database, I'm going to make all transactions fail.

I'm sure Postgres is smarter than that, but is it like seeing only like which columns change or is it new rows or whatever?

And I got to get into it because I feel like it's too much.

But what you're saying is like, just back to the kind of like the core point of this is that like serializable does the right thing in that it breaks your transaction specifically by saying, hey, you expect, like I gave you a vision of the world, you were operating in that vision of the world.

You kept doing stuff inside of your transaction bubble, but while you were doing that, the world changed and in a significant way, like the data changed, whatever it changed.

And so your preconceived notions are wrong.

It's just kind of like maybe somebody who's arguing with you and they're going off from a wrong fact and you just kind of go like, actually, that was all wrong.

You thought you said something at the top, it's all wrong.

So you're all wrong.

That's not a good way to have a conversation.

But in the case of the transaction, it just gets killed.

And then what does the exception look like?

I'm just curious.

Is the exception like super generic and it just says like, is it just like error?

And you're like, okay.

Yeah, no, it's kind of clear.

It says that there's a conflict in the transaction could not serialize or something like that.

So it's specific about that.

And usually in like the libraries that you use to do SQL, like SQL community, things like that, they catch that and they raise like a specific type of error that you can catch and retry.

And handle, which is different than like you couldn't connect your database because...

Exactly.

Yeah.

Okay.

This has been really great.

And I want to part with one last question.

And thank you so much for your very generous explanations.

It's been really great for me.

I hope it's been nice for others.

I want to know whether every single project I do now should use serializable because it feels a little bit like, hey, it does the right thing.

Sure.

I'm not working on ticketing systems all the time, but I'm annoyed at the idea that I might be like select and inserting wrong things.

Like I don't want it to be convenient, but also like weirdly do subtle errors.

That is the worst kind of errors, the subtle ones.

I want obvious glaring gigantic errors.

I love exceptions because they mean there's a problem that I get to fix.

I don't want corrupted data.

So I suppose there's going to be a performance thing, but let me ask you still, would you say everybody should always use serializable all the time?

Does that just solve that kind of problem?

So it's not even worth not doing that?

Yeah.

So, well, definitely.

It's an easy answer.

Like, no, like you shouldn't use it all the time.

However, I feel that PostgreSQL having the default of read committed as the isolation level could be changed to, I feel like it should be changed to maybe serializable in the sense that like, you know, like when you start a small project, you want correctness first.

And if you then have like specific things about your project that you want to forego that, like abandon, give up correctness for something else that you get, like a performance or performance would be a good one.

Then you make the decision, like I explicitly say, I don't care that much about correctness.

I want performance for my use case.

So I feel like when you start a project, if you know that you won't have like a huge spike in traffic and things like that, personally, I would use serializable if it's easy to use with like the framework that you're using and things like that.

And then like you go down in isolation level, like it makes sense depending on your project.

Interesting.

And so performance, like clearly transactions failing because the database changed.

Like clearly there are situations where either it doesn't matter or as you're saying, you can handle it because you can put in more thought.

But it is a little bit true.

So I guess, yes, of course, the answer, like should it always be for everyone forever?

The answer is no.

But it would make sense.

You're agreeing, right?

Because what you're saying is that as a default, as a safer default that you break out of consciously because you know that you can remove the safety of it rather than being in a less safe place that's a little bit more performing, but it's also more confusing and it can be more confusing to people like me who don't really think super deeply about these things and just want to make weird projects really quickly.

You feel like there should be a little bit more safety for by default.

Is that safe to say?

Yeah, that's my feeling.

Like in general, I care more about correctness.

And if I want to build something that needs more performance, then you figure something else because if you still need correctness, but more performance, then you may go down in isolation levels, but build an architecture that's bigger and things differently.

And yeah, and also at that point you may consider other data stores that are like key value stores, things like that, that could be even more performance maybe, or more distributed, things like that.

But then you get into another world of having many data stores and then how do you distribute transactions, things like that.

So to me, the default for most projects is that you have a single database that you can scale up vertically.

And that's why I think you should have the best isolation level when you're working with that.

Because according to the needs over time, you can start to degrade, I would say, the isolation level.

And even then, you may decide that only specific things in your project require other isolation levels.

So for example, in the example of the tickets, you may say, I don't care that much about the comments on the event, for example.

Maybe those can be less strict.

But when you are buying the ticket that one specific transaction, you want it to be survivable.

So depending on the page or what the user is doing, you may decide on different isolation levels and they usually play well together.

So the one that says read committed can still work while the other one is survivable, for example.

And you can set them per transaction, right?

You mentioned that earlier.

Exactly.

Yeah.

Okay.

That's awesome.

So it's not just you're going into postgres.conf and then you're like...

Yeah, no.

It's definitely per transaction.

It's per transaction.

Okay.

Again, smart people have thought of this.

Okay.

I think this is great.

Half an hour.

We did it.

We explained everything.

Everybody now knows more.

Thanks to us.

So wow.

We're just so awesome.

No, this was really fun.

I'm really grateful.

Maybe this will be one of many.

Maybe this will be one of one.

But thank you so much for taking the time this morning.

You're welcome.

Thanks for having me.

Yeah, that's great.

Goodbye, everybody.

Leave comments.

I don't know.

You can email us.

Whatever.

Do good things.

Do good work.

But just use Serializable if it fits your use case.

Okay, bye.

Thank you.
