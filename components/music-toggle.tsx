"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type SynthNode = {
  context: AudioContext;
  masterGain: GainNode;
  oscillators: OscillatorNode[];
};

function createAmbientSynth() {
  const context = new AudioContext();
  const masterGain = context.createGain();
  masterGain.gain.value = 0.0001;
  masterGain.connect(context.destination);

  const notes = [220, 277.18, 329.63];
  const oscillators = notes.map((frequency, index) => {
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = index === 1 ? "triangle" : "sine";
    oscillator.frequency.value = frequency;
    oscillator.detune.value = index * 3;
    gainNode.gain.value = 0.02;
    oscillator.connect(gainNode);
    gainNode.connect(masterGain);
    oscillator.start();

    return oscillator;
  });

  masterGain.gain.linearRampToValueAtTime(0.08, context.currentTime + 1.2);

  return { context, masterGain, oscillators };
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
