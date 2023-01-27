---
title: 'How to play sprite sound effects on the web, the right way'
excerpt: 'Adding sound effects can make your website more delightful to interact with. Recently I learned iOS could handle sound in an unexpected way and I had to change how I implemented this feature.'
date: '2023-01-27'
---

## How I did it before

I am familiar with implementing sound effects in web applications. In my previous job at Got It, my team maintained an Expert Workspace where experts can chat back and forth with students to guide them to the final solutions. It was important for experts to respond to students in a timely manner, so whenever students send a new message, a sound effect was played to notify experts.

To play sound in JavaScript, one straightforward way is to use [the `Audio` interface](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio). This is how our team implemented this feature. Using it was as simple as creating an `Audio` object (which is an `HTMLAudioElement`) and then calling `play()` on it.

```ts
const sound = new Audio(src);
sound.play();
```

In practice, you would want to handle edge cases such as when a sound is played when the previous one has not finished playing, resulting in two overlapping sounds that are played together. One way to go about this is to create a manager that knows about (and caches) all the sounds that exist in our application. Whenever a sound is played, all other sounds will be muted.

```ts
class SoundManager {
  private registeredSounds: Record<string, HTMLAudioElement> = {};

  createSound(src: string): HTMLAudioElement {
    if (!this.registeredSounds[src]) {
      this.registeredSounds[src] = new Audio(src);
    }
    return this.registeredSounds[src];
  }

  play(sound: HTMLAudioElement) {
    this.muteAll();
    sound.play();
  }

  mute(sound: HTMLAudioElement) {
    sound.pause();
    sound.currentTime = 0;
  }

  private muteAll() {
    Object.values(this.registeredSounds).forEach(this.mute);
  }
}
```

Then you can use `SoundManager` like so.

```ts
const sound = SoundManager.createSound('/url/to/sound.mp3');
SoundManager.play(sound);
```

This approach worked well enough in our case because the Expert Workspace is only meant to be used on the desktop.

## The later discovered problems

When I rebuilt my personal site, I wanted to implement sound effects on it. When the page goes into light or dark mode, a "click" sound will be played, representing a light switch being toggled on and off. I think this is delightful, and you can try it right from the header of [my website](https://www.sonng.dev) (which is probably where you are reading this blog post).

Unfortunately, only when running the above code on mobile did I discover its problems. There were two:

1. iOS music player picked up the sound and displayed it as a playable track, in the Control Center and from the Lock Screen as well.
2. As a result, any music currently playing would stop. Additionally, iOS would wait for it to completely stop before switching the theme, which was a little absurd and funny.

![Sound effect is picked up by music player in iOS](/post-assets/230127-sound-picked-up-by-ios-music-player.jpg)

## Web Audio API to the rescue

After some research, I found out about [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API). It promised to solve the two problems I had (and so it did!).

The Web Audio API is not as easy to use as the `Audio` interface above, though. To load a sound, you need to rely on the traditional `XMLHttpRequest` interface (at least that is what all the tutorials say. If you know how to use it with the modern `fetch` API, let me know). Then, you need to manually decode the audio data. As you can see, this API is asynchronous rather than synchronous like `Audio`.

```ts
const context = new AudioContext();
let sound: AudioBuffer;

const request = new XMLHttpRequest();
request.open('GET', src, true);
request.responseType = 'arraybuffer';

request.addEventListener('load', () => {
  context.decodeAudioData(
    request.response,
    (buffer) => {
      sound = buffer; // At this point we get the audio buffer ready to be played
    },
    (error) => {
      // Handle error
    },
  );
});

request.send();
```

Playing the sound is also a little more complex.

```ts
const source = context.createBufferSource();
source.buffer = sound;
source.connect(context.destination);
source.start();
```

Let's make a wrapper to simplify the API, and turn the complexity of callbacks to the pleasant async-await interface.

```ts
class SoundManager {
  private context: AudioContext | null = null;
  private loadedSounds: Record<string, AudioBuffer> = {};

  loadSound(src: string): Promise<AudioBuffer> {
    return new Promise((resolve, reject) => {
      if (this.loadedSounds[src]) {
        resolve(this.loadedSounds[src]);
        return;
      }

      const request = new XMLHttpRequest();
      request.open('GET', src, true);
      request.responseType = 'arraybuffer';

      request.addEventListener('load', () => {
        if (!this.context) {
          this.context = new AudioContext();
        }
        this.context.decodeAudioData(
          request.response,
          (buffer) => {
            this.loadedSounds[src] = buffer;
            resolve(buffer);
          },
          (error) => {
            reject(error);
          },
        );
      });
      request.send();
    });
  }

  play(buffer: AudioBuffer) {
    if (!this.context) {
      this.context = new AudioContext();
    }

    const source = this.context.createBufferSource();
    source.buffer = buffer;
    source.connect(this.context.destination);
    source.start();
  }
}
```

Now it's as easy to play sound as previously, and we have completely avoided the problems mentioned above.

1. The sound effect is no longer picked up by the iOS music player. 🎉
2. It can be played in parallel with the music currently playing. 🎉

```ts
const sound = await SoundManager.loadSound('/url/to/sound.mp3');
SoundManager.play(sound)
```

## Epilogue

You might have noticed that I don't handle overlapping sounds like the initial approach. It is because in my use case, sound sprites are short enough that they rarely overlap, so I don't need to worry about this problem for now.

You might also have noticed that, I lazily initialize `context` whenever I need to use it. This is only because my blog is built on NextJS, and `AudioContext` is only available in the browser's JavaScript runtime. To avoid running into errors in the server runtime, I don't initialize `AudioContext` from the start, instead only do that inside `loadSound()` or `play()`, which I guarantee are only called on the client side.

As always, I hope you learned something new from this post. Leave me an email if you have any questions, and happy coding. 👨‍💻
