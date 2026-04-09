# BlackRock Interview Prep Dashboard

A comprehensive, interactive dashboard for preparing for BlackRock SDE 2 (Fullstack Java Developer) interviews in Mumbai.

## 🎯 Features

- **Overview Dashboard**: Quick stats and success strategies
- **Compensation Details**: Expected salary ranges with recent data points
- **Interview Process Timeline**: Complete breakdown of all rounds
- **Questions Bank**: 
  - Online Assessment (Coding, SQL, Aptitude)
  - DSA Technical (LeetCode problems with priority)
  - Java & Spring Boot (Core concepts, multithreading, microservices)
  - System Design (Banking systems, cache, scalability)
  - Behavioral (STAR format questions)
- **3-Week Study Plan**: Day-by-day structured preparation
- **Learning Resources**: Curated links to best materials
- **Job Search Strategy**: Sites, search terms, and application tips
- **Search Functionality**: Find questions and topics quickly
- **Progress Tracking**: Monitor your preparation progress

## 📁 Project Structure

```
blackrock-interview-prep/
│
├── index.html                    # Main HTML file
├── styles.css                    # Styling (balanced theme)
├── app.js                        # JavaScript application logic
├── blackrock-prep-data.json      # All interview data in JSON
└── README.md                     # This file
```

## 🚀 Deployment to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click "New repository"
3. Name it: `blackrock-interview-prep`
4. Make it Public (required for GitHub Pages free tier)
5. Don't initialize with README (we'll add our own)
6. Click "Create repository"

### Step 2: Upload Files

**Option A: Using GitHub Web Interface**
1. Click "uploading an existing file"
2. Drag and drop all 4 files:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `blackrock-prep-data.json`
3. Commit changes

**Option B: Using Git Command Line**
```bash
# Navigate to your project folder
cd /path/to/blackrock-interview-prep

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - BlackRock interview prep dashboard"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/blackrock-interview-prep.git

# Push
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "main" branch
5. Click "Save"
6. Wait 1-2 minutes for deployment

### Step 4: Access Your Dashboard

Your dashboard will be available at:
```
https://YOUR_USERNAME.github.io/blackrock-interview-prep/
```

Example: `https://johndoe.github.io/blackrock-interview-prep/`

## 🎨 Design Features

- **Balanced Color Scheme**: Neither too dark nor too light
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Interactive Navigation**: Smooth section transitions
- **Collapsible Categories**: Organized question sections
- **Priority Badges**: Visual indicators for important topics
- **Progress Tracking**: Monitor your preparation completion

## 📱 Usage

1. **Navigation**: Use the sidebar to switch between sections
2. **Search**: Type in the search box to find specific questions or topics
3. **Questions**: Click on category headers to expand/collapse question lists
4. **Study Plan**: Follow day-by-day tasks for structured preparation
5. **Resources**: Click links to access external learning materials
6. **Progress**: Your progress is automatically saved in browser

## 🔧 Customization

### Update Data
Edit `blackrock-prep-data.json` to:
- Add more questions
- Update compensation data
- Modify study plan
- Add resources

### Change Colors
Edit `styles.css` `:root` section:
```css
:root {
    --accent-primary: #3498db;  /* Change primary color */
    --accent-secondary: #2ecc71; /* Change secondary color */
    /* ... more variables */
}
```

### Add Sections
1. Add new nav item in `index.html`
2. Create render function in `app.js`
3. Add data to `blackrock-prep-data.json`

## 📊 Data Structure

The JSON file contains:
- `metadata`: Role, location, experience details
- `compensation`: Salary ranges and structure
- `interviewProcess`: Round-by-round breakdown
- `questions`: Categorized by round type
- `studyPlan`: 3-week day-by-day plan
- `resources`: Learning materials
- `jobSearch`: Sites and search strategies

## 🐛 Troubleshooting

**Dashboard not loading?**
- Check browser console (F12) for errors
- Ensure all 4 files are in the same directory
- Verify `blackrock-prep-data.json` is valid JSON

**GitHub Pages not working?**
- Wait 2-3 minutes after enabling
- Check repository is Public
- Verify main branch is selected in Settings > Pages

**Styling looks broken?**
- Clear browser cache (Ctrl+F5)
- Check `styles.css` is loading (Network tab in DevTools)

## 📝 License

Free to use for personal interview preparation. Please don't redistribute commercially.

## 🤝 Contributing

This is a personal prep tool, but feel free to fork and customize for your needs!

## 📧 Support

For issues with deployment or customization, refer to:
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [JSON Validator](https://jsonlint.com/)

---

**Good luck with your BlackRock interview! 🚀**

Remember:
- ✅ Practice coding daily
- ✅ Master Java multithreading
- ✅ Understand Spring Boot deeply
- ✅ Design scalable systems
- ✅ Prepare STAR stories
- ✅ Research BlackRock Aladdin platform
