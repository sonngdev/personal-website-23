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

const soundManager = new SoundManager();

export { soundManager as SoundManager };
