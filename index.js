import ImageModules from "./modules/images.js";
import DocumentModules from "./modules/documents.js";

export { default as ImageModules } from "./modules/images.js";
export { default as DocumentModules } from "./modules/documents.js";

const CoreModules = [...ImageModules, ...DocumentModules];

export default CoreModules;
