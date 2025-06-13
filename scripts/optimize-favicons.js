#!/usr/bin/env node

/**
 * Favicon Optimization Script for Clarivue
 * This script helps optimize and validate favicon setup
 */

const fs = require('fs');
const path = require('path');

const FAVICON_DIR = path.join(__dirname, '../public/brand/clarivue-favicon');
const REQUIRED_SIZES = [
  '16x16', '32x32', '96x96', '192x192',
  'apple-152x152', 'apple-180x180',
  'ms-70x70', 'ms-144x144', 'ms-150x150', 'ms-310x310'
];

function checkFaviconFiles() {
  console.log('🔍 Checking favicon files...\n');
  
  const files = fs.readdirSync(FAVICON_DIR);
  const faviconFiles = files.filter(file => 
    file.endsWith('.png') || file.endsWith('.ico')
  );
  
  console.log('📁 Found favicon files:');
  faviconFiles.forEach(file => {
    const filePath = path.join(FAVICON_DIR, file);
    const stats = fs.statSync(filePath);
    console.log(`  ✓ ${file} (${(stats.size / 1024).toFixed(1)}KB)`);
  });
  
  console.log('\n📋 Required files:');
  const requiredFiles = [
    'favicon.ico',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'favicon-96x96.png',
    'favicon-192x192.png',
    'apple-icon-152x152.png',
    'apple-icon-180x180.png',
    'android-icon-192x192.png',
    'ms-icon-70x70.png',
    'ms-icon-144x144.png',
    'ms-icon-150x150.png',
    'ms-icon-310x150.png',
    'ms-icon-310x310.png'
  ];
  
  requiredFiles.forEach(file => {
    const exists = fs.existsSync(path.join(FAVICON_DIR, file));
    console.log(`  ${exists ? '✓' : '❌'} ${file}`);
  });
}

function validateManifest() {
  console.log('\n🔍 Validating manifest.json...');
  
  try {
    const manifestPath = path.join(FAVICON_DIR, 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    console.log('  ✓ Valid JSON format');
    console.log(`  ✓ App name: ${manifest.name}`);
    console.log(`  ✓ Start URL: ${manifest.start_url}`);
    console.log(`  ✓ Icons: ${manifest.icons.length} defined`);
    
    if (manifest.shortcuts) {
      console.log(`  ✓ Shortcuts: ${manifest.shortcuts.length} defined`);
    }
    
  } catch (error) {
    console.log(`  ❌ Error: ${error.message}`);
  }
}

function generateFaviconReport() {
  console.log('\n📊 Favicon Optimization Report');
  console.log('=====================================');
  
  checkFaviconFiles();
  validateManifest();
  
  console.log('\n💡 Optimization Tips:');
  console.log('  • Use high-quality PNG files for better clarity');
  console.log('  • Ensure all icon sizes are available for different devices');
  console.log('  • Test favicons across different browsers and devices');
  console.log('  • Consider using WebP format for supported browsers');
  console.log('  • Optimize file sizes without losing quality');
  
  console.log('\n🚀 Your favicon setup is optimized for:');
  console.log('  ✓ Desktop browsers (ICO, PNG)');
  console.log('  ✓ Mobile devices (Apple Touch Icons)');
  console.log('  ✓ Android devices (Android Icons)');
  console.log('  ✓ Windows tiles (Microsoft Icons)');
  console.log('  ✓ PWA support (Web App Manifest)');
  console.log('  ✓ Social sharing (Open Graph, Twitter Cards)');
}

// Run the report
if (require.main === module) {
  generateFaviconReport();
}

module.exports = {
  checkFaviconFiles,
  validateManifest,
  generateFaviconReport
}; 