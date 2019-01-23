---
templateKey: blog-post
title: BCDR with Zerto 6.0 and Microsoft Azure
author: Ian Evans
image: ''
date: 2018-03-08T16:31:50.158Z
description: >-
  One of the biggest problems for businesses today is an absence of or gaps in
  business continuity. Business continuity allows business to continue operating
  during and after a disaster. A business continuity plan (BCP) is comprised of
  policies and procedures to help fulfill that goal.
tags:
  - BCDR
  - Business Continuity
  - cloud
  - Disaster Recovery
  - Microsoft Azure
  - Replication
  - Zerto
---
## One of the biggest problems for businesses today is an absence of or gaps in business continuity

Business continuity allows business to continue operating during and after a disaster. A business continuity plan (BCP) is comprised of policies and procedures to help fulfill that goal. A business continuity plan should define a backup and disaster recovery (BDR) plan to protect them in the event of a disaster or other unforeseen data loss. A solid BDR plan is more important than ever in today’s data driven always on world. Customers expect services to be available 24/7 and will look elsewhere if they are not. Regulated industries increasingly require disaster recovyer and require frequent audits. Unfortunately many businesses today are missing or have large gaps in the plan.

## So if it’s so important why does the gap exist?

**It’s hard!**

Most businesses have implemented a backup strategy and that may include an off-site data copy. This is a great first step and may be sufficient for some applications or even whole organizations. Start there if nothing else. However, backups are not DR! Backups, especially legacy backup methods, take considerable time to restore. If there is hardware failure or actual disaster there may not even be a place to restore to. That’s why businesses today need disaster recovery (DR) as well as backups. A good DR plan requires interaction between the business, process or application owners and IT organization to succeed. Applications and services need to be tiered then further prioritized. The interdependence applications have on one another is often surprising, creating a snowball effect. It can become a very complex, ongoing task that requires regular validation, testing and maintenance.

**It’s expensive!**

Traditionally DR has been achieved by setting up a second site and maintaining that site is expensive. That site may be company owned and require some retrofit or a collocation facility with contracts and fees. Both require connectivity with sufficient bandwidth for the replicated data change rate. There are large up-front costs for (mostly idle) network, compute and storage resources running and ready if/when needed. Both need to be maintained and upgraded as business grows and technology evolves. So it’s not only expensive to setup it’s yet another yearly budget item.

## Is there a way to make this cheap and easy?

**The cloud can be more cost effective**

By utilizing the cloud for DR it’s possible to reduce complexity as well as cost. Everyone has seen the “The Cloud! Just someone else’s computer” meme and countless variations. Some of them are quite funny but they’re all wrong! The cloud is someone else’s everything required to run that compute instance, and storage and network and … By utilizing someone else’s “everything” the upfront cost is greatly reduced. Much of the operations are now someone else’s problem to boot. Detractors will always say cloud is not cheaper and I agree, to a point, if you’re talking about lift and shift. But we’re not, we’re talking about disaster recovery. In most circumstances that instance isn’t even running, if it’s not running it’s not billing. Only in the event that business services need to be switched over does the compute meter start running. It is true there will still be storage required for the remote copy of the data but again, potentially reduced by consuming only what you need. Cloud providers seem to be in a race to the bottom when it comes to storage pricing which is passed on. You can’t adjust the price of a storage array purchased 6 months ago.

**The cloud can be easier too**

Some things are just hard, like determining what needs to be included and in what order. However, as with any task, one of the hardest things is just getting started. Once you start, it can make a daunting task easier. (I think I just channeled my mother there…) By utilizing cloud for DR, the process can start sooner since the full requirements aren’t required to properly size a secondary environment. That’s huge! While it is still a good idea to understand potential costs, the pressure to get it right or fail is not as nearly as high. As applications are added, costs can be calculated individually as well making charge back easier.

**Zerto makes both possible!**

Zerto provides software that make both possible providing storage agnostic replication for workloads down to a single virtual machine. Virtual machines can also be grouped together by application into Virtual Protection Groups (VPG)s which are very versatile. Replication is possible across hypervisors without conversion. With the latest version it is also  possible to protect cloud workloads, fail-back from cloud providers, within or even between them. In the past this was a somewhat difficult proposition.

We are putting together a series of blogs to demonstrate the capabilities and how easy it is to get started. We’ll also cover what happens during testing, fail-over, fail-back, clones and migrations. Below is the first in the series and covers installation in Azure and initial testing.
