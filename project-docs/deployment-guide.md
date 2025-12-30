# Deployment Guide

**Project:** Awesome NAPCORE Tools  
**Hosting:** GitHub Pages  
**CI/CD:** GitHub Actions  
**Generated:** 2025-12-30

---

## Deployment Overview

The Awesome NAPCORE Tools catalog is automatically deployed to GitHub Pages using GitHub Actions. Every push to the `main` branch triggers a build and deployment.

### Deployment URLs

| Environment             | URL                                                          | Purpose                                     |
| ----------------------- | ------------------------------------------------------------ | ------------------------------------------- |
| **Production**          | `https://awesome.napcore.eu`                                 | Public-facing site (custom domain, planned) |
| **GitHub Pages**        | `https://napcore-tools.github.io/web-awesome_napcore_tools/` | Default GitHub Pages URL                    |
| **Local Preview**       | `http://localhost:5173`                                      | Development server                          |
| **Local Build Preview** | `http://localhost:4173`                                      | Production build preview                    |

---

## Automatic Deployment (GitHub Actions)

### Workflow File

**Location:** `.github/workflows/deploy.yml`

### Trigger Events

1. **Push to main branch**

   ```bash
   git push origin main
   ```

2. **Manual dispatch**
   - Go to GitHub Actions tab
   - Select "Deploy VitePress site to Pages"
   - Click "Run workflow"

### Deployment Steps

1. **Checkout code**
   - Fetches full git history (for `lastUpdated` frontmatter dates)

2. **Setup Node.js 20**
   - Installs Node.js runtime
   - Caches npm dependencies for faster builds

3. **Configure GitHub Pages**
   - Enables GitHub Pages if not already set

4. **Check for custom domain**
   - Queries GitHub API for custom domain configuration
   - Sets `VITEPRESS_BASE` accordingly:
     - Custom domain → `base: /`
     - GitHub Pages → `base: /${repository-name}/`

5. **Install dependencies**

   ```bash
   npm install
   ```

6. **Build site**

   ```bash
   npm run build
   ```

   - Runs validation (tools, categories, standards)
   - Compiles Vue components
   - Generates static HTML
   - Creates RSS feed
   - Outputs to `docs/.vitepress/dist/`

7. **Upload artifact**
   - Packages `docs/.vitepress/dist/` directory

8. **Deploy to GitHub Pages**
   - Publishes artifact to `gh-pages` branch
   - GitHub Pages serves from `gh-pages` branch

### Build Time

**Typical:** 2-3 minutes

- Checkout: ~10 seconds
- Setup Node: ~20 seconds
- Install dependencies: ~60 seconds (cached: ~10 seconds)
- Build: ~30-60 seconds
- Deploy: ~20 seconds

---

## Manual Deployment

### Prerequisites

- Repository write access
- GitHub Pages enabled in repository settings

### Steps

1. **Build locally**

   ```bash
   npm run build
   ```

2. **Verify build**

   ```bash
   npm run preview
   ```

   Open `http://localhost:4173` and test

3. **Push to main**

   ```bash
   git add .
   git commit -m "feat: updates for deployment"
   git push origin main
   ```

4. **Monitor deployment**
   - Go to GitHub Actions tab
   - Watch "Deploy VitePress site to Pages" workflow
   - Check for green checkmark

5. **Verify live site**
   - Wait 1-2 minutes for propagation
   - Visit production URL
   - Test key pages (homepage, tools, blog)

---

## Configuration

### GitHub Pages Settings

**Location:** Repository Settings → Pages

**Required Settings:**

- **Source:** Deploy from a branch
- **Branch:** `gh-pages` / `root`
- **Custom domain:** (optional) `awesome.napcore.eu`

### Environment Variables

| Variable         | Set In         | Purpose           | Value              |
| ---------------- | -------------- | ----------------- | ------------------ |
| `VITEPRESS_BASE` | GitHub Actions | Asset base path   | `/` or `/${repo}/` |
| `GITHUB_TOKEN`   | Auto-injected  | GitHub API access | Auto-generated     |

### Permissions

**GitHub Actions permissions required:**

```yaml
permissions:
  contents: read # Read repository files
  pages: write # Write to Pages
  id-token: write # Deploy to Pages
```

---

## Custom Domain Setup

### DNS Configuration

**For `awesome.napcore.eu`:**

1. **Add CNAME record:**

   ```
   awesome.napcore.eu → napcore-tools.github.io
   ```

2. **Wait for DNS propagation** (1-48 hours)

3. **Configure in GitHub:**
   - Repository Settings → Pages
   - Custom domain: `awesome.napcore.eu`
   - Check "Enforce HTTPS"

4. **Verify:**
   ```bash
   dig awesome.napcore.eu +short
   # Should show: napcore-tools.github.io
   ```

### HTTPS Certificate

**Automatic:** GitHub Pages provisions SSL certificate via Let's Encrypt
**Time:** 10-60 minutes after DNS propagation
**Renewal:** Automatic

---

## Build Output

### Generated Files

```
docs/.vitepress/dist/
├── index.html                    # Homepage
├── tools/
│   ├── index.html                # Tool catalog
│   ├── datex-browser.html
│   ├── datex-schema-tool.html
│   └── ...
├── categories/
│   ├── index.html                # Category overview
│   ├── validators.html
│   └── ...
├── standards/
│   ├── index.html
│   ├── datex-ii.html
│   └── ...
├── blog/
│   ├── index.html                # Blog listing
│   └── posts/
│       └── *.html
├── assets/
│   ├── chunks/                   # JS code-split chunks
│   ├── *.css                     # Bundled styles
│   └── *.js                      # Bundled scripts
├── feed.rss                      # RSS feed
├── llms.txt                      # LLM-friendly docs
├── llms-full.txt                 # Complete LLM docs
└── favicon.png                   # Favicon
```

### Asset Optimization

- **HTML:** Minified
- **CSS:** Bundled, minified, tree-shaken
- **JavaScript:** Code-split per route, minified
- **Images:** Served from `docs/public/`

---

## Deployment Troubleshooting

### Issue: Build fails with validation errors

**Symptoms:** GitHub Actions workflow fails during build step

**Causes:**

- Invalid tool frontmatter
- Missing required fields
- Invalid category/standard references

**Solution:**

1. Check workflow logs in GitHub Actions
2. Look for validation error messages
3. Fix frontmatter in affected markdown files
4. Test locally: `npm run build`
5. Push fix

### Issue: 404 errors on deployed site

**Symptoms:** Pages work locally but return 404 on GitHub Pages

**Causes:**

- Incorrect `base` path configuration
- Mixed use of absolute and relative links

**Solution:**

1. Verify `VITEPRESS_BASE` in GitHub Actions logs
2. Check if custom domain is configured
3. Test with: `VITEPRESS_BASE=/${repo}/ npm run build`
4. Preview: `npm run preview`

### Issue: CSS/JS assets not loading

**Symptoms:** Site loads but styles/functionality broken

**Causes:**

- Base path mismatch
- Asset path configuration error

**Solution:**

1. Check browser console for 404 errors
2. Verify asset URLs include correct base path
3. Rebuild with correct `VITEPRESS_BASE`

### Issue: Changes not appearing on live site

**Symptoms:** Pushed changes but site unchanged

**Causes:**

- Deployment still in progress
- Browser cache
- CDN cache (GitHub Pages CDN)

**Solution:**

1. Wait 2-3 minutes for deployment
2. Hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)
3. Check GitHub Actions for deployment status
4. Try incognito mode

### Issue: RSS feed not updating

**Symptoms:** New blog posts not in RSS feed

**Causes:**

- `buildEnd.ts` hook not running
- Feed generation error

**Solution:**

1. Check build logs for errors
2. Verify `buildEnd.ts` is executed
3. Check `docs/.vitepress/dist/feed.rss` exists
4. Test locally: `npm run build && npm run preview`

---

## Deployment Checklist

### Pre-Deployment

- [ ] All tests pass: `npm test`
- [ ] No linting errors: `npm run lint`
- [ ] No type errors: `npm run type-check`
- [ ] Build succeeds locally: `npm run build`
- [ ] Preview looks correct: `npm run preview`
- [ ] README.md updated (if needed)
- [ ] CHANGELOG.md updated (if using versioning)

### Deployment

- [ ] Changes committed to `main` branch
- [ ] GitHub Actions workflow triggered
- [ ] Build step completes successfully
- [ ] Deploy step completes successfully

### Post-Deployment

- [ ] Live site loads: `https://awesome.napcore.eu`
- [ ] Homepage renders correctly
- [ ] Tool pages accessible
- [ ] Category pages functional
- [ ] Blog posts visible
- [ ] RSS feed valid: `https://awesome.napcore.eu/feed.rss`
- [ ] Search works
- [ ] Navigation functional
- [ ] No console errors in browser

---

## Rollback Procedure

### If deployment breaks production:

1. **Identify last working commit:**

   ```bash
   git log --oneline
   ```

2. **Revert to last working commit:**

   ```bash
   git revert <commit-hash>
   git push origin main
   ```

   **OR** (if multiple commits):

   ```bash
   git reset --hard <last-working-commit>
   git push origin main --force
   ```

3. **Monitor GitHub Actions**
   - Wait for redeployment
   - Verify site is restored

4. **Fix issue in separate branch:**
   ```bash
   git checkout -b hotfix/deployment-issue
   # Make fixes
   git commit -m "fix: resolve deployment issue"
   # Test thoroughly
   git checkout main
   git merge hotfix/deployment-issue
   git push origin main
   ```

---

## Performance Monitoring

### GitHub Pages Analytics

**Not built-in** - GitHub Pages doesn't provide analytics

**Recommended:**

- Google Analytics (client-side)
- Plausible Analytics (privacy-friendly)
- Cloudflare Analytics (if using Cloudflare)

### Build Performance

**Monitor in GitHub Actions:**

- Build time trends
- Cache hit rates
- Dependency installation time

**Optimization:**

- Keep dependencies minimal
- Use dependency caching
- Avoid unnecessary build steps

---

## Security Considerations

### GitHub Actions Security

✓ **Use official actions:**

- `actions/checkout@v4`
- `actions/setup-node@v4`
- `actions/configure-pages@v4`

✓ **Minimal permissions:**

- Only grant required permissions
- Use `read` where possible

✓ **No secrets required:**

- Static site, no API keys
- GITHUB_TOKEN auto-injected

### Content Security

✓ **Validation at build time:**

- Tool frontmatter validated
- Invalid content rejected
- Build fails on errors

✓ **No user-generated content:**

- All content committed to git
- No dynamic database

✓ **HTTPS enforced:**

- GitHub Pages enforces HTTPS
- HTTP requests redirected

---

## Future Deployment Enhancements

### Planned Improvements

1. **Preview deployments:**
   - Deploy PR previews for testing
   - Use Netlify or Vercel for previews

2. **Staging environment:**
   - Separate staging branch
   - Test before merging to main

3. **Performance budgets:**
   - Lighthouse CI checks
   - Bundle size monitoring

4. **Automated tests in CI:**
   - Run unit tests before deployment
   - Run E2E tests on deployed preview

---

## Related Documentation

- Development Guide: `development-guide.md`
- CI/CD Configuration: `.github/workflows/deploy.yml`
- VitePress Configuration: `docs/.vitepress/config.ts`
