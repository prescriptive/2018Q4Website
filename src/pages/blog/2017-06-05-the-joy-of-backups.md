---
templateKey: blog-post
title: The Joy of Backups!
author: Terry Murray
date: 2017-06-05T14:02:59.109Z
description: >-
  I’m still searching for that person that tells me they got into IT because
  they wanted to do backups. If you meet this person at a dinner party, get
  ready for a lively conversation! Nothing like discussing retention policies to
  get the party going!
tags:
  - Backups
---
I’m still searching for that person that tells me they got into IT because they wanted to do backups. If you meet this person at a dinner party, get ready for a lively conversation! Nothing like discussing retention policies to get the party going!

Rest assured, this will never happen, because W. Curtis Preston is the only person on the planet that loves backups and I have it on good authority that he doesn’t like to party.

Being responsible for backups is a thankless job and for most, it is a secondary one. Backups are hard, in particular, the way most organizations do them. What if a user came to you and said, “so I was thinking, tonight I’m going to take all the data in the environment and just push it up from the storage, through the servers, over the network to this other spot over here. Cool? “

Their access would be revoked and they would be unceremoniously escorted from the building. A Goodfella’s style beat down may or may not occur.

While backups may not be a lot of fun, handling them well, so that you can recover when needed is critical.  What follows are some key challenges we see with many clients and some things you can do to ensure your organization is well protected, while keeping costs in line.

**Backing up Too Much**

Most organizations are guilty of this. Developing a good understanding of the data and services that should be protected and in what way, takes a fair amount of work.  It seems simpler to just backup everything. The challenge is that the size of the backups often causes problems. Backups don’t complete in time, so you try to make them faster or you consume the backup target capacity too quickly, driving up costs.

You should take the time to fully understand what you are protecting and why. Look at your recovery logs. What’s being recovered most often, what never gets recovered? Are you backing up system information or applications themselves that you would never restore from backup anyway?

Implement an archiving solution rather than relying on backups. In the past, this was a challenge as many of the archiving products were more trouble than they were worth but this technology has advanced quite a bit. These advancements have been particularly strong when it comes to unstructured data. There are many storage solutions that have built in replication, archiving and versioning that in effect, make them self-protecting. Most of the major storage vendors have solutions but there are also software based and open source solutions that allow you to leverage cloud or commodity based hardware and really drive the costs down.

Keep in mind that when it comes to getting backups completed, you can either backup faster or backup less. Most organizations focus on faster, we suggest looking at both.

**Deduplication – Lost in Translation**

The introduction of deduplication technologies into backup and recovery products has been a huge advancement. Source side deduplication techniques can greatly reduce the amount of time required to run a backup and target side can dramatically reduce the amount of backup capacity required. That being said, organizations can get carried away with this and become fixated on seeing big deduplication rates. When looking at potential backup and recovery solutions the expected deduplication rate becomes a big deciding factor.

What we would suggest is that there is a better way to look at this.

* First you need to understand what protection you need to apply. Here is the frequency of backups I need for each data category and here are the retention rules.
* Now it is a matter of determining the cost to provide that level of protection. Remember your goal isn’t to have the highest deduplication rate it is to provide the protection you need as cost effectively as possible
* Ultimately you can come up with a ratio that says for every GB of X type data, it will cost me Y dollars to protect it. Not only is this useful for making initial purchasing decisions but it can serve as a guide for capacity planning.

**Backup Monitoring**

When we are called in to help an organization assess their backup environment there is usually an event that triggered the call. Most often the organization needed to recover and couldn’t. In some cases there was simply a gap, something that wasn’t being backed up but more often it was included in the backups but it was failing or there were other errors. It can be shocking to see that the errors or alerts have been reported for months.

The challenge is that you almost never get 100% clean backups across all systems. There are always alerts, warnings and errors. Those responsible for backups start out diligent but eventually they get used to seeing a sea of red and yellow in their nightly backup reports and they glance at it. They miss that what they believed was the same old message, is in fact something new, something they need to pay attention to.

The best way to solve this is to implement a formal backup review process. This should include more than just the backup admin. The frequency and who all participates will vary by organization but you want to instill a sense of accountability. You want those responsible for backups to know that others are going to be looking at this on a regular basis. You want to look at both current and historical information so that you can detect changes. If you include the data owners or those responsible for specific applications, it provides better insight into why the changes may be happening. Why did the volume increase or decrease, why is performance suddenly poor?

One last tip on this is we would not suggest you simply send out the backup reports to 25 people. One of two things will happen if you do.

1. Everyone views it as noise and ignores it.
2. They will not understand the messages or the context and you will end up with someone insisting there should never be any errors!

The backup team needs the opportunity to review all the data and be prepared explain it to those not familiar with backup technologies or the specific solution you are using.

Well that’s it for now. I hope this information is helpful and we’ve got some other suggestions in our bag that we will share in future posts.

One last thing.

For all of you that aren’t backup geeks, this is W. Curtis Preston, the godfather of Backup and Recovery! If you’re responsible for backups you would be well advised to read his books and follow him online.
