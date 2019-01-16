---
templateKey: blog-post
title: The Internet Doesn’t Care About Your DR!
author: Terry Murray
image: ''
date: 2018-03-28T12:00:00.000Z
description: I love it when things just work!
tags:
  - disaster-recovery
---
Today I was looking forward to sitting down and working more on Zerto DR into Azure. I had my schedule (and more importantly my mind) clear and ready to go. I woke up checked email, shuttled the kiddos off to school and grabbed a bite. Everything was ready!

Wrong!

Nothing was ready, EVERYTHING was red! <sigh> It looks like the internet is down. Depending on what’s running there is always a little bit of clean up and I wasn’t looking forward to that at all.

Fortunately Zerto was covered. After a while everything was back to normal and replicating without any intervention from me. It was down long enough that Zerto ran a “Bitmap sync” to ensure everything was consistent. When complete any differences from the protected site are sent over and it’s whole again.

![](/img/capture.png)

So one less thing to worry about, I love it when things just work!
