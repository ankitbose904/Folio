const fs = require('fs');
const path = require('path');

const srcDir = '/Users/ankit/.gemini/antigravity/brain/0297d843-b991-4636-ad32-b34d7283fdcc';
const destDir = '/Users/ankit/Documents/folio/public/hero-3d';

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);

const mappings = {
    'hero_3d_airplane': 'airplane.png',
    'hero_3d_headphones': 'headphones.png',
    'hero_3d_skier': 'skier.png',
    'hero_3d_controller': 'controller.png',
    'hero_3d_camera': 'camera.png',
    'hero_3d_palette': 'palette.png',
    'hero_3d_cricket': 'cricket.png',
};

files.forEach(file => {
    for (const [prefix, newName] of Object.entries(mappings)) {
        if (file.startsWith(prefix) && file.endsWith('.png')) {
            fs.copyFileSync(path.join(srcDir, file), path.join(destDir, newName));
            console.log(`Copied ${file} to ${newName}`);
        }
    }
});
