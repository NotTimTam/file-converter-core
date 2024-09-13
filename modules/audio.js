import { Module } from "@nottimtam/file-converter";
import Ffmpeg from "fluent-ffmpeg";

// mp3, wav, aac, flac, ogg, aiff, opus

const AudioModules = [
	new Module({
		label: "AudioToMP3",
		description: "Convert audio files to .mp3.",
		from: [
			"audio/x-wav",
			"audio/x-aac",
			"audio/x-flac",
			"audio/ogg",
			"audio/x-aiff",
			"audio/mpeg",
		],
		to: "audio/mp3",
		method: async ({ path }) => Ffmpeg(path).toFormat("mp3").save(path),
	}),
	new Module({
		label: "AudioToWAV",
		description: "Convert audio files to .wav.",
		from: [
			"audio/mp3",
			"audio/x-aac",
			"audio/x-flac",
			"audio/ogg",
			"audio/x-aiff",
			"audio/mpeg",
		],
		to: "audio/x-wav",
		method: async ({ path }) => Ffmpeg(path).toFormat("wav").save(path),
	}),
	new Module({
		label: "AudioToAAC",
		description: "Convert audio files to .aac.",
		from: [
			"audio/x-wav",
			"audio/mp3",
			"audio/x-flac",
			"audio/ogg",
			"audio/x-aiff",
			"audio/mpeg",
		],
		to: "audio/x-aac",
		method: async ({ path }) => Ffmpeg(path).toFormat("aac").save(path),
	}),
	new Module({
		label: "AudioToFLAC",
		description: "Convert audio files to .flac.",
		from: [
			"audio/x-wav",
			"audio/x-aac",
			"audio/mp3",
			"audio/ogg",
			"audio/x-aiff",
			"audio/mpeg",
		],
		to: "audio/x-flac",
		method: async ({ path }) => Ffmpeg(path).toFormat("flac").save(path),
	}),
	new Module({
		label: "AudioToOGG",
		description: "Convert audio files to .ogg.",
		from: [
			"audio/x-wav",
			"audio/x-aac",
			"audio/x-flac",
			"audio/mp3",
			"audio/x-aiff",
			"audio/mpeg",
		],
		to: "audio/ogg",
		method: async ({ path }) => Ffmpeg(path).toFormat("ogg").save(path),
	}),
	new Module({
		label: "AudioToAIFF",
		description: "Convert audio files to .aiff.",
		from: [
			"audio/x-wav",
			"audio/x-aac",
			"audio/x-flac",
			"audio/ogg",
			"audio/mp3",
			"audio/mpeg",
		],
		to: "audio/x-aiff",
		method: async ({ path }) => Ffmpeg(path).toFormat("aiff").save(path),
	}),
];

export default AudioModules;
