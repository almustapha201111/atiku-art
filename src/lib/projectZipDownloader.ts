import JSZip from 'jszip';

// Dynamically capture all source code files at build time using Vite's import.meta.glob
const sourceModules = import.meta.glob([
  './*.ts',
  '../*.{tsx,css}',
  '../**/*.{tsx,ts,css}',
  '../../index.html',
  '../../package.json',
  '../../tsconfig.json',
  '../../vite.config.ts',
  '../../firestore.rules',
  '../../firebase-applet-config.json',
  '../../firebase-blueprint.json',
  '../../.env.example'
], { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

// Dynamically capture image assets URLs to fetch and embed in the zip
const imageAssetModules = import.meta.glob(
  '../assets/images/*.jpg',
  { query: '?url', import: 'default', eager: true }
) as Record<string, string>;

async function fetchBlob(url: string): Promise<Blob | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.blob();
  } catch (err) {
    console.warn('Could not fetch asset for zip:', url, err);
    return null;
  }
}

export async function downloadProjectZip(onProgress?: (status: string) => void): Promise<void> {
  const zip = new JSZip();

  if (onProgress) onProgress('Compiling project files & components...');

  // 1. Add complete README.md
  zip.file('README.md', `# ATIKU ART — Creative Wall Art & Interior Design Studio

A premium, modern, fully responsive web application for ATIKU ART, specializing in wall painting, artistic interior wall decoration, murals, and custom artwork in Nigeria.

## Features
- **Modern Light Art Gallery Theme**: Warm Ivory (#FAF7F2), Pure White (#FFFFFF), Terracotta Orange (#E76F51), Artistic Teal (#2A9D8F), and Golden Yellow (#E9C46A).
- **Cinematic Hero**: Large-scale colorful mural photography with Playfair Display & Inter typography.
- **Two-Tier Portfolio Gallery**: Concept Design showcases and verified "Our Real Projects" client work.
- **Interactive Before & After Comparison**: Draggable comparison slider for wall transformations.
- **WhatsApp Direct Booking**: Instant lead routing across all service cards and quote CTAs.
- **Client Inquiries & Contact Form**: Stored in Cloud Firestore with instant WhatsApp forward.
- **Secure Admin Dashboard**: Firebase Authentication with device image uploads, services management, WhatsApp phone configuration, and inquiry status tracking.
- **100% Responsive**: Built for iOS, Android, tablets, and desktop.

## Running the Project Locally

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Build production bundle:
   \`\`\`bash
   npm run build
   \`\`\`

Designed by AUS AI for ATIKU ART Studio.
`);

  // 2. Add all source files (App.tsx, components, context, lib, types, index.css, main.tsx, config files)
  for (const [modulePath, fileContent] of Object.entries(sourceModules)) {
    if (!fileContent) continue;

    let targetZipPath = '';
    if (modulePath.startsWith('../../')) {
      // Root files (e.g. ../../package.json -> package.json)
      targetZipPath = modulePath.replace('../../', '');
    } else if (modulePath.startsWith('./')) {
      // Sibling lib files (e.g. ./constants.ts -> src/lib/constants.ts)
      targetZipPath = 'src/lib/' + modulePath.replace('./', '');
    } else if (modulePath.startsWith('../')) {
      // Source files (e.g. ../App.tsx -> src/App.tsx, ../components/Hero.tsx -> src/components/Hero.tsx)
      targetZipPath = 'src/' + modulePath.replace('../', '');
    }

    if (targetZipPath) {
      zip.file(targetZipPath, fileContent);
    }
  }

  // 3. Fetch and embed all high-resolution project photography with exact file names
  if (onProgress) onProgress('Packaging high-resolution artwork images...');
  for (const [assetPath, assetUrl] of Object.entries(imageAssetModules)) {
    // assetPath is like '../assets/images/hero_wall_mural_1792872287346.jpg'
    const fileName = assetPath.split('/').pop();
    if (fileName && assetUrl) {
      const blob = await fetchBlob(assetUrl);
      if (blob) {
        zip.file(`src/assets/images/${fileName}`, blob);
      }
    }
  }

  if (onProgress) onProgress('Generating complete ZIP archive...');
  const content = await zip.generateAsync({ 
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 }
  });

  // Trigger download
  const downloadUrl = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = 'atiku-art-project.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);

  if (onProgress) onProgress('Done!');
}
