"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type SynthNode = {
  context: AudioContext;
  masterGain: GainNode;
  filter: BiquadFilterNode;
  oscillators: OscillatorNode[];
  lfo: OscillatorNode;
  lfoGain: GainNode;
};

function createAmbientSynth() {
  const AudioContextClass =
    window.AudioContext ||
    ((window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext as typeof AudioContext | undefined);

  if (!AudioContextClass) {
    throw new Error("This browser does not support Web Audio.");
  }

  const context = new AudioContextClass();
  const masterGain = context.createGain();
  const filter = context.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1400;
  filter.Q.value = 0.6;

  masterGain.gain.value = 0.0001;
  filter.connect(masterGain);
  masterGain.connect(context.destination);

  const notes = [220, 277.18, 329.63, 440];
  const oscillators = notes.map((frequency, index) => {
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = index % 2 === 0 ? "triangle" : "sawtooth";
    oscillator.frequency.value = frequency;
    oscillator.detune.value = index % 2 === 0 ? -6 + index * 2 : 5 - index * 2;
    gainNode.gain.value = index === 3 ? 0.012 : 0.028;
    oscillator.connect(gainNode);
    gainNode.connect(filter);
    oscillator.start();

    return oscillator;
  });

  const lfo = context.createOscillator();
  const lfoGain = context.createGain();
  lfo.type = "sine";
  lfo.frequency.value = 0.18;
  lfoGain.gain.value = 180;
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  lfo.start();

  masterGain.gain.linearRampToValueAtTime(0.16, context.currentTime + 1.1);

  return { context, masterGain, filter, oscillators, lfo, lfoGain };
}

export function MusicToggle() {
  const synthRef = useRef<SynthNode | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    return () => {
      if (!synthRef.current) {
        return;
      }

      synthRef.current.masterGain.gain.linearRampToValueAtTime(
        0.0001,
        synthRef.current.context.currentTime + 0.4
      );
      synthRef.current.oscillators.forEach((oscillator) => oscillator.stop());
      synthRef.current.lfo.stop();
      void synthRef.current.context.close();
      synthRef.current = null;
    };
  }, []);

  async function handleToggle() {
    if (enabled && synthRef.current) {
      synthRef.current.masterGain.gain.linearRampToValueAtTime(
        0.0001,
        synthRef.current.context.currentTime + 0.3
      );
      synthRef.current.oscillators.forEach((oscillator) =>
        oscillator.stop(synthRef.current!.context.currentTime + 0.4)
      );
      synthRef.current.lfo.stop(synthRef.current.context.currentTime + 0.4);
      window.setTimeout(() => {
        void synthRef.current?.context.close();
        synthRef.current = null;
      }, 420);
      setEnabled(false);
      return;
    }

    const synth = createAmbientSynth();
    await synth.context.resume();
    synthRef.current = synth;
    setEnabled(true);
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={cn(
        "fixed right-4 top-4 z-50 inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs uppercase tracking-[0.26em] backdrop-blur-xl transition md:right-8 md:top-8",
        enabled
          ? "border-gold/50 bg-gold/15 text-gold"
          : "border-white/10 bg-black/40 text-mist/75 hover:border-gold/35 hover:text-gold"
      )}
      aria-pressed={enabled}
    >
      {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      {enabled ? "Ambient Score On" : "Ambient Score Off"}
    </button>
  );
}
