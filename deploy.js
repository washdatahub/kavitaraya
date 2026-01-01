import { execSync } from 'child_process';
import { copyFileSync, existsSync } from 'fs';
import { resolve } from 'path';

// Copy CNAME to dist if it exists
if (existsSync('CNAME')) {
  copyFileSync('CNAME', 'dist/CNAME');
  console.log('✓ CNAME copied to dist');
}

// Deploy using gh-pages with Windows workarounds
console.log('Deploying to gh-pages...');

// Workaround for Windows ENAMETOOLONG error
// Use shorter relative paths and set git config
const distPath = resolve(process.cwd(), 'dist');
const isWindows = process.platform === 'win32';

try {
  // Set git config to help with path issues on Windows
  if (isWindows) {
    try {
      execSync('git config core.longpaths true', { stdio: 'ignore' });
    } catch {}
  }
  
  // Try deploying with various workarounds
  const deployCommands = [
    // First try: standard with --no-history
    'npx gh-pages -d dist --dotfiles --no-history',
    // Second try: without --no-history
    'npx gh-pages -d dist --dotfiles',
    // Third try: with --repo flag (if we can get the URL)
    (() => {
      try {
        const repoUrl = execSync('git config --get remote.origin.url', { encoding: 'utf-8' }).trim();
        return `npx gh-pages -d dist --dotfiles --repo ${repoUrl}`;
      } catch {
        return null;
      }
    })()
  ].filter(cmd => cmd !== null);
  
  let deployed = false;
  for (const cmd of deployCommands) {
    try {
      console.log(`Trying: ${cmd}`);
      execSync(cmd, {
        stdio: 'inherit',
        shell: true,
        maxBuffer: 1024 * 1024 * 10,
        env: {
          ...process.env,
          GIT_SSH_COMMAND: 'ssh'
        }
      });
      console.log('✓ Deployment successful!');
      deployed = true;
      break;
    } catch (error) {
      if (error.message.includes('ENAMETOOLONG')) {
        console.log('Path too long, trying next method...');
        continue;
      }
      throw error;
    }
  }
  
  if (!deployed) {
    throw new Error('All deployment methods failed due to path length issues');
  }
  
} catch (error) {
  console.error('✗ Deployment failed:', error.message);
  console.error('\n⚠ Windows Path Length Issue Detected');
  console.error('\n🔧 Solutions (try in order):');
  console.error('\n1. Use Git Bash (Recommended - Easiest):');
  console.error('   - Open Git Bash');
  console.error('   - Navigate to your project: cd "/d/Mini Projects/kavitaraya.com"');
  console.error('   - Run: npm run deploy');
  console.error('\n2. Enable Long Paths in Windows:');
  console.error('   - Open PowerShell as Administrator');
  console.error('   - Run: .\\enable-long-paths.ps1');
  console.error('   - Restart your computer');
  console.error('   - Try deploying again');
  console.error('\n3. Use Alternative Deploy Script:');
  console.error('   - Run: node deploy-alt.js');
  process.exit(1);
}

