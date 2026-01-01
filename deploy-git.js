import { execSync } from 'child_process';
import { copyFileSync, existsSync, rmSync, readdirSync, mkdirSync } from 'fs';
import { join } from 'path';

// Copy CNAME to dist if it exists
if (existsSync('CNAME')) {
  copyFileSync('CNAME', 'dist/CNAME');
  console.log('✓ CNAME copied to dist');
}

// Deploy using git worktree (avoids Windows path length issues and branch conflicts)
console.log('Deploying to gh-pages using git worktree...');

try {
  // Check if we're in a git repo
  try {
    execSync('git rev-parse --git-dir', { stdio: 'ignore' });
  } catch {
    throw new Error('Not a git repository. Please initialize git first.');
  }

  // Get current branch
  const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
  console.log(`Current branch: ${currentBranch}`);

  // Check if gh-pages branch exists remotely
  let remoteGhPagesExists = false;
  try {
    execSync('git ls-remote --heads origin gh-pages', { stdio: 'ignore' });
    remoteGhPagesExists = true;
    console.log('gh-pages branch exists on remote');
  } catch {
    console.log('gh-pages branch does not exist on remote, will be created');
  }

  // Clean up any existing worktree
  const worktreeDir = join(process.cwd(), '.deploy-worktree');
  try {
    execSync('git worktree remove .deploy-worktree --force', { stdio: 'ignore' });
  } catch {}

  // Remove worktree directory if it still exists
  if (existsSync(worktreeDir)) {
    rmSync(worktreeDir, { recursive: true, force: true });
  }

  // Create or checkout gh-pages branch in worktree
  console.log('Setting up gh-pages branch...');
  if (remoteGhPagesExists) {
    // Fetch and checkout existing branch
    execSync('git fetch origin gh-pages:gh-pages', { stdio: 'inherit' });
    execSync('git worktree add .deploy-worktree gh-pages', { stdio: 'inherit' });
  } else {
    // Create new orphan branch
    execSync('git worktree add .deploy-worktree -b gh-pages', { stdio: 'inherit' });
    // Remove all files from the new branch
    process.chdir(worktreeDir);
    try {
      execSync('git rm -rf .', { stdio: 'ignore' });
    } catch {}
    process.chdir('..');
  }

  // Copy dist contents to worktree using Node.js (avoids path issues)
  console.log('Copying dist files...');
  const distPath = join(process.cwd(), 'dist');
  
  // Recursive copy function that excludes .git and node_modules
  function copyRecursive(src, dest) {
    const entries = readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
      const srcPath = join(src, entry.name);
      const destPathFull = join(dest, entry.name);
      
      // Skip .git, node_modules, and cache directories
      if (entry.name === '.git' || entry.name === 'node_modules' || entry.name.includes('cache')) {
        continue;
      }
      
      if (entry.isDirectory()) {
        if (!existsSync(destPathFull)) {
          mkdirSync(destPathFull, { recursive: true });
        }
        copyRecursive(srcPath, destPathFull);
      } else {
        copyFileSync(srcPath, destPathFull);
      }
    }
  }
  
  copyRecursive(distPath, worktreeDir);
  console.log('✓ Files copied successfully');

  // Commit and push from worktree
  process.chdir(worktreeDir);
  
  // Add all files (excluding .git, node_modules, etc. via .gitignore)
  console.log('Staging files...');
  execSync('git add -A', { stdio: 'inherit' });
  
  // Check if there are changes to commit
  try {
    execSync('git diff --cached --quiet', { stdio: 'ignore' });
    console.log('No changes to commit');
  } catch {
    // There are changes, commit them
    console.log('Committing changes...');
    execSync('git commit -m "Deploy to GitHub Pages"', { stdio: 'inherit' });
  }

  // Push to remote
  console.log('Pushing to GitHub...');
  if (remoteGhPagesExists) {
    execSync('git push origin gh-pages', { stdio: 'inherit' });
  } else {
    execSync('git push -u origin gh-pages', { stdio: 'inherit' });
  }
  
  process.chdir('..');

  // Cleanup worktree
  console.log('Cleaning up...');
  execSync('git worktree remove .deploy-worktree', { stdio: 'inherit' });

  console.log('✓ Deployment successful!');
  console.log('Your site should be live in a few minutes at: https://www.kavitaraya.com');
  
} catch (error) {
  console.error('✗ Deployment failed:', error.message);
  
  // Try to cleanup worktree if it exists
  try {
    process.chdir('..');
    execSync('git worktree remove .deploy-worktree --force', { stdio: 'ignore' });
  } catch {}
  
  process.exit(1);
}
