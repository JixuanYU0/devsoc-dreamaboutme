# GitHub Pages Deployment Guide

## Quick Setup

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit: Dreams & Reality portfolio website"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

3. **Access Your Website**:
   - Your website will be available at: `https://yourusername.github.io/devsoc-dreamaboutme/`
   - It may take a few minutes to deploy

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file to the root directory with your domain name
2. Configure your domain's DNS settings to point to GitHub Pages
3. Enable "Enforce HTTPS" in GitHub Pages settings

## File Structure

```
devsoc-dreamaboutme/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript interactions
├── README.md           # Project documentation
└── DEPLOYMENT.md       # This deployment guide
```

## Troubleshooting

- **404 Error**: Make sure the repository is public and GitHub Pages is enabled
- **Styling Issues**: Check that all CSS files are properly linked
- **JavaScript Not Working**: Ensure the script.js file is loaded correctly
- **Images Not Loading**: Verify image paths are correct

## Updates

To update your website:
1. Make changes to your files
2. Commit and push to GitHub
3. GitHub Pages will automatically redeploy

Your magical dreams website is now live! ✨
