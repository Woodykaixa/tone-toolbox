"use client";
import { useMemo } from "react";

const ToneA4 = 440;
const ToneName = "CDEFGAB".split("");
const half = Math.pow(2, 1 / 12);
const full = half * half;

export function isValidTone(tone: unknown): boolean {
	if (typeof tone !== "string") {
		return false;
	}

	if (tone.length != 2) {
		return false;
	}

	if (!ToneName.includes(tone[0])) {
		return false;
	}

	const toneNum = parseInt(tone[1], 10);
	if (Number.isNaN(toneNum)) {
		return false;
	}
	if (toneNum < 0 || toneNum > 8) {
		return false;
	}

	if (toneNum === 8 && tone[0] !== "C") {
		return false;
	}

	if (toneNum === 0 && !["A", "B"].includes(tone[0])) {
		return false;
	}

	return true;
}

export function compareTone(tone1: string, tone2: string) {
	if (!isValidTone(tone1) || !isValidTone(tone2)) {
		throw new TypeError("Invalid Tone");
	}

	if (tone1[1] === tone2[1]) {
		return ToneName.indexOf(tone1[0]) - ToneName.indexOf(tone2[0]);
	}

	return parseInt(tone1[1], 10) - parseInt(tone2[1], 10);
}

export const tones = ["A0", "B0"];
[1, 2, 3, 4, 5, 6, 7].forEach((n) => {
	ToneName.forEach((t) => {
		tones.push(`${t}${n}`);
	});
});
tones.push("C8");

export const toneFreq = new Map<string, number>([["A4", ToneA4]]);
let currentFreq = ToneA4;
for (let i = tones.indexOf("A4") + 1; i < tones.length; i++) {
	if (["C", "F"].includes(tones[i][0])) {
		currentFreq *= half;
	} else {
		currentFreq *= full;
	}
	toneFreq.set(tones[i], currentFreq);
}
currentFreq = ToneA4;
for (let i = tones.indexOf("A4") - 1; i >= 0; i--) {
	if (["B", "E"].includes(tones[i][0])) {
		currentFreq /= half;
	} else {
		currentFreq /= full;
	}
	toneFreq.set(tones[i], currentFreq);
}
export function useTones(bpm: number, tones: number[]) {
	const noteDuration = 60 / bpm;

	const play = () => {
		const audioCtx = new AudioContext();
		const toneNodes = tones.map((tone) => {
			const osc = new OscillatorNode(audioCtx, {
				frequency: tone,
			});
			osc.connect(audioCtx.destination);
			return osc;
		});
		toneNodes.forEach((node, i) => {
			node.start(i * noteDuration);
			node.stop((1 + i) * noteDuration);
		});
	};

	return play;
}
