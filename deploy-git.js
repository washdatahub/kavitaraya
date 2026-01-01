import { execSync } from 'child_process';
import { copyFileSync, existsSync, rmSync, readdirSync, statSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

// Copy CNAME to dist if it exists
if (existsSync('CNAME')) {
  copyFileSync('CNAME', 'dist/CNAME');
  console.log('✓ CNAME copied to dist');
}

// Deploy using git commands directly (avoids Windows path length issues)
console.log('Deploying to gh-pages using git commands...');

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

  // Check if gh-pages branch exists
  let ghPagesExists = false;
  try {
    execSync('git show-ref --verify --quiet refs/heads/gh-pages', { stdio: 'ignore' });
    ghPagesExists = true;
  } catch {
    console.log('gh-pages branch does not exist locally');
  }

  // Check if remote gh-pages exists
  let remoteGhPagesExists = false;
  try {
    execSync('git ls-remote --heads origin gh-pages', { stdio: 'ignore' });
    remoteGhPagesExists = true;
  } catch {
    console.log('gh-pages branch does not exist on remote');
  }

  // Stash any uncommitted changes in dist (if any)
  try {
    execSync('git stash', { stdio: 'ignore' });
  } catch {}

  // Create or checkout gh-pages branch
  if (ghPagesExists) {
    console.log('Checking out existing gh-pages branch...');
    execSync('git checkout gh-pages', { stdio: 'inherit' });
  } else {
    console.log('Creating new gh-pages branch...');
    execSync('git checkout --orphan gh-pages', { stdio: 'inherit' });
    // Remove all files from the new branch
    try {
      execSync('git rm -rf .', { stdio: 'ignore' });
    } catch {}
  }

  // Copy dist contents to root using Node.js (avoids path length issues)
  console.log('Copying dist files...');
  const distPath = join(process.cwd(), 'dist');
  const destPath = process.cwd();
  
  // Recursive copy function
  function copyRecursive(src, dest) {
    const entries = readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
      const srcPath = join(src, entry.name);
      const destPathFull = join(dest, entry.name);
      
      // Skip .git directory
      if (entry.name === '.git') {
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
  
  copyRecursive(distPath, destPath);
  console.log('✓ Files copied successfully');

  // Add all files
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

  // Switch back to original branch
  console.log(`Switching back to ${currentBranch} branch...`);
  execSync(`git checkout ${currentBranch}`, { stdio: 'inherit' });

  // Restore stashed changes if any
  try {
    execSync('git stash pop', { stdio: 'ignore' });
  } catch {}

  console.log('✓ Deployment successful!');
  console.log('Your site should be live in a few minutes at: https://www.kavitaraya.com');
  
} catch (error) {
  console.error('✗ Deployment failed:', error.message);
  
  // Try to restore original branch if we're stuck on gh-pages
  try {
    const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
    if (currentBranch === 'gh-pages') {
      console.log('Attempting to restore original branch...');
      // Try to find the main branch
      let mainBranch = 'main';
      try {
        execSync('git show-ref --verify --quiet refs/heads/main', { stdio: 'ignore' });
      } catch {
        mainBranch = 'master';
        try {
          execSync('git show-ref --verify --quiet refs/heads/master', { stdio: 'ignore' });
        } catch {
          console.error('Could not find main or master branch to restore');
          process.exit(1);
        }
      }
      execSync(`git checkout ${mainBranch}`, { stdio: 'inherit' });
    }
  } catch (restoreError) {
    console.error('Could not restore original branch:', restoreError.message);
  }
  
  process.exit(1);
}

