---
templateKey: blog-post
title: SolidFire & VMware VVols
author: Terry Murray
image: /img/sf-vp-imp.png
date: 2017-10-10T16:05:44.189Z
description: >-
  I recently attended the Netapp Insight conference in Las Vegas. There were a
  lot of great speakers and sessions but for my money, the best one was Best
  Practices and Deep Dive for VMware with SolidFire.  The presenter for this
  session was Andy Banta, his title was Storage Janitor.  
tags:
  - Container
  - Endpoint
  - esx
  - esxi
  - Netapp
  - Protocol
  - Provider
  - Scale Out
  - SolidFire
  - SPBM
  - Storage
  - VASA
  - VMware
  - vsphere
  - VVol
  - VVols
---
I recently attended the Netapp Insight conference in Las Vegas. There were a lot of great speakers and sessions but for my money, the best one was Best Practices and Deep Dive for VMware with SolidFire.  The presenter for this session was Andy Banta, his title was Storage Janitor.  Here’s a pic of Andy.

![Andy Banta](/img/andy-banta-300x226.jpg)

When your presenter looks like this and chooses that title, you know you’re about to get some knowledge dropped on you! This man did not come all the way to Vegas to read you the datasheet.

If you’re not familiar with SolidFire here is a quick overview:

## **SolidFire Overview**

* SolidFire is an all flash, Scale Out block storage solution. You can build a solution with as few as 4 nodes and scale up to 100. Netapp says there is no technical limitation that keeps them from scaling beyond 100 nodes.
* SolidFire is certainly not the only Scale Out storage solution but most of the others were built either for NAS or modest workloads. Assuming 5x data reduction from compression and deduplication you can scale to 7.4PB and up to 10 Million IOPS in a single cluster.
* Quality of Service. Perhaps what SolidFire is best known for is their quality of service capabilities. Yes, just about every modern array has a check box that says they do QoS but not like SolidFire. SolidFire allows you to assign Guaranteed Minimum IOPS, Maximum IOPS and Burst IOPS. You can safely run your VDI environment and your Oracle ERP on the same cluster kind of guarantee.
* Most of what you hear about SolidFire is how it is being used by Service Providers. Obviously QoS is a big reason for solution providers adopting it but also the fact that it was built from the ground up to be managed via APIs. The GUI uses the API and everything you can do from the GUI, you can do from the API. More importantly, people are actually using the API, so there are tons of already built integration options. Take a gander if you are interested. <https://github.com/solidfire>  This matters a lot to Service Providers because they need to enforce standards and automate everything.

It’s a very cool solution but I knew that walking in. What I wanted to know more about was, how it would fit in most of the enterprise environments we work with. Certainly, we have clients looking to take a Service Provider stance and leverage automation tools but the vast majority are running good old VMware.

## **So, what did we learn about SolidFire and VMware?**

A lot actually but the most impressive capability was their implementation and support of VVols. In a nutshell, VVols provide much tighter integration between ESX and external storage arrays. The arrays become VM aware, meaning you can apply array based tools like Snapshots, Cloning and Replication at the VM level rather than LUNs.  This is a huge and immediate win.

VVols are an excellent concept and have the potential to greatly simplify the storage aspects of a virtual environment. The problem has been that most vendors haven’t done a good job of enabling these capabilities. Either the implementation is limited or it adds a great deal of complexity. VVols are supposed to make things simpler not more complicated. It’s in the simplicity where SolidFire shines.

# **VVol Components and SolidFire Implementation**

## **VASA Provider**

If a storage vendor wants to support VVols, they need to develop a VASA provider. The VASA provider is the control mechanism for VVols.

* ESX and vCenter Server connect to and communicate with the VASA Provider
* Provides Storage awareness services
* Supports VASA APIs exported by ESX
* Responsible for creating Virtual Volumes

To be clear, the VASA provider is not a management interface, it is a critical piece of the VVol implementation and although storage will continue to function without the VASA provider, you cannot change the environment or leverage array based capabilities.

The SolidFire implementation is integrated,   a VASA provider is installed on each node in the cluster.  This is a simple, elegant approach that provides maximum availability. From a SolidFire customer perspective, this means you don’t have to worry about the VASA Provider, it is built in, not an external system you need to manage.

## **Protocol Endpoints**

Protocol Endpoints are how ESX accesses Virtual Volumes. ESX uses Protocol Endpoints (PE) to establish a data path on demand from virtual machines to their respective virtual volumes. The VMware documentation refers to a PE as a logical IO proxy. It is up to the storage vendor to determine how to implement Protocol Endpoints, how many endpoints to create and how they are distributed. SolidFire creates one PE per node. This has been validated to provide optimal performance.  Again, you’re not being asked to manage anything new, it is built in.

## **Storage Containers**

Much of the information available describes Storage Containers as VVol Datastores. They are comparable in that both can be used to logically group VMs but there are some significant differences. VMFS Datastores are physical constructs, they are file systems.  They are limited in terms of size and due to the overhead associated with metadata locking, they are limited in terms of how many VMs can share a Datastore. Point being, most environments will have many Datastores, not because it makes it easier to manage but because it is necessary to support the volume of data and IO required.  You have to manage the datastores, you have to size and expand them, you may have to balance the VMs across them. This is not true with Storage Containers, at least not the way they are implemented on SolidFire. With SolidFire, Storage Containers are a logical construct. You can divide your storage into multiple containers if you want to isolate storage for administrative purposes but otherwise you only need one container. All the storage exists in this container. If you add capacity, the container expands automatically, nothing for you to do.

## **QoS – Storage Based Policy Management**

As we already mentioned, one of the biggest benefits of SolidFire is their QoS capabilities. With VVols we can apply QoS to the individual VMs or Virtual disk rather than LUNs. What’s more, QoS can be applied from ESX through Storage Based Policy Management. Policies defined and set within SBPM are automatically passed through the VASA provider and applied to the underlying virtual disk. Using this framework, managing the QoS settings across a range of VMs and virtual disk is not only practical, it’s simple.

## **Summary**

So, in terms of implementing VVols with SolidFire, you don’t have to worry about the VASA provider, you don’t have to do anything with the Protocol Endpoints and you can choose to use one or more storage containers but there is really no management required. With the VVol framework in place you can apply SolidFire’s QoS capabilities from an application rather than a storage perspective and do it all from within the native VMware Management tools.

A couple of last notes. There are multiple ways to consume SolidFire. You can buy the storage itself, it is offered as a converged solution with Flexpod SF and it is the foundation of Netapp’s HCI solution. All the capabilities mentioned here, work the same iin all three flavors.  They also offer some flexible licensing options that you can read more about on the SolidFire page.

<http://www.netapp.com/us/products/storage-systems/all-flash-array/solidfire-web-scale.aspx>

Thanks to Andy for a great session! If you want to follow him, here is his Twitter handle. @AndyBanta
