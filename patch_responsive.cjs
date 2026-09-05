const fs = require('fs');

const files = [
  'src/components/home-sections.tsx',
  'src/components/experience-sections.tsx',
  'src/components/portfolio-sections.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Replace py-32 with py-20 md:py-32 for better mobile vertical spacing
  content = content.replace(/py-32/g, 'py-20 md:py-32');
  
  // Specific fix for Education timeline alignment on mobile
  if (file.includes('experience-sections.tsx')) {
    content = content.replace(/absolute left-0 md:left-8/g, 'absolute left-5 md:left-8');
    
    // Also adjust font sizes in headings for better mobile view
    // text-5xl md:text-7xl -> text-4xl md:text-5xl lg:text-7xl
    content = content.replace(/text-5xl md:text-7xl/g, 'text-4xl md:text-5xl lg:text-7xl');
  }

  if (file.includes('home-sections.tsx')) {
    // text-4xl md:text-6xl -> text-3xl md:text-5xl lg:text-6xl
    content = content.replace(/text-4xl md:text-6xl/g, 'text-4xl md:text-5xl lg:text-6xl');
    content = content.replace(/text-5xl md:text-7xl/g, 'text-4xl md:text-5xl lg:text-7xl');
  }
  
  if (file.includes('portfolio-sections.tsx')) {
    content = content.replace(/text-5xl md:text-7xl/g, 'text-4xl md:text-5xl lg:text-7xl');
  }

  fs.writeFileSync(file, content);
});
