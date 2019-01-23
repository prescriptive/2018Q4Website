---
templateKey: blog-post
title: Modern Disaster Recovery
author: admin
image: /img/dr.jpg
date: 2017-07-17T13:54:02.086Z
description: >-
  Over the last couple of years there have been huge advances in Disaster
  Recovery solutions. DR capabilities that are simpler and more cost effective
  are being built into platforms, included with Backup technologies or in many
  cases, come bundled with the applications themselves.
tags:
  - disaster recovery
---
Over the last couple of years there have been huge advances in Disaster Recovery solutions. DR capabilities that are simpler and more cost effective are being built into platforms, included with Backup technologies or in many cases, come bundled with the applications themselves.

These innovations, combined with the ability to leverage Cloud as a DR target, means that organizations that previously thought a true DR solution was out of reach, now have  options. Those that have an existing DR solution may be able to implement a better one, include more applications and data, recover faster with less data loss, all while lowering costs and reducing the amount of time spent maintaining the DR solution.

With so many affordable options available,  we find clients can focus too much on the technology and rush to implement, without doing the upfront work necessary to develop a Disaster Recovery strategy that doesn’t just check a box but actually meets the business objectives.

Here are some key considerations that apply regardless of the solutions implemented or whether the target is in the cloud or private. This is by no means a complete list but more some of the highlights.

Using DRaaS or a cloud DR target doesn’t change the need to have a well thought out plan, with established policies and procedures.

**Defining the Requirements**

* RPO and RTO requirements. The cornerstone of any DR initiative
* How will you determine what will be included and what will not?
* How will you ensure the DR environment stays current with what you want to protect at the primary site?
* When will you declare a disaster? How will you decide when to failback?
* Do you want to support partial failovers? Some applications are failed over, while others continue to run in production. You are more likely to have an issue that impacts a portion of the environment than you are a catastrophic event, that takes the whole site down.

Think about how long you may end up running out of DR. A day, a week, a month.

* How does that change the scope?
* Do you still want to do backups while you are in DR mode?
* Will you need to stand up more apps \ services?

Having firmly established the requirements, you can start evaluating the options and thinking through the technical aspects.

**Technical Considerations**

How do you want to handle Replication and Failover?

* Platform Based – One solution for all or most. Do your application tiers require different levels of recoverability and cost. Examples include Nutanix, Rubrik and Zerto.
* Application Based – You will end up with more solutions but they may be more tightly integrated with the application. Examples, Exchange, Oracle, MS SQL.

How will you orchestrate everything if you end up using multiple approaches? You have one solution for your virtual environment, another for  physical servers and a third for NAS.

Networking – This is where much of the complexity is introduced. Users still need access to the services and Data.  If you plan to support partial failover, how does this change the network?

What about failback? Failover is great, how will you return? This may not be as simple as it seems.

How will you test DR and with what frequency? Will you do partial or full tests? How does testing impact production? Again, how will networking be handled during testing?

New Disaster Recovery solutions and options have dramatically lowered the price and reduced the amount of effort required to implement and maintain the DR environment. It’s greatly simplified but not necessarily simple. Most organizations still operate with a mix of modern and legacy infrastructure which means more than one DR solution may be required. Prescriptive helps organizations work through these options and develop the most appropriate strategy including the people, processes policies and products.
