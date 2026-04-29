const fs = require('fs');
const path = require('path');

const destDir = path.join(__dirname, 'public', 'about-3d');
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const filesToCopy = [
    { src: '/Users/ankit/.gemini/antigravity/brain/1dfbca2b-5953-4e25-90a4-14694fa11db6/figma_3d_1777437696945.png', dest: 'figma.png' },
    { src: '/Users/ankit/.gemini/antigravity/brain/1dfbca2b-5953-4e25-90a4-14694fa11db6/framer_3d_1777437716028.png', dest: 'framer.png' },
    { src: '/Users/ankit/.gemini/antigravity/brain/1dfbca2b-5953-4e25-90a4-14694fa11db6/openai_3d_1777437733788.png', dest: 'openai.png' },
    { src: '/Users/ankit/.gemini/antigravity/brain/1dfbca2b-5953-4e25-90a4-14694fa11db6/gemini_3d_1777437748984.png', dest: 'gemini.png' }
];

filesToCopy.forEach(file => {
    fs.copyFileSync(file.src, path.join(destDir, file.dest));
    console.log(`Copied to ${file.dest}`);
});
