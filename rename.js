const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(componentsDir);

files.forEach(file => {
  if (file.endsWith('.tsx')) {
    const oldPath = path.join(componentsDir, file);
    const newPath = path.join(componentsDir, file + '.bak');
    fs.renameSync(oldPath, newPath);
  }
  if (file.endsWith('.module.css')) {
    const oldPath = path.join(componentsDir, file);
    const newPath = path.join(componentsDir, file + '.bak');
    fs.renameSync(oldPath, newPath);
  }
});

const appDir = path.join(__dirname, 'src', 'app');
const appFiles = fs.readdirSync(appDir);
appFiles.forEach(file => {
  if (file.endsWith('.tsx')) {
    const oldPath = path.join(appDir, file);
    const newPath = path.join(appDir, file.replace('.tsx', '.jsx'));
    fs.renameSync(oldPath, newPath);
  }
});

console.log('Renaming complete.');
