class SoundManager {
  private context: AudioContext | null = null;
  private loadedSounds: Map<string, AudioBuffer> = new Map();

  async loadSound(src: string): Promise<AudioBuffer> {
    if (this.loadedSounds.has(src)) {
      return this.loadedSounds.get(src) as AudioBuffer;
    }

    return new Promise((resolve, reject) => {
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
