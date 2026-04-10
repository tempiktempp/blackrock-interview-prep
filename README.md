# 🎯 Scalable Interview Prep Dashboard

A modern, scalable interview preparation platform that aggregates real interview experiences from LeetCode Discuss, Glassdoor, and GeeksforGeeks. Designed to be **company-agnostic** and **easily extensible**.

---

## ✨ Key Features

### **Scalability & Architecture**
- ✅ **Multi-Company Support**: Add new companies by simply dropping JSON files in `/companies/` directory
- ✅ **Experience-Centric Design**: Each interview experience is a clickable card with detailed round-by-round breakdown
- ✅ **Source Attribution**: Every experience links back to original source (LeetCode Discuss, Glassdoor, etc.)
- ✅ **Mode Toggle**: Separate Interview Prep and Job Search dashboards (Job Search ready for future implementation)
- ✅ **No Hard-Coding**: All data driven from JSON - no company names in code

### **User Experience**
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 🎨 **Balanced Color Scheme**: Neither too dark nor too light
- 🔍 **Smart Filtering**: Filter by location, result (Selected/Rejected), and more
- 📊 **Live Statistics**: Real-time stats on experiences and success rates
- 🗂️ **Tabbed Interface**: Each interview round gets its own tab for easy navigation

### **Data Richness**
- 💰 **Compensation Data**: Base, bonus, and total package breakdowns
- ❓ **Question Bank**: Coding problems with LeetCode links, difficulty levels
- 🏷️ **Topic Tags**: Categorized by data structures, algorithms, frameworks
- 💡 **Candidate Tips**: Real insights from people who went through the process
- ⏱️ **Time Tracking**: Duration, rounds count, process timeline

---

## 📁 Project Structure

```
interview-prep-dashboard/
│
├── index-v2.html           # Main HTML file
├── styles-v2.css           # Styling
├── app-v2.js               # Application logic
│
├── companies/              # Company data directory
│   ├── blackrock.json      # BlackRock experiences (10 experiences)
│   ├── google.json         # (Add more companies here)
│   └── amazon.json         # (Simply add new JSON files)
│
└── README-V2.md            # This file
```

---

## 🚀 Quick Start

### **Method 1: Local Development**

1. **Clone or download** all files
2. **Maintain directory structure** (keep `companies/` folder)
3. **Open `index-v2.html`** in a web browser

```bash
# Serve with Python
python -m http.server 8000

# Or with Node.js
npx http-server

# Then visit http://localhost:8000
```

### **Method 2: GitHub Pages Deployment**

1. **Create repository**: `interview-prep-dashboard`
2. **Upload all files** including `companies/` directory
3. **Enable GitHub Pages**: Settings → Pages → Source: main branch
4. **Access at**: `https://YOUR_USERNAME.github.io/interview-prep-dashboard/index-v2.html`

---

## 📊 Current Data

### **BlackRock (10 Experiences)**
- **Sources**: LeetCode Discuss (5), Glassdoor (3), GeeksforGeeks (2)
- **Date Range**: April 2024 - September 2025 (past 6 months)
- **Locations**: Mumbai (3), Gurgaon (5), Campus (2)
- **Results**: Selected (7), Rejected (1), In Process (2)
- **Positions**: Associate, SDE-2, Intern, C++ Developer

### **Experience Details Include:**
- Candidate background and experience level
- Position and location details
- Complete round-by-round breakdown
- Questions asked (with LeetCode links where applicable)
- Compensation offered (for selected candidates)
- Tips and key takeaways

---

## ➕ Adding a New Company

### **Step 1: Create JSON File**

Create `companies/newcompany.json` following this structure:

```json
{
  "company": "Google",
  "lastUpdated": "2026-04-09",
  "experiences": [
    {
      "id": "exp_001",
      "candidate": "Anonymous_1",
      "source": "LeetCode Discuss",
      "sourceUrl": "https://leetcode.com/discuss/...",
      "date": "2025-10",
      "location": "Bangalore",
      "position": "SDE-2",
      "experience": "3 years",
      "result": "Selected",
      "compensation": {
        "base": 40,
        "bonus": 5,
        "total": 45,
        "currency": "LPA"
      },
      "rounds": [
        {
          "roundNumber": 1,
          "roundName": "Online Assessment",
          "duration": "90 mins",
          "questions": [
            {
              "type": "coding",
              "question": "Two Sum",
              "leetcode": 1,
              "difficulty": "Easy",
              "topics": ["Array", "HashMap"]
            }
          ]
        }
      ],
      "tips": [
        "Focus on system design",
        "Practice LeetCode hard problems"
      ]
    }
  ],
  "statistics": {
    "totalExperiences": 1,
    "sourceBreakdown": {
      "LeetCode Discuss": 1
    }
  }
}
```

### **Step 2: Update Company List**

In `app-v2.js`, update the `companyFiles` array:

```javascript
const companyFiles = [
    'blackrock.json',
    'google.json',     // Add this
    'amazon.json'      // Add this
];
```

### **Step 3: Done!**

The UI will automatically:
- Add company to dropdown
- Load all experiences
- Enable filtering and statistics
- Display round-by-round details

---

## 🔄 Adding More Experiences to Existing Company

### **Option 1: Manual Update**

1. Open `companies/blackrock.json`
2. Add new experience to `experiences` array:

```json
{
  "id": "exp_011",
  "candidate": "Anonymous_11",
  "source": "Glassdoor",
  "sourceUrl": "https://glassdoor.com/...",
  ...
}
```

3. Update `statistics.totalExperiences`
4. Refresh page

### **Option 2: Programmatic (Using Claude Skill - Coming Next)**

The Claude skill will:
1. Scrape new experiences from sources
2. Convert to JSON format
3. Merge with existing file
4. Update statistics automatically

---

## 🎨 UI Components

### **Mode Toggle**
- **Interview Prep**: View and analyze interview experiences
- **Job Search**: (Coming soon) Track applications, referrals, and job postings

### **Left Sidebar**
- **Experience Cards**: Shows candidate, result, location, rounds count
- **Filters**: Location, Result status
- **Statistics**: Total experiences, selected count
- **Source Tag**: LeetCode, Glassdoor, GeeksforGeeks

### **Right Panel**
- **Experience Header**: Title, result badge, meta info
- **Compensation Bar**: Base, bonus, total (when available)
- **Source Link**: Click to view original post
- **Round Tabs**: One tab per interview round
- **Round Details**: Questions, topics, difficulty, LeetCode links
- **Tips Section**: Candidate insights

---

## 📝 JSON Schema Reference

### **Root Level**
```json
{
  "company": "string",
  "lastUpdated": "YYYY-MM-DD",
  "experiences": [...],
  "statistics": {...}
}
```

### **Experience Object**
```json
{
  "id": "string",                    // Unique ID
  "candidate": "string",             // Anonymous_X or name
  "source": "string",                // Platform name
  "sourceUrl": "string",             // Full URL to original
  "date": "YYYY-MM",                 // Interview date
  "location": "string",              // City
  "position": "string",              // Job title
  "level": "string",                 // SDE-1, SDE-2, etc.
  "experience": "string",            // Years of experience
  "previousCompany": "string",       // Optional
  "result": "Selected|Rejected|In Process",
  "processDuration": "string",       // Optional
  "applicationMethod": "string",     // Optional
  "compensation": {...},             // Optional
  "rounds": [...],                   // Required
  "tips": [...]                      // Optional
}
```

### **Round Object**
```json
{
  "roundNumber": 1,
  "roundName": "string",
  "duration": "string",
  "interviewers": number,
  "location": "string",              // Optional
  "platform": "string",              // Optional
  "scheduledOnSameDay": boolean,     // Optional
  "questions": [...],
  "sections": [...],                 // For OA
  "discussion": "string",            // Optional
  "note": "string",                  // Optional
  "result": "string"                 // Optional
}
```

### **Question Object**
```json
{
  "type": "coding|technical|behavioral|sql|design",
  "question": "string",
  "leetcode": number,                // Optional
  "difficulty": "Easy|Medium|Hard",  // Optional
  "topics": ["string"],
  "timeToSolve": "string"            // Optional
}
```

---

## 🔧 Customization

### **Colors**
Edit `styles-v2.css` `:root` section:

```css
:root {
    --accent-primary: #3498db;  /* Blue */
    --accent-success: #2ecc71;  /* Green */
    --accent-warning: #f39c12;  /* Orange */
    --accent-danger: #e74c3c;   /* Red */
}
```

### **Filters**
Add new filters in `app-v2.js`:

```javascript
// Add position filter
function populateFilters() {
    const positions = [...new Set(currentCompany.experiences
        .map(exp => exp.position)
        .filter(pos => pos))];
    // Populate dropdown
}
```

---

## 🐛 Troubleshooting

**Issue**: Companies not loading  
**Solution**: Check browser console, ensure `companies/` directory exists, verify JSON is valid

**Issue**: Experiences not displaying  
**Solution**: Check JSON schema matches expected format, verify all required fields present

**Issue**: Filters not working  
**Solution**: Ensure experience objects have the fields being filtered (location, result)

**Issue**: GitHub Pages 404  
**Solution**: Ensure all files uploaded, check repository is Public, wait 2-3 minutes

---

## 📈 Future Enhancements

### **Planned Features**
- [ ] Export to PDF functionality
- [ ] Advanced search across all experiences
- [ ] Company comparison view
- [ ] Interview calendar/timeline visualization
- [ ] Success rate analytics per round
- [ ] Topic-based question aggregation
- [ ] Bookmark favorite experiences
- [ ] Dark mode toggle

### **Job Search Dashboard** (Mode 2)
- [ ] Application tracking
- [ ] Referral management
- [ ] Resume version control
- [ ] Job posting aggregator
- [ ] Interview scheduler
- [ ] Follow-up reminders

---

## 🤝 Contributing

### **Adding Data**
1. Find interview experiences on LeetCode, Glassdoor, GeeksforGeeks
2. Convert to JSON format (use existing as template)
3. Add to appropriate company file or create new one
4. Submit PR or update locally

### **Improving UI**
1. Fork repository
2. Make changes to HTML/CSS/JS
3. Test thoroughly
4. Submit PR with description

---

## 📄 License

Free to use for personal interview preparation. Please maintain attribution to original sources (LeetCode, Glassdoor, GeeksforGeeks) when sharing.

---

## 🙏 Credits

- **Data Sources**: LeetCode Discuss, Glassdoor, GeeksforGeeks
- **Design Inspiration**: Modern SaaS dashboards
- **Built With**: Vanilla JavaScript (no frameworks needed!)

---

## 📧 Support

For questions or issues:
1. Check this README thoroughly
2. Verify JSON schema compliance
3. Check browser console for errors
4. Validate JSON at jsonlint.com

---

**Happy Interview Prep! 🎯🚀**

Remember: Every rejection is one step closer to that perfect offer. Keep learning, keep improving!
