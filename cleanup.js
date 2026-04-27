const fs = require('fs');
const files = [
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/app/page.module.css',
  'src/components/AboutSection.tsx',
  'src/components/AboutSection.module.css',
  'src/components/Experience.tsx',
  'src/components/Experience.module.css',
  'src/components/Footer.tsx',
  'src/components/Footer.module.css',
  'src/components/Hero.tsx',
  'src/components/Hero.module.css',
  'src/components/InternshipSpotlight.tsx',
  'src/components/InternshipSpotlight.module.css',
  'src/components/Logofolio.tsx',
  'src/components/Logofolio.module.css',
  'src/components/Navbar.tsx',
  'src/components/Navbar.module.css',
  'src/components/ProjectGrid.tsx',
  'src/components/ProjectGrid.module.css',
  'src/components/SmoothScroll.tsx'
];

for (const file of files) {
  try {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`Deleted ${file}`);
    }
  } catch (e) {
    console.error(`Error deleting ${file}:`, e);
  }
}
