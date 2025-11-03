# 🚀 Quick Setup Guide for GitHub Pages

## Step 1: Customize Your Content

### A. Update Contact Information
1. Open both `index.html` and `contact.html`
2. Find and replace:
   - `+977 1234567890` → Your phone number
   - `info@drivra.com` → Your email
   - `Kathmandu, Nepal` → Your address

### B. Add Google Form
1. Create your Google Form at https://forms.google.com
2. Click "Send" → Click `<>` (embed icon)
3. Copy the iframe code
4. Open `contact.html`
5. Find the section with class `form-placeholder`
6. Replace entire `<div class="form-placeholder">...</div>` with your iframe code

### C. Add Google Maps
1. Go to https://www.google.com/maps
2. Search for your location
3. Click "Share" → "Embed a map"
4. Copy the iframe code
5. Open `contact.html`
6. Find the section with class `map-placeholder`
7. Replace entire `<div class="map-placeholder">...</div>` with your iframe code

### D. Replace Lorem Ipsum Text
Search for "Lorem ipsum" in both HTML files and replace with your actual content.

## Step 2: Deploy to GitHub Pages

### Option A: Using GitHub Desktop (Easiest)

1. Download GitHub Desktop from https://desktop.github.com
2. Create a new repository:
   - File → New Repository
   - Name: `drivra-website`
   - Local Path: Choose where to save
   - Click "Create Repository"
3. Copy all website files into the repository folder
4. Commit changes:
   - Add summary: "Initial website commit"
   - Click "Commit to main"
5. Publish repository:
   - Click "Publish repository"
   - Uncheck "Keep this code private" (if you want it public)
   - Click "Publish Repository"
6. Enable GitHub Pages:
   - Go to your repository on GitHub.com
   - Settings → Pages
   - Source: Select "main" branch
   - Click "Save"
7. Wait 2-5 minutes, your site will be live at:
   `https://YOUR_USERNAME.github.io/drivra-website/`

### Option B: Using Command Line

```bash
# 1. Navigate to your website folder
cd /path/to/drivra-website

# 2. Initialize git
git init

# 3. Add all files
git add .

# 4. Commit
git commit -m "Initial commit"

# 5. Create repository on GitHub.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/drivra-website.git

# 6. Push to GitHub
git branch -M main
git push -u origin main

# 7. Enable GitHub Pages (via GitHub website):
# Go to Settings → Pages → Source: main → Save
```

### Option C: Upload via GitHub Website

1. Create a new repository at https://github.com/new
2. Name it `drivra-website`
3. Click "uploading an existing file"
4. Drag and drop all your website files
5. Click "Commit changes"
6. Go to Settings → Pages
7. Source: Select "main" branch → Save
8. Your site will be live in 2-5 minutes!

## Step 3: Test Your Website

After deployment, test:
- ✅ All pages load correctly
- ✅ Navigation works
- ✅ Language toggle works
- ✅ Google Form appears and works
- ✅ Google Maps appears
- ✅ All links work
- ✅ Mobile responsiveness
- ✅ Contact information is correct

## Step 4: Custom Domain (Optional)

To use your own domain (e.g., www.drivra.com):

1. Buy a domain from:
   - Namecheap (https://www.namecheap.com)
   - GoDaddy (https://www.godaddy.com)
   - Google Domains (https://domains.google)

2. Configure DNS:
   - Add A records pointing to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Add CNAME record:
     ```
     www → YOUR_USERNAME.github.io
     ```

3. In GitHub repository:
   - Settings → Pages
   - Custom domain: Enter your domain
   - Check "Enforce HTTPS"
   - Wait 24-48 hours for DNS propagation

## Common Issues & Solutions

### Issue: Site not loading
**Solution**: Wait 5 minutes after enabling Pages, clear browser cache

### Issue: 404 error
**Solution**: Make sure `index.html` is in the root directory

### Issue: CSS not loading
**Solution**: Check file paths in HTML (should be relative: `css/style.css`)

### Issue: Google Form not showing
**Solution**: Make sure you copied the entire iframe code, including src URL

### Issue: Map not showing
**Solution**: Check if iframe code is complete and has proper src URL

### Issue: Language toggle not working
**Solution**: Make sure `js/script.js` is loading properly

## Need Help?

- GitHub Pages Documentation: https://pages.github.com
- GitHub Community Forum: https://github.community
- Contact: info@drivra.com

## Checklist Before Going Live

- [ ] All contact information updated
- [ ] Google Form added and tested
- [ ] Google Maps added with correct location
- [ ] All Lorem Ipsum text replaced
- [ ] Business hours updated
- [ ] Social media links updated
- [ ] Tested on mobile devices
- [ ] Tested on different browsers
- [ ] All images have alt text
- [ ] Privacy policy link works (if applicable)
- [ ] All external links open in new tabs

---

**🎉 Congratulations! Your website is ready to go live!**
