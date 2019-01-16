---
templateKey: blog-post
title: Remediation of Legacy Backup Tapes
author: Terry Murray
image: /img/indexengines_logo_tag.jpg
date: 2018-03-11T14:52:36.698Z
description: >-
  Imagine if every time you swapped out an old server you had to keep the old
  server sitting around and powered up for the next 5 to 7 years. Ridiculous
  right, but that’s what many organizations do with their legacy backups.
tags:
  - archive
  - archiving
  - Backup
  - Backup Migration
  - Backup Tapes
  - Compliance
  - eDiscovery
  - Index Engines
  - Tape Migration
---
Imagine if every time you swapped out an old server you had to keep the old server sitting around and powered up for the next 5 to 7 years. Ridiculous right, but that’s what many organizations do with their legacy backups. Most organizations continue to use their backups for compliance and eDiscovery, so when they implement a modern backup solution they end up keeping the old one around for years.

Not only is this not cost effective, but in many cases it doesn’t even work. Why?

* No one updates their previous backup software. Most don’t even keep maintenance or support. These servers just sit there unpatched, or upgraded year after year, with the chance of a successful recovery becoming less likely by the day.
* The rest of your environment changes. Those NDMP backups of your Isilon can’t be restored now that you’ve migrated to a NetApp solution.  Now you’re searching the web for a virtual edition of your old NAS, hoping you can find a copy to restore to.
* You don’t even have an Exchange server to restore to, you moved to Office 365 years ago. How are you going to get those messages the legal department is demanding?
* When the request for a restore from this tape museum comes in, some poor unfortunate team member will spend the next several days or even weeks trying to coax the data out!

Don’t take my word for it, here is what Gartner has to say.

_Enterprises often engage in the long-term retention of backup, to the point where the is unrecoverable, or unretrievable in any meaningful way. Thus, it serves no business or operational purpose, but creates a potential hazard to GDPR compliance._

**Gartner: How to implement File Analysis for GDPR Challenges**

Published : 10 October 2017

At Prescriptive we do a lot of Backup and Recovery projects and when that project includes changing backup platforms or migrating to a non tape based solution, we encourage them to consider Index Engines.

Index Engines provides streamlined access to legacy data on backup tapes. With their solution, finding and extracting relevant content required by legal and compliance is a simple and cost-effective process.

The process eliminates the need for the original environment, including the backup software, and automatically scans tapes, generating a searchable index of the content. Finding user mailboxes or sensitive documents using keyword or metadata search is easy. Once the relevant files and email are found, they can then be extracted directly from tape and migrated to an online/cloud archive where retention policies can be applied.

In a nutshell, it reads through all the data, strips out all of the files not needed for compliance, indexes everything remaining and allows you to store it in your repository of choice. No more maintaining a “Tape Museum”, no more painful recoveries. Here is a sample of a typical Legacy Data Migration project. Be sure to notice the amount of data you started with versus what you really need to keep at the end.

![Sample Tape Remediation Project](/img/backup_tape_remediation-768x286.jpg)



It’s a really great solution and unfortunate that so many organizations never think about how their going to handle their legacy data until the new solution is implemented. Our recommendation is to plan and budget for it from the beginning.



Here is a link to their Legacy Data Remediation page where you can find more details.



<http://www.indexengines.com/backup-tape/backup-tapes/legacy-backup-tape-remediation>
