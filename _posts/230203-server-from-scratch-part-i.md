---
title: 'Your own server from scratch, part I: Azure Virtual Machine & Ubuntu Desktop'
excerpt: 'Create a web server with Graphical User Interface for your backend with me. In this part, we will learn how to set up an Azure Virtual Machine then install Ubuntu Desktop on it, all for free.'
date: '2023-02-03'
---

"Wait,", I hear you say, "why would I need a web server with Graphical User Interface (GUI)?". My friends, let me tell you a story about how I built [ChatGPT With Voice](https://chatgpt.sonng.dev/).

In the first published version, ChatGPT With Voice came with only a frontend client. If you wanted it to work, you had to set up a local server (see [my server repo](https://github.com/thanhsonng/chatgpt-server)). This was because the server relied on GUI to work. In short, ChatGPT was very popular, and to reduce its server load, it used various types of Captcha to filter out abusive activities. To solve Captchas, you would definitely need a GUI. Even though this additional setup added friction for people who wanted to try out my app, at the time, I did not have a solution. Most backend hostings I was used to, such as Heroku or Vercel, did not support a GUI-enabled server.

![Local server setup instruction](/post-assets/230203-local-server-setup.png)

Then, my friend who worked at Microsoft told me that I could try creating a Virtual Machine (VM) with any cloud provider, preferrably Microsoft Azure, and host my backend there. Of course! A VM is like a second machine of yours, on which you can do whatever you want just as on any other computer.

And so I tried Azure. After much Googling and tinkering with the VM, I finally managed to host my ChatGPT server on it. Nowadays when visiting [ChatGPT With Voice](https://chatgpt.sonng.dev/), you may notice that it just works with no additional setup. I made it so much easier to use, thanks to the power of a web server with GUI.

Find out how I did it in this guide. Even if you need to touch ChatGPT API, having a machine on the cloud always ready is nice, isn't it? I know you would agree, alright, let's get to it!

## Spinning up Azure Virtual Machine

If you don't have an Azure account yet, sign up for free on [their website](https://azure.microsoft.com/en-gb/free/).

After accessing the Azure Portal page, select "Virtual machine" among the featured services, then "Create" to start creating a VM. We won't be using a preset configuration, so choose the customized option.

![Virtual machine service on Azure Portal](/post-assets/230203-azure-vm-service.png)



## Glossary

Here are some computer jargons explained in simple terms. I try to make them as easy to understand as I can, so there will be some trade-off for accuracy, but don't worry, they are still correct.

- Web server: It is any computer that accepts requests from the outside world, process them, and return some kind of response. It can be an actual machine, similar to your desktop/laptop, or a virtual one. It usually runs a slightly different version of common Operating Systems, without Graphical User Interface.

- Virtual machine: Your computer can separate a part of its hardware power (CPU, memory, storage, etc.) and treat it as another individual computer. That computer is called a virtual machine, because it doesn't have dedicated hardware.
