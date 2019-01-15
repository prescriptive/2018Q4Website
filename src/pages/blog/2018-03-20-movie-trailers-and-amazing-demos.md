---
templateKey: blog-post
title: Movie Trailers and Amazing Demos
author: Terry Murray
image: /img/movie-trailer-pic.jpg
date: 2018-03-20T12:00:00.000Z
description: >-
  I’m not suggesting demos are bad, just that you shouldn’t become mesmerized by
  a slick demo. This is particularly important when it comes to Backup and DR to
  the cloud. 
tags:
  - cloud
---
Demos are a lot like movie trailers, they’re designed to highlight all the great things about a solution. We’ve all had the experience of getting pumped to see a new movie based on the trailer and then being let down when you realize those were all the good parts!

Demos don’t typically show the solution at scale, they don’t cover all the things that went into getting the solution to that demo point and they certainly don’t call out any gaps with the solution. A lot of times the demo isn’t even live, it’s an emulation or prerecorded.

It’s understandable why this is the case and I’m not suggesting demos are bad, just that you shouldn’t become mesmerized by a slick demo. This is particularly important when it comes to Backup and DR to the cloud. Here are some things to consider when evaluating these solutions.

**Differences between the various public clouds**

* Just because a solution works one way with AWS, doesn’t mean it works the same way with Azure.

**Failback**

* You might be surprised to find that a solution that provides failover to a public cloud may not have the ability to failback on premises.
* Does the solution allow you to quickly and easily resync in the other direction or do you have to start from scratch, replicating all of your data back from the cloud.

**Recovery Times at Scale**

* The demo may failover 5 VMs to the cloud in ten minutes but what happens when I want to failover 300 or 1,000 VMs?

**What type of cloud storage does the solution support?**

* The cloud providers offer a range of storage with varying performance, access methods and scalability characteristics. These all have different costs. Based on your requirements and the solution’s capabilities, you may end up with storage that is either more expensive or lacks the performance you need.

**Required infrastructure**

* I’m not necessarily talking about the hardware but the various components that make up the DR solution. How simple or complex is it, how much time will you have to spend maintaining the DR solution as your environments grows and changes.

**eDiscovery**

* If you’re using your backups for eDiscovery, how will moving this to cloud impact the process? Will there be additional costs for searching and retrieving the needed data?

Using public cloud as a Backup or DR target is a very attractive option. The potential cost savings are significant, the effort and time required to perform a recovery can be greatly reduced. That being said, this is still an emerging capability and not all solutions are created equal. When working with clients we walk them through options including on Premises, Cloud and As A Service. We share the details of each approach, what we call warts and all! This is the only way to develop a solution that is exactly right for each client.
