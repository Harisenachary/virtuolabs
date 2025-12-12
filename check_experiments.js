
import { experiments } from './src/data/experiments.js';

console.log("Experiments loaded successfully.");
console.log("Count:", experiments.length);
experiments.forEach(e => console.log("- " + e.id));
