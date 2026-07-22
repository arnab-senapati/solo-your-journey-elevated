const fs = require('fs');
const sizeOf = require('image-size');
const dir = './public/Assets';
const files = fs.readdirSync(dir);

const r169 = [];
const r916 = [];
const other = [];

files.forEach(file => {
  if (file.endsWith('.json') || file.startsWith('.')) return;
  try {
    const dimensions = sizeOf(`${dir}/${file}`);
    const ratio = dimensions.width / dimensions.height;
    if (ratio > 1.7 && ratio < 1.8) {
      r169.push(file);
    } else if (ratio > 0.5 && ratio < 0.6) {
      r916.push(file);
    } else {
      other.push({file, w: dimensions.width, h: dimensions.height, ratio: ratio.toFixed(2)});
    }
  } catch (e) {}
});

console.log("16:9:", r169);
console.log("9:16:", r916);
console.log("Other:", other);
