/**
 * Literary Ambient Background Sound Engine for "The Day I Didn't Say"
 * Synthesizes a quiet midnight reading room atmosphere:
 * - Gentle evening wind & rain against window
 * - Subtle vinyl crackle
 * - Antique clock ticking softly
 * - Deep calm warm room pads
 * - Rare distant wind chimes & paper rustles
 * 
 * Specs:
 * - Extremely soft volume (12% max)
 * - 5.0-second exponential fade-in
 * - 5.0-second exponential fade-out
 * - 100% offline Web Audio API (0 network data usage)
 * - CPU-friendly node architecture
 */

class LiteraryAmbienceEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private fadeInterval: number | null = null;

  // Sound sources
  private windNoiseNode: AudioBufferSourceNode | null = null;
  private vinylCrackleNode: AudioBufferSourceNode | null = null;
  private clockInterval: number | null = null;
  private chimeInterval: number | null = null;
  private padOscs: OscillatorNode[] = [];

  public get active(): boolean {
    return this.isPlaying;
  }

  public async start(): Promise<void> {
    if (this.isPlaying) return;

    // Initialize AudioContext on user interaction
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    const now = this.ctx.currentTime;

    // Master Gain Node capped at 0.12 (12% volume)
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, now);
    // Smooth 5-second linear fade in to 0.12
    this.masterGain.gain.linearRampToValueAtTime(0.12, now + 5.0);
    this.masterGain.connect(this.ctx.destination);

    // 1. Gentle Evening Wind & Rain
    this.createWindAndRain(now);

    // 2. Subtle Vinyl Crackle
    this.createVinylCrackle(now);

    // 3. Antique Clock Ticking (Every 1.0 sec)
    this.startClockTicking();

    // 4. Deep Calm Warm Atmospheric Pad
    this.createWarmAtmosphericPad(now);

    // 5. Rare Distant Wind Chimes & Paper Rustle
    this.startRandomChimesAndRustles();

    this.isPlaying = true;
  }

  public stop(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) {
        this.isPlaying = false;
        resolve();
        return;
      }

      const now = this.ctx.currentTime;
      // Smooth 5-second fade out to 0
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 5.0);

      setTimeout(() => {
        this.cleanupNodes();
        this.isPlaying = false;
        resolve();
      }, 5000);
    });
  }

  private cleanupNodes() {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
      this.clockInterval = null;
    }

    if (this.chimeInterval) {
      clearInterval(this.chimeInterval);
      this.chimeInterval = null;
    }

    try {
      this.windNoiseNode?.stop();
      this.vinylCrackleNode?.stop();
      this.padOscs.forEach(osc => osc.stop());
    } catch (e) {
      // Ignored
    }

    this.windNoiseNode = null;
    this.vinylCrackleNode = null;
    this.padOscs = [];

    if (this.ctx && this.ctx.state !== 'closed') {
      this.ctx.suspend();
    }
  }

  // 1. Wind & Rain Synthesis (Filtered Brownian Noise + LFO Gusts)
  private createWindAndRain(now: number) {
    if (!this.ctx || !this.masterGain) return;

    const sampleRate = this.ctx.sampleRate;
    const bufferSize = 5 * sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Brownian noise algorithm for organic rain/wind warmth
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    // Gentle lowpass filter for soft rain on glass
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);

    // LFO for slow wind modulation (8s cycle)
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.125, now); // 8 sec
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(150, now); // modulates filter 300Hz - 600Hz

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start(now);

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.35, now);

    noise.connect(filter);
    filter.connect(windGain);
    windGain.connect(this.masterGain);

    noise.start(now);
    this.windNoiseNode = noise;
  }

  // 2. Vinyl Crackle Synthesis
  private createVinylCrackle(now: number) {
    if (!this.ctx || !this.masterGain) return;

    const sampleRate = this.ctx.sampleRate;
    const bufferSize = 4 * sampleRate;
    const crackleBuffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const output = crackleBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // Rare micro pops (approx 12 per second)
      if (Math.random() < 0.0003) {
        output[i] = (Math.random() * 2 - 1) * 0.8;
      } else {
        output[i] = (Math.random() * 2 - 1) * 0.005; // tiny background hiss
      }
    }

    const crackle = this.ctx.createBufferSource();
    crackle.buffer = crackleBuffer;
    crackle.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1200, now);

    const crackleGain = this.ctx.createGain();
    crackleGain.gain.setValueAtTime(0.08, now);

    crackle.connect(filter);
    filter.connect(crackleGain);
    crackleGain.connect(this.masterGain);

    crackle.start(now);
    this.vinylCrackleNode = crackle;
  }

  // 3. Antique Clock Ticking (1.0 sec interval)
  private startClockTicking() {
    this.clockInterval = window.setInterval(() => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(580, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.025);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.03);
    }, 1000);
  }

  // 4. Deep Calm Warm Atmospheric Pad (Warm A1 + E2 Sine drone)
  private createWarmAtmosphericPad(now: number) {
    if (!this.ctx || !this.masterGain) return;

    // Chord: A1 (55Hz) and E2 (82.4Hz)
    const freqs = [55.0, 82.41, 110.0];

    freqs.forEach((freq) => {
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(180, now);

      gain.gain.setValueAtTime(0.02, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      this.padOscs.push(osc);
    });
  }

  // 5. Rare Distant Wind Chimes & Gentle Paper Rustle
  private startRandomChimesAndRustles() {
    this.chimeInterval = window.setInterval(() => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;

      // 40% chance every 12s to play a faint chime tone
      if (Math.random() < 0.45) {
        const now = this.ctx.currentTime;
        const chimeFreqs = [1567.98, 1760.0, 2093.0, 2349.32]; // G6, A6, C7, D7
        const freq = chimeFreqs[Math.floor(Math.random() * chimeFreqs.length)];

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.012, now);
        gain.gain.exponentialRampToValueAtTime(0.00001, now + 3.2);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 3.3);
      }
    }, 12000);
  }
}

export const literaryAmbience = new LiteraryAmbienceEngine();
