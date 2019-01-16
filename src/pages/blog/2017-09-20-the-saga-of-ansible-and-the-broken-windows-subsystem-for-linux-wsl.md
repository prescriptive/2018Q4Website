---
templateKey: blog-post
title: The saga of Ansible and the broken Windows Subsystem for Linux (WSL)
author: Ian Evans
image: ''
date: 2017-09-20T16:13:26.598Z
description: >-
  While working on another project I ran into an issue running the Cloud/VMware
  modules for Ansible. No mater what I did it appeared broken. Newer module
  features required a newer version of Ansible. But I was being denied, stuck at
  1.8 and no amount of apt foo seemed to resolve the issue.
tags:
  - Ansible
  - Automation
  - VMware
  - WSL
---
**The problem: ain’t nothin’ easy.**

While working on another project I ran into an issue running the Cloud/VMware modules for Ansible. No mater what I did it appeared broken. Newer module features required a newer version of Ansible. But I was being denied, stuck at 1.8 and no amount of apt foo seemed to resolve the issue. I didn’t want to spin up a VM for this. You see, I’ve been happily plugging along using WSL (based on Ubuntu) for quite a while. I even waited out the network issues (believe it or not at one time ping didn’t work!) Anyway…  At some point I had the idea to check the release file…14.04. Well poop! I needed a new version of WSL but it was not a straightforward as I hoped, probably because I was an early adopter. I was going to have to remove it and reinstall. Since I’m having issues I want to make sure I get it all. Doing that will clobber all my stuff! Double poop!

**Step 1: Upgrading WSL**

1. Backup your stuff, even if you don’t plan on using /full (see below), just in case. I used tar to shuffle it all off to a directory on /mnt/c. There is no going back, make sure you get it all, even that crud we old Solaris admins put in /opt.
2. Open a privileged command prompt or powershell window and whack it without confirmation. Speaking of Solaris… how many old UNIX geeks remember the original implementation of the [lxrun](https://en.wikipedia.org/wiki/Lxrun) command?

![ansible testing](/img/ansible_1.png)

3. Sit back and wait.
4. When finished add it back with:

![ansible testing](/img/ansible_2.png)

5. Wait again, maybe get a snack or coffee or something and come back.
6. Yay it’s done!

**Step 2: Installing a shiny new Ansible**

Checking the release again and we’re set with 16.04 LTS otherwise known as “Xenial”. Great, let’s get to it. So I check the version available.

![ansible testing](/img/ansible_3.png)

Le sigh… 2.4 is current dev. My first thought was, “Forget you Microsoft and Canonical! I’m going to run from source and be done with it!” My next thought was about how quickly Ansible is being developed and updated. Followed by Python and modules and their dependencies. I also remembered making Gnome work on Solaris 7 SPARC. Just what I need, something else to add to the never-ending list of things I already need to do. NO THANKS! Additionally if I wanted to mess with Tower later the source method isn’t supported, again possibly more to do. There has to be a better way. A little research and I find a forum where someone else is complaining about RHEL and the version followed by several pages about using pip. No, not that Pip. I’m talking about Python-pip. To pip or not to pip, that is the question. It’s the next to the last supported installation method in the Ansible documentation. So hellyeah, I’m going to give it a shot! If it doesn’t work out I can redeploy WSL since I have nothing invested yet.

**Step 3 (or 2b): Fixing it with pip.**

I seem to recall trying pip a few days before this and having some sort of failure. I didn’t capture the output but it didn’t work or you wouldn’t be reading this.

1. By default pip isn’t installed so we need to install it, along with the supporting packages… No need to worry about python3 stuff at the moment.

   Go ahead and eat that caked you looked at earlier. Yum!

![ansible testing](/img/ansible_4.png)

2. With pip installed we can get up to Ansible version 2.3.2.0, good enough!.  OH.. and look it gives us more to do! I’m running out of snacks.

![ansible testing](/img/ansible_5.png)

3. After a bit you should have 2.3.2.0 ready to go, let’s check. I wasn’t expecting /usr/local/bin but I guess I can deal.

![ansible testing](/img/ansible_6.png)

4. Since we have nothing better to do let’s get it all upgraded.

![ansible testing](/img/ansible_8.png)

5. For the Ansible VMware modules we’re going to need pyvmomi.

![ansible testing](/img/ansible_8.png)

6. Let’s see if it works by running an Ansible playbook! I got tired of typing different versions and decided every version would be named a.yml. Much easier to type than the string of curse words I strung together earlier 😀

![ansible testing ](/img/ansible_9.png)

   and evidently we need pysphere ..? Maybe something out of order or I forgot something. Anyway…

![ansible testing](/img/ansible_10.png)

7. Complete success!

![ansible testing](/img/ansible_11.png)

8. A quick check in PowerCLI…

![ansible testing](/img/ansible_12.png)

It was a bit of a journey to get to this point but worth the effort. It’s handy having a local install to work with when on the go without the need to run a VM. Here is the playbook I used to test, basically a cut and paste from the docs wrapped up just enough to run. I cut my original into tiny bits when this first started trying to figure out what I was doing wrong.

![ansible testing](/img/ansible_13.png)

Now onto the next…

![null](/img/lagavulin.png)
