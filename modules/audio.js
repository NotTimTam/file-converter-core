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
			"audio/wav",
			"audio/ogg",
			"audio/x-aiff",
			"audio/mpeg",
		],
		to: "audio/mp3",
		method: async ({ path }) => {
			await new Promise((resolve, reject) => {
				Ffmpeg(path)
					.toFormat("mp3")
					.save(path + "-temp")
					.on("end", () => {
						// Replace the original file with the temporary file
						fs.rename(path + "-temp", path, (err) => {
							if (err) {
								return reject(err);
							}
							resolve();
						});
					})
					.on("error", (err) => {
						reject(err);
					});
			});
		},
	}),
	new Module({
		label: "AudioToWAV",
		description: "Convert audio files to .wav.",
		from: [
			"audio/mp3",
			"audio/x-aac",
			"audio/x-flac",
			"audio/wav",
			"audio/ogg",
			"audio/x-aiff",
			"audio/mpeg",
		],
		to: "audio/wav",
		method: async ({ path }) => {
			await new Promise((resolve, reject) => {
				Ffmpeg(path)
					.toFormat("wav")
					.save(path + "-temp")
					.on("end", () => {
						// Replace the original file with the temporary file
						fs.rename(path + "-temp", path, (err) => {
							if (err) {
								return reject(err);
							}
							resolve();
						});
					})
					.on("error", (err) => {
						reject(err);
					});
			});
		},
	}),
	new Module({
		label: "AudioToAAC",
		description: "Convert audio files to .aac.",
		from: [
			"audio/x-wav",
			"audio/wav",
			"audio/mp3",
			"audio/x-flac",
			"audio/ogg",
			"audio/x-aiff",
			"audio/mpeg",
		],
		to: "audio/x-aac",
		method: async ({ path }) => {
			await new Promise((resolve, reject) => {
				Ffmpeg(path)
					.toFormat("aac")
					.save(path + "-temp")
					.on("end", () => {
						// Replace the original file with the temporary file
						fs.rename(path + "-temp", path, (err) => {
							if (err) {
								return reject(err);
							}
							resolve();
						});
					})
					.on("error", (err) => {
						reject(err);
					});
			});
		},
	}),
	new Module({
		label: "AudioToFLAC",
		description: "Convert audio files to .flac.",
		from: [
			"audio/x-wav",
			"audio/wav",
			"audio/x-aac",
			"audio/mp3",
			"audio/ogg",
			"audio/x-aiff",
			"audio/mpeg",
		],
		to: "audio/x-flac",
		method: async ({ path }) => {
			await new Promise((resolve, reject) => {
				Ffmpeg(path)
					.toFormat("flac")
					.save(path + "-temp")
					.on("end", () => {
						// Replace the original file with the temporary file
						fs.rename(path + "-temp", path, (err) => {
							if (err) {
								return reject(err);
							}
							resolve();
						});
					})
					.on("error", (err) => {
						reject(err);
					});
			});
		},
	}),
	new Module({
		label: "AudioToOGG",
		description: "Convert audio files to .ogg.",
		from: [
			"audio/x-wav",
			"audio/wav",
			"audio/x-aac",
			"audio/x-flac",
			"audio/mp3",
			"audio/x-aiff",
			"audio/mpeg",
		],
		to: "audio/ogg",
		method: async ({ path }) => {
			await new Promise((resolve, reject) => {
				Ffmpeg(path)
					.toFormat("ogg")
					.save(path + "-temp")
					.on("end", () => {
						// Replace the original file with the temporary file
						fs.rename(path + "-temp", path, (err) => {
							if (err) {
								return reject(err);
							}
							resolve();
						});
					})
					.on("error", (err) => {
						reject(err);
					});
			});
		},
	}),
	new Module({
		label: "AudioToAIFF",
		description: "Convert audio files to .aiff.",
		from: [
			"audio/x-wav",
			"audio/wav",
			"audio/x-aac",
			"audio/x-flac",
			"audio/ogg",
			"audio/mp3",
			"audio/mpeg",
		],
		to: "audio/x-aiff",
		method: async ({ path }) => {
			await new Promise((resolve, reject) => {
				Ffmpeg(path)
					.toFormat("aiff")
					.save(path + "-temp")
					.on("end", () => {
						// Replace the original file with the temporary file
						fs.rename(path + "-temp", path, (err) => {
							if (err) {
								return reject(err);
							}
							resolve();
						});
					})
					.on("error", (err) => {
						reject(err);
					});
			});
		},
	}),
];

export default AudioModules;
