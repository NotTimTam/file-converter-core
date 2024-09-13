import ImageModules from "./modules/images.js";
import DocumentModules from "./modules/documents.js";
import AudioModules from "./modules/audio.js";

export { default as ImageModules } from "./modules/images.js";
export { default as DocumentModules } from "./modules/documents.js";
export { default as AudioModules } from "./modules/audio.js";

const CoreModules = [...ImageModules, ...DocumentModules, ...AudioModules];

export default CoreModules;
