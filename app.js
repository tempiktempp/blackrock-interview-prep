// Global state
let currentMode = 'interview';
let companies = [];
let currentCompany = null;
let currentExperience = null;
let filteredExperiences = [];

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    await loadCompanies();
    setupEventListeners();
});

// Load all companies from the companies directory
async function loadCompanies() {
    try {
        // List of company JSON files (in a real deployment, this would be dynamic)
        const companyFiles = ['blackrock.json']; // Add more as needed
        
        for (const file of companyFiles) {
            try {
                const response = await fetch(`companies/${file}`);
                if (response.ok) {
                    const data = await response.json();
                    companies.push(data);
                }
            } catch (error) {
                console.error(`Error loading ${file}:`, error);
            }
        }
        
        populateCompanyDropdown();
    } catch (error) {
        console.error('Error loading companies:', error);
    }
}

// Populate company dropdown
function populateCompanyDropdown() {
    const selector = document.getElementById('company-selector');
    selector.innerHTML = '<option value="">Select Company...</option>';
    
    companies.forEach((company, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = company.company;
        selector.appendChild(option);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Mode toggle
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchMode(btn.dataset.mode);
        });
    });
    
    // Company selector
    document.getElementById('company-selector').addEventListener('change', (e) => {
        if (e.target.value === '') {
            currentCompany = null;
            showNoCompanySelected();
        } else {
            loadCompany(parseInt(e.target.value));
        }
    });
    
    // Filters
    document.getElementById('location-filter').addEventListener('change', applyFilters);
    document.getElementById('result-filter').addEventListener('change', applyFilters);
}

// Switch between modes
function switchMode(mode) {
    currentMode = mode;
    
    // Update buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    // Update content
    document.querySelectorAll('.mode-content').forEach(content => {
        content.classList.toggle('active', content.id === `${mode}-mode`);
    });
}

// Load company data
function loadCompany(index) {
    currentCompany = companies[index];
    currentExperience = null;
    
    populateFilters();
    renderExperiencesList();
    showNoExperienceSelected();
    updateStatistics();
}

// Populate filter dropdowns
function populateFilters() {
    const locationFilter = document.getElementById('location-filter');
    const locations = [...new Set(currentCompany.experiences
        .map(exp => exp.location)
        .filter(loc => loc))];
    
    locationFilter.innerHTML = '<option value="">All Locations</option>';
    locations.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        locationFilter.appendChild(option);
    });
}

// Apply filters
function applyFilters() {
    if (!currentCompany) return;
    
    const locationFilter = document.getElementById('location-filter').value;
    const resultFilter = document.getElementById('result-filter').value;
    
    filteredExperiences = currentCompany.experiences.filter(exp => {
        if (locationFilter && exp.location !== locationFilter) return false;
        if (resultFilter && exp.result !== resultFilter) return false;
        return true;
    });
    
    renderExperiencesList();
    updateStatistics();
}

// Render experiences list
function renderExperiencesList() {
    const listContainer = document.getElementById('experiences-list');
    const experiences = filteredExperiences.length > 0 ? 
        filteredExperiences : currentCompany.experiences;
    
    if (experiences.length === 0) {
        listContainer.innerHTML = '<div class="empty-state"><p>No experiences match the filters</p></div>';
        return;
    }
    
    listContainer.innerHTML = '';
    
    experiences.forEach(exp => {
        const card = createExperienceCard(exp);
        listContainer.appendChild(card);
    });
}

// Create experience card
function createExperienceCard(exp) {
    const card = document.createElement('div');
    card.className = 'exp-card';
    card.dataset.expId = exp.id;
    
    const resultClass = exp.result.toLowerCase().replace(' ', '-');
    
    card.innerHTML = `
        <div class="exp-card-header">
            <div class="exp-card-title">${exp.position || 'Software Engineer'}</div>
            <span class="exp-badge ${resultClass}">${exp.result}</span>
        </div>
        <div class="exp-card-meta">
            ${exp.location ? `<span>📍 ${exp.location}</span>` : ''}
            ${exp.experience ? `<span>💼 ${exp.experience}</span>` : ''}
            ${exp.date ? `<span>📅 ${formatDate(exp.date)}</span>` : ''}
        </div>
        <div class="exp-card-footer">
            <span class="rounds-count">${exp.rounds.length} Rounds</span>
            <span class="source-tag">${exp.source}</span>
        </div>
    `;
    
    card.addEventListener('click', () => {
        selectExperience(exp);
    });
    
    return card;
}

// Select and display experience
function selectExperience(exp) {
    currentExperience = exp;
    
    // Update active card
    document.querySelectorAll('.exp-card').forEach(card => {
        card.classList.toggle('active', card.dataset.expId === exp.id);
    });
    
    // Hide empty states
    document.getElementById('no-company-selected').style.display = 'none';
    document.getElementById('no-experience-selected').style.display = 'none';
    document.getElementById('experience-details').style.display = 'block';
    
    renderExperienceDetails(exp);
}

// Render experience details
function renderExperienceDetails(exp) {
    // Header
    const resultClass = exp.result.toLowerCase().replace(' ', '-');
    document.getElementById('exp-title').textContent = 
        `${exp.candidate} - ${exp.position || 'Interview Experience'}`;
    
    const resultBadge = document.getElementById('exp-result-badge');
    resultBadge.textContent = exp.result;
    resultBadge.className = `result-badge ${resultClass}`;
    
    // Meta information
    document.getElementById('exp-position').textContent = exp.position || 'N/A';
    document.getElementById('exp-location').textContent = exp.location || 'N/A';
    document.getElementById('exp-experience').textContent = exp.experience || 'N/A';
    document.getElementById('exp-date').textContent = formatDate(exp.date);
    
    // Source link
    const sourceLink = document.getElementById('exp-source-link');
    sourceLink.href = exp.sourceUrl;
    document.getElementById('exp-source').textContent = exp.source;
    
    // Compensation
    if (exp.compensation) {
        document.getElementById('compensation-bar').style.display = 'flex';
        document.getElementById('comp-base').textContent = 
            exp.compensation.base ? `₹${exp.compensation.base} ${exp.compensation.currency}` : '-';
        document.getElementById('comp-bonus').textContent = 
            exp.compensation.bonus ? `₹${exp.compensation.bonus} ${exp.compensation.currency}` : '-';
        document.getElementById('comp-total').textContent = 
            exp.compensation.total ? `₹${exp.compensation.total} ${exp.compensation.currency}` : '-';
    } else {
        document.getElementById('compensation-bar').style.display = 'none';
    }
    
    // Rounds tabs and content
    renderRounds(exp.rounds);
    
    // Tips
    if (exp.tips && exp.tips.length > 0) {
        document.getElementById('tips-section').style.display = 'block';
        const tipsList = document.getElementById('tips-list');
        tipsList.innerHTML = exp.tips.map(tip => `<li>${tip}</li>`).join('');
    } else {
        document.getElementById('tips-section').style.display = 'none';
    }
}

// Render rounds tabs and panels
function renderRounds(rounds) {
    const tabsContainer = document.getElementById('rounds-tabs');
    const contentContainer = document.getElementById('rounds-content');
    
    tabsContainer.innerHTML = '';
    contentContainer.innerHTML = '';
    
    rounds.forEach((round, index) => {
        // Create tab
        const tab = document.createElement('button');
        tab.className = `round-tab ${index === 0 ? 'active' : ''}`;
        tab.textContent = `Round ${round.roundNumber}: ${round.roundName}`;
        tab.dataset.roundIndex = index;
        
        tab.addEventListener('click', () => {
            // Update active tab
            document.querySelectorAll('.round-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active panel
            document.querySelectorAll('.round-panel').forEach(p => p.classList.remove('active'));
            document.querySelector(`[data-panel-index="${index}"]`).classList.add('active');
        });
        
        tabsContainer.appendChild(tab);
        
        // Create panel
        const panel = createRoundPanel(round, index);
        contentContainer.appendChild(panel);
    });
}

// Create round panel
function createRoundPanel(round, index) {
    const panel = document.createElement('div');
    panel.className = `round-panel ${index === 0 ? 'active' : ''}`;
    panel.dataset.panelIndex = index;
    
    let html = `
        <div class="round-header">
            <h2 class="round-title">${round.roundName}</h2>
            <div class="round-info">
                ${round.duration ? `<span class="round-info-item">⏱️ ${round.duration}</span>` : ''}
                ${round.interviewers ? `<span class="round-info-item">👥 ${round.interviewers} interviewer(s)</span>` : ''}
                ${round.location ? `<span class="round-info-item">📍 ${round.location}</span>` : ''}
                ${round.platform ? `<span class="round-info-item">💻 ${round.platform}</span>` : ''}
            </div>
        </div>
    `;
    
    // Questions
    if (round.questions && round.questions.length > 0) {
        html += `
            <div class="questions-section">
                <h3 class="section-title">❓ Questions Asked</h3>
                ${round.questions.map(q => createQuestionCard(q)).join('')}
            </div>
        `;
    }
    
    // Sections (for online assessments)
    if (round.sections && round.sections.length > 0) {
        html += `
            <div class="questions-section">
                <h3 class="section-title">📝 Assessment Sections</h3>
                ${round.sections.map(s => createSectionCard(s)).join('')}
            </div>
        `;
    }
    
    // Discussion points
    if (round.discussion) {
        html += `
            <div class="questions-section">
                <h3 class="section-title">💬 Discussion Points</h3>
                <div class="question-card">
                    <p class="question-text">${round.discussion}</p>
                </div>
            </div>
        `;
    }
    
    // Notes
    if (round.note) {
        html += `
            <div class="questions-section">
                <h3 class="section-title">📌 Notes</h3>
                <div class="question-card">
                    <p class="question-text">${round.note}</p>
                </div>
            </div>
        `;
    }
    
    // Result
    if (round.result) {
        html += `
            <div class="questions-section">
                <h3 class="section-title">📋 Result</h3>
                <div class="question-card">
                    <p class="question-text">${round.result}</p>
                </div>
            </div>
        `;
    }
    
    panel.innerHTML = html;
    return panel;
}

// Create question card
function createQuestionCard(question) {
    const difficultyBadge = question.difficulty ? 
        `<span class="difficulty-badge ${question.difficulty.toLowerCase()}">${question.difficulty}</span>` : '';
    
    const leetcodeLink = question.leetcode ? 
        `<a href="https://leetcode.com/problems/${question.leetcode}" target="_blank" class="leetcode-link">LeetCode #${question.leetcode}</a>` : '';
    
    const topics = question.topics ? 
        `<div class="question-topics">${question.topics.map(t => `<span class="topic-tag">${t}</span>`).join('')}</div>` : '';
    
    const timeInfo = question.timeToSolve ? 
        `<p style="font-size: 13px; color: var(--text-secondary); margin-top: 8px;">⏱️ Solved in: ${question.timeToSolve}</p>` : '';
    
    return `
        <div class="question-card">
            <div class="question-header">
                <p class="question-text">${question.question}</p>
                ${difficultyBadge}
            </div>
            ${topics}
            ${leetcodeLink}
            ${timeInfo}
        </div>
    `;
}

// Create section card (for OA)
function createSectionCard(section) {
    return `
        <div class="question-card">
            <div class="question-header">
                <p class="question-text"><strong>${section.name}</strong></p>
                ${section.type ? `<span class="topic-tag">${section.type}</span>` : ''}
            </div>
            ${section.description ? `<p style="font-size: 13px; color: var(--text-secondary); margin-top: 8px;">${section.description}</p>` : ''}
            ${section.difficulty ? `<span class="difficulty-badge ${section.difficulty.toLowerCase()}">${section.difficulty}</span>` : ''}
            ${section.topics ? `<div class="question-topics">${section.topics.map(t => `<span class="topic-tag">${t}</span>`).join('')}</div>` : ''}
            ${section.questions ? `<p style="font-size: 13px; color: var(--text-secondary); margin-top: 8px;">Questions: ${section.questions}</p>` : ''}
        </div>
    `;
}

// Update statistics
function updateStatistics() {
    if (!currentCompany) return;
    
    const experiences = filteredExperiences.length > 0 ? 
        filteredExperiences : currentCompany.experiences;
    
    const selectedCount = experiences.filter(exp => exp.result === 'Selected').length;
    
    document.getElementById('total-exp').textContent = experiences.length;
    document.getElementById('selected-count').textContent = selectedCount;
}

// Show empty states
function showNoCompanySelected() {
    document.getElementById('no-company-selected').style.display = 'flex';
    document.getElementById('no-experience-selected').style.display = 'none';
    document.getElementById('experience-details').style.display = 'none';
    document.getElementById('experiences-list').innerHTML = '';
}

function showNoExperienceSelected() {
    document.getElementById('no-company-selected').style.display = 'none';
    document.getElementById('no-experience-selected').style.display = 'flex';
    document.getElementById('experience-details').style.display = 'none';
}

// Utility functions
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    
    const [year, month] = dateString.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return `${months[parseInt(month) - 1]} ${year}`;
}
