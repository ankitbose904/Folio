const fs = require('fs');
const path = require('path');

const brainDir = '/Users/ankit/.gemini/antigravity/brain/5491d02a-3410-4101-9c96-e4ea8c7e756f';
const publicDir = path.join(__dirname, 'public');

const files = [
  { src: 'media__1777271755960.png', dst: 'panther-logo.png' },
  { src: 'media__1777272788232.png', dst: 'gdg-team.png' },
  { src: 'design_sticker_1777269924012.png', dst: 'design-sticker.png' },
  { src: 'experience_mlsa_lead_1777270229601.png', dst: 'exp-3.png' }
];

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

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
