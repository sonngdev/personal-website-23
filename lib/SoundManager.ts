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

const soundManager = new SoundManager();

export { soundManager as SoundManager };
