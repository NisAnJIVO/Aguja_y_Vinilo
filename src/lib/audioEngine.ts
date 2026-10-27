/**
 * Procedural Analog Audio Engine using Web Audio API
 * Generates authentic vinyl surface crackle, needle drop mechanics, and warm harmonic analog chords.
 * Zero external MP3 dependency, ultra-lightweight, 100% reproducible and offline-ready.
 */

class AnalogAudioEngine {
  private ctx: AudioContext | null = null;
  private crackleNode: AudioNode | null = null;
  private crackleGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private chordOscillators: OscillatorNode[] = [];
  private chordGain: GainNode | null = null;
  private isCracklePlaying = false;
  private isMusicPlaying = false;

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Realistic needle drop mechanical contact sound
  public playNeedleDrop() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;

    // 1. Mechanical 'thud' of stylus landing in the run-in groove
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(90, t);
    osc.frequency.exponentialRampToValueAtTime(35, t + 0.12);

    oscGain.gain.setValueAtTime(0.25, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.16);

    // 2. High frequency surface friction click
    const bufferSize = this.ctx.sampleRate * 0.08;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.015));
    }

    const clickSource = this.ctx.createBufferSource();
    clickSource.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(2800, t);
    filter.Q.setValueAtTime(3.0, t);

    const clickGain = this.ctx.createGain();
    clickGain.gain.setValueAtTime(0.18, t);
    clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    clickSource.connect(filter);
    filter.connect(clickGain);
    clickGain.connect(this.masterGain);

    clickSource.start(t + 0.01);
  }

  // Gentle, atmospheric vinyl dust & groove noise
  public startVinylCrackle(volume = 0.12) {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isCracklePlaying) return;

    const sampleRate = this.ctx.sampleRate;
    const bufferSize = sampleRate * 3; // 3 seconds loop
    const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const output = buffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      // Brown / Pink noise base
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 0.15;

      // Random micro-pops and dust clicks (analog stylus friction)
      if (Math.random() < 0.0006) {
        output[i] += (Math.random() * 2 - 1) * 0.5;
      }
    }

    const crackleSource = this.ctx.createBufferSource();
    crackleSource.buffer = buffer;
    crackleSource.loop = true;

    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.setValueAtTime(1400, this.ctx.currentTime);
    bandpass.Q.setValueAtTime(0.8, this.ctx.currentTime);

    this.crackleGain = this.ctx.createGain();
    this.crackleGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.crackleGain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + 1.2);

    crackleSource.connect(bandpass);
    bandpass.connect(this.crackleGain);
    this.crackleGain.connect(this.masterGain);

    crackleSource.start();
    this.crackleNode = crackleSource;
    this.isCracklePlaying = true;
  }

  public stopVinylCrackle() {
    if (this.crackleGain && this.ctx) {
      this.crackleGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
      setTimeout(() => {
        try {
          if (this.crackleNode) {
            (this.crackleNode as AudioScheduledSourceNode).stop();
            this.crackleNode = null;
          }
        } catch {
          // ignore already stopped
        }
        this.isCracklePlaying = false;
      }, 550);
    }
  }

  // Warm analog jazz / modal preview chords for whichever record is playing
  public playPreviewChordProgression(baseFreq = 220) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.stopPreviewMusic();

    const t = this.ctx.currentTime;
    this.chordGain = this.ctx.createGain();
    this.chordGain.gain.setValueAtTime(0.01, t);
    this.chordGain.gain.linearRampToValueAtTime(0.18, t + 1.5);

    // Warm lowpass filter (vintage tape/vinyl attenuation at 2.4kHz)
    const lp = this.ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(1800, t);
    lp.Q.setValueAtTime(1.2, t);

    // Minor 9th or Major 7th chord intervals
    const intervals = [1, 1.1892, 1.4983, 1.7818]; // Root, Min3rd, 5th, Min7th

    this.chordOscillators = intervals.map((ratio, index) => {
      const osc = this.ctx!.createOscillator();
      // Triangle wave has soft, warm harmonics ideal for vintage Rhodes/horns
      osc.type = index % 2 === 0 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(baseFreq * ratio, t);

      // Subtle vibrato (analog tape flutter / wow)
      const vibrato = this.ctx!.createOscillator();
      const vibratoGain = this.ctx!.createGain();
      vibrato.frequency.setValueAtTime(4.2 + index * 0.3, t);
      vibratoGain.gain.setValueAtTime(1.2, t);
      vibrato.connect(osc.frequency);
      vibrato.start(t);

      osc.connect(lp);
      osc.start(t);
      return osc;
    });

    lp.connect(this.chordGain);
    this.chordGain.connect(this.masterGain);
    this.isMusicPlaying = true;
  }

  public stopPreviewMusic() {
    if (this.chordGain && this.ctx) {
      this.chordGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);
      setTimeout(() => {
        this.chordOscillators.forEach((osc) => {
          try {
            osc.stop();
          } catch {
            // ignore
          }
        });
        this.chordOscillators = [];
        this.isMusicPlaying = false;
      }, 650);
    }
  }

  public setMasterVolume(val: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
    }
  }
}

export const audioEngine = new AnalogAudioEngine();
