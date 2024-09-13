import { Module } from "@nottimtam/file-converter";
import Ffmpeg from "fluent-ffmpeg";
import fs from "fs-extra";

const VideoModules = [
	new Module({
		label: "VideoToMP4",
		description: "Convert video files to .mp4.",
		from: [
			"video/x-msvideo",
			"video/x-matroska",
			"video/quicktime",
			"video/webm",
			"video/mpeg",
			"video/3gpp",
		],
		to: "video/mp4",
		method: async ({ path }) => {
			await new Promise((resolve, reject) => {
				Ffmpeg(path)
					.toFormat("mp4")
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
		label: "VideoToAVI",
		description: "Convert video files to .avi.",
		from: [
			"video/mp4",
			"video/x-matroska",
			"video/quicktime",
			"video/webm",
			"video/mpeg",
			"video/3gpp",
		],
		to: "video/x-msvideo",
		method: async ({ path }) => {
			await new Promise((resolve, reject) => {
				Ffmpeg(path)
					.toFormat("avi")
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
		label: "VideoToMKV",
		description: "Convert video files to .mkv.",
		from: [
			"video/x-msvideo",
			"video/mp4",
			"video/quicktime",
			"video/webm",
			"video/mpeg",
			"video/3gpp",
		],
		to: "video/x-matroska",
		method: async ({ path }) => {
			await new Promise((resolve, reject) => {
				Ffmpeg(path)
					.toFormat("mkv")
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
		label: "VideoToMOV",
		description: "Convert video files to .mov.",
		from: [
			"video/x-msvideo",
			"video/x-matroska",
			"video/mp4",
			"video/webm",
			"video/mpeg",
			"video/3gpp",
		],
		to: "video/quicktime",
		method: async ({ path }) => {
			await new Promise((resolve, reject) => {
				Ffmpeg(path)
					.toFormat("mov")
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
		label: "VideoToWEBM",
		description: "Convert video files to .webm.",
		from: [
			"video/x-msvideo",
			"video/x-matroska",
			"video/quicktime",
			"video/mp4",
			"video/mpeg",
			"video/3gpp",
		],
		to: "video/webm",
		method: async ({ path }) => {
			await new Promise((resolve, reject) => {
				Ffmpeg(path)
					.toFormat("webm")
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
		label: "VideoToMPEG",
		description: "Convert video files to .mpeg.",
		from: [
			"video/x-msvideo",
			"video/x-matroska",
			"video/quicktime",
			"video/webm",
			"video/mp4",
			"video/3gpp",
		],
		to: "video/mpeg",
		method: async ({ path }) => {
			await new Promise((resolve, reject) => {
				Ffmpeg(path)
					.toFormat("mpeg")
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
		label: "VideoTo3GP",
		description: "Convert video files to .3gp.",
		from: [
			"video/x-msvideo",
			"video/x-matroska",
			"video/quicktime",
			"video/webm",
			"video/mpeg",
			"video/mp4",
		],
		to: "video/3gpp",
		method: async ({ path }) => {
			await new Promise((resolve, reject) => {
				Ffmpeg(path)
					.toFormat("3gp")
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

export default VideoModules;
