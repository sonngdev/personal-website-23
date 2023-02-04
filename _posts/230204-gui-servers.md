---
title: 'When non-GUI servers are not enough'
excerpt: 'I needed a web server with Graphical User Interface (GUI) for my project. Time to properly learn a cloud provider.'
date: '2023-02-04'
---

"Interesting,", I hear you say, "why would you need a web server with Graphical User Interface (GUI)?". My friends, let me tell you a story about how I built [ChatGPT With Voice](https://chatgpt.sonng.dev/).

In the first published version, ChatGPT With Voice came with only a frontend client. If you wanted it to work, you had to set up a local server (see [my server repo](https://github.com/thanhsonng/chatgpt-server)). This was because the server relied on GUI to work. In short, ChatGPT was very popular, and to reduce its server load, it used various types of Captcha to filter out abusive activities. To solve Captchas, you need a GUI. Even though this additional setup added friction for people who wanted to try out my app, at the time, I did not have a solution. Most backend hostings I was used to, such as Heroku or Vercel, did not support GUI-enabled servers.

![Local server setup instruction](/post-assets/230204-local-server-setup.png)

Then, my friend who worked at Microsoft told me that I could try creating a Virtual Machine (VM) with any cloud provider, preferably Microsoft Azure, and host my backend there. Of course! A VM is like a second machine of yours, on which you can do whatever you want just as on any other computer.

And so I tried Azure. After much Googling and tinkering with the VM, I finally managed to host my ChatGPT server on it. Nowadays when visiting [ChatGPT With Voice](https://chatgpt.sonng.dev/), you may notice that it just works with no additional setup. I made it so much easier to use, thanks to the power of a web server with GUI.

Below is a quick guide on how I set up my Azure VM, should you want to know. Wherever I follow another guide or a YouTube video, I will include the link instead of repeating all their content. I will also add notes that I think are important. If you find the jargon hard to understand, see the **Glossary** section at the end of the article.

## Step 1: Creating an Azure VM

I follow [this guide](https://learn.microsoft.com/en-us/azure/virtual-machines/linux/quick-create-portal?tabs=ubuntu) from Microsoft.

For Image, I choose `Ubuntu Server 20.04 LTS - x64 Gen2` instead – my VM has the `x64` architecture. If you are wondering why I don't use the `Ubuntu Desktop` Image, that's because it's not eligible for free usage, which I get when I first signed up for Azure. We can work around this by installing Ubuntu Desktop on top of Ubuntu Server later, using `tasksel`.

My VM size is `B2s`, which provides 2 vCPU and 4 GiB of RAM. This size is powerful enough while still being quite affordable. Also, today I learned that GiB and GB are not the same things.

## Step 2: Installing Ubuntu Desktop on the VM

This excellent YouTube video shows all the steps needed to have Ubuntu Desktop running on the newly created VM. Note that being able to SSH into it is a prerequisite. Read [the Microsoft guide](https://learn.microsoft.com/en-us/azure/virtual-machines/linux/quick-create-portal?tabs=ubuntu#connect-to-virtual-machine) again if you are not sure how to do that.

<iframe style="width:100%;aspect-ratio:16/9;" src="https://www.youtube.com/embed/ODhGNe0s4lI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Note that the `vncserver` process runs at the `5901` port. For security, by default, the VM doesn't allow incoming requests to this port. To whitelist it, follow [this guide](https://learn.microsoft.com/en-us/azure/virtual-machines/windows/nsg-quickstart-portal) and set the Source port ranges to `5901`. You can also skip the Network security group and just change the Network settings of the VM instead.

## Step 3: Setting up server stuff

At this point, I have a fully functioning computer that I can use for whatever purpose, including serving requests as a web server. However, I will cover this topic in a future article. For now, let's celebrate our brand-new machine on the cloud 🥳.

## Glossary

Here is some computer jargon explained in simple terms. I try to make them as easy to understand as I can, so there will be some trade-off for accuracy, but don't worry, they are still correct.

- Web server: It is any computer that accepts requests from the outside world, processes them, and returns some kind of response. It can be an actual machine, similar to your desktop/laptop, or a virtual one. It usually runs a slightly different version of common Operating Systems, without Graphical User Interface.

- Virtual machine: Your computer can separate a part of its hardware power (CPU, memory, storage, etc.) and treat it as another individual computer. That computer is called a virtual machine because it doesn't have dedicated hardware.
