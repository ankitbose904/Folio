const fs = require('fs');
const path = require('path');

const brainDir = '/Users/ankit/.gemini/antigravity/brain/5491d02a-3410-4101-9c96-e4ea8c7e756f';
const publicDir = path.join(__dirname, 'public');

const files = [
  { src: 'media__1777273391269.jpg', dst: 'mlsa-swag.jpg' }
];

files.forEach(file => {
  const srcPath = path.join(brainDir, file.src);
  const dstPath = path.join(publicDir, file.dst);
  
  try {
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, dstPath);
      console.log(`Successfully copied ${file.src} to public/${file.dst}`);
    } else {
      console.error(`Source file not found: ${srcPath}`);
    }
  } catch (err) {
    console.error(`Error copying ${file.src}:`, err.message);
  }
});
