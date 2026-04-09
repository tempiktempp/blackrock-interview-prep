// Global data storage
let interviewData = null;
let currentSection = 'overview';
let completedItems = JSON.parse(localStorage.getItem('completedItems')) || {};

// Load JSON data
async function loadData() {
    try {
        const response = await fetch('blackrock-prep-data.json');
        interviewData = await response.json();
        initializeApp();
    } catch (error) {
        console.error('Error loading data:', error);
        document.getElementById('content-wrapper').innerHTML = `
            <div class="card">
                <h2>Error Loading Data</h2>
                <p>Please ensure blackrock-prep-data.json is in the same directory.</p>
            </div>
        `;
    }
}

// Initialize the application
function initializeApp() {
    setupNavigation();
    setupSearch();
    updateProgressBar();
    renderSection('overview');
}

// Navigation setup
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            const section = item.getAttribute('data-section');
            renderSection(section);
        });
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    let debounceTimer;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const query = e.target.value.toLowerCase();
            if (query.length > 2) {
                performSearch(query);
            }
        }, 300);
    });
}

// Search implementation
function performSearch(query) {
    const results = [];
    
    // Search in DSA questions
    if (interviewData.questions.dsaTechnical.mustDo) {
        interviewData.questions.dsaTechnical.mustDo.forEach(q => {
            if (q.title.toLowerCase().includes(query) || 
                q.topics.some(t => t.toLowerCase().includes(query))) {
                results.push({
                    type: 'DSA Question',
                    title: q.title,
                    section: 'questions'
                });
            }
        });
    }
    
    if (results.length > 0) {
        displaySearchResults(results);
    }
}

// Render sections
function renderSection(section) {
    currentSection = section;
    const contentWrapper = document.getElementById('content-wrapper');
    contentWrapper.innerHTML = '';
    contentWrapper.classList.add('fade-in');
    
    setTimeout(() => {
        contentWrapper.classList.remove('fade-in');
    }, 500);
    
    switch(section) {
        case 'overview':
            renderOverview();
            break;
        case 'compensation':
            renderCompensation();
            break;
        case 'interview-process':
            renderInterviewProcess();
            break;
        case 'questions':
            renderQuestions();
            break;
        case 'study-plan':
            renderStudyPlan();
            break;
        case 'resources':
            renderResources();
            break;
        case 'job-search':
            renderJobSearch();
            break;
    }
}

// Render Overview
function renderOverview() {
    const { metadata, interviewProcess, compensation } = interviewData;
    
    const html = `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-label">Target Role</div>
                <div class="stat-value">${metadata.role.split(' - ')[0]}</div>
                <div class="stat-description">${metadata.role.split(' - ')[1]}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Location</div>
                <div class="stat-value">${metadata.location}</div>
                <div class="stat-description">BlackRock India Office</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Experience</div>
                <div class="stat-value">${metadata.experience}</div>
                <div class="stat-description">at ${metadata.currentCompany}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Expected CTC</div>
                <div class="stat-value">${compensation.totalCTC.min}-${compensation.totalCTC.max}</div>
                <div class="stat-description">LPA (Lakhs Per Annum)</div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">🎯 Interview Process Overview</h2>
                <p class="card-subtitle">Total Duration: ${interviewProcess.overview.totalDuration} | Success Rate: ${interviewProcess.overview.successRate}</p>
            </div>
            <div class="timeline">
                ${interviewProcess.rounds.map(round => `
                    <div class="timeline-item">
                        <div class="timeline-header">
                            <h3 class="timeline-title">${round.name}</h3>
                            <span class="timeline-badge">${round.duration}</span>
                        </div>
                        <p class="timeline-description">${round.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">✅ Key Success Strategies</h2>
            </div>
            <div class="stats-grid">
                ${Object.entries(interviewData.successStrategies).map(([key, strategies]) => `
                    <div class="stat-card">
                        <h3 class="stat-label">${key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                        <ul class="task-list">
                            ${strategies.slice(0, 3).map(s => `<li>${s}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">⚠️ Common Mistakes to Avoid</h2>
            </div>
            <ul class="task-list">
                ${interviewData.commonMistakes.map(mistake => `<li>${mistake}</li>`).join('')}
            </ul>
        </div>
    `;
    
    document.getElementById('content-wrapper').innerHTML = html;
}

// Render Compensation
function renderCompensation() {
    const { compensation } = interviewData;
    
    const html = `
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">💰 ${compensation.title}</h2>
            </div>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-label">Base Salary</div>
                    <div class="stat-value">₹${compensation.baseSalary.min}-${compensation.baseSalary.max}</div>
                    <div class="stat-unit">${compensation.baseSalary.unit}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Variable/Bonus</div>
                    <div class="stat-value">₹${compensation.variable.min}-${compensation.variable.max}</div>
                    <div class="stat-unit">${compensation.variable.unit}</div>
                    <div class="stat-description">${compensation.variable.percentage}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Benefits</div>
                    <div class="stat-value">₹${compensation.benefits.min}-${compensation.benefits.max}</div>
                    <div class="stat-unit">${compensation.benefits.unit}</div>
                    <div class="stat-description">${compensation.benefits.description}</div>
                </div>
                <div class="stat-card" style="background: linear-gradient(135deg, #3498db, #2ecc71);">
                    <div class="stat-label" style="color: white;">Total CTC</div>
                    <div class="stat-value" style="color: white;">₹${compensation.totalCTC.min}-${compensation.totalCTC.max}</div>
                    <div class="stat-unit" style="color: white;">${compensation.totalCTC.unit}</div>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">📊 Recent Data Points (2024-2026)</h2>
            </div>
            <div class="day-grid">
                ${compensation.dataPoints.map(dp => `
                    <div class="day-card">
                        <h3 class="day-title">${dp.level} - ${dp.experience}</h3>
                        <div class="task-section">
                            <div class="task-label">Breakdown</div>
                            <ul class="task-list">
                                <li>Base: ₹${dp.base} LPA</li>
                                ${dp.bonus ? `<li>Bonus: ₹${dp.bonus} LPA</li>` : ''}
                                ${dp.variable ? `<li>Variable: ${dp.variable}</li>` : ''}
                                ${dp.benefits ? `<li>Benefits: ₹${dp.benefits} LPA</li>` : ''}
                                <li><strong>Total: ₹${dp.total} LPA</strong></li>
                            </ul>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">📋 Salary Structure</h2>
            </div>
            <ul class="task-list">
                ${Object.entries(compensation.structure).map(([key, value]) => `
                    <li><strong>${key.replace(/([A-Z])/g, ' $1').trim()}:</strong> ${value}</li>
                `).join('')}
            </ul>
        </div>
    `;
    
    document.getElementById('content-wrapper').innerHTML = html;
}

// Render Interview Process
function renderInterviewProcess() {
    const { interviewProcess } = interviewData;
    
    const html = `
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">🔄 Complete Interview Process</h2>
                <p class="card-subtitle">
                    Duration: ${interviewProcess.overview.totalDuration} | 
                    Difficulty: ${interviewProcess.overview.difficultyRating} | 
                    Success Rate: ${interviewProcess.overview.successRate}
                </p>
            </div>
        </div>
        
        ${interviewProcess.rounds.map((round, idx) => `
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">
                        <span style="background: #3498db; color: white; width: 32px; height: 32px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 16px;">${round.id}</span>
                        ${round.name}
                    </h2>
                    <p class="card-subtitle">${round.duration} | ${round.week}</p>
                </div>
                <p style="color: var(--text-secondary); font-size: 15px; line-height: 1.6;">${round.description}</p>
                ${idx < interviewProcess.rounds.length - 1 ? '<div style="text-align: center; margin-top: 20px; color: var(--accent-primary); font-size: 24px;">↓</div>' : ''}
            </div>
        `).join('')}
    `;
    
    document.getElementById('content-wrapper').innerHTML = html;
}

// Render Questions
function renderQuestions() {
    const { questions } = interviewData;
    
    let html = `
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">❓ Questions Bank</h2>
                <p class="card-subtitle">Organized by interview round and priority</p>
            </div>
        </div>
    `;
    
    // Online Assessment
    html += `
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Round 1: Online Assessment (90 mins)</h2>
            </div>
            
            <div class="question-category">
                <div class="category-header" onclick="toggleCategory('oa-coding')">
                    <div class="category-title">
                        <span>💻 Coding (${questions.onlineAssessment.coding.duration})</span>
                    </div>
                    <span class="priority-badge priority-5">Must Practice</span>
                </div>
                <div class="question-list" id="oa-coding">
                    ${questions.onlineAssessment.coding.questions.map(q => `
                        <div class="question-item">
                            <div class="question-text">${q.title}</div>
                            <p style="font-size: 13px; color: var(--text-secondary); margin: 8px 0;">${q.description}</p>
                            <div class="question-meta">
                                <span class="tag difficulty-${q.difficulty.toLowerCase().replace('-', ' ')}">${q.difficulty}</span>
                                ${q.topics.map(t => `<span class="tag">${t}</span>`).join('')}
                                ${q.leetcodeRef ? `<span class="tag leetcode-tag">LC: ${q.leetcodeRef}</span>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="question-category">
                <div class="category-header" onclick="toggleCategory('oa-sql')">
                    <div class="category-title">
                        <span>🗄️ SQL (${questions.onlineAssessment.sql.duration})</span>
                    </div>
                    <span class="priority-badge priority-5">Critical</span>
                </div>
                <div class="question-list" id="oa-sql">
                    <div class="question-item">
                        <div class="question-text">Topics to Master:</div>
                        <ul class="task-list">
                            ${questions.onlineAssessment.sql.topics.map(t => `<li>${t}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="question-item">
                        <div class="question-text">Actual Questions Asked:</div>
                        <ul class="task-list">
                            ${questions.onlineAssessment.sql.actualQuestions.map(q => `<li>${q}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // DSA Technical
    html += `
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Round 2: DSA Technical (45-60 mins)</h2>
            </div>
            
            <div class="question-category">
                <div class="category-header" onclick="toggleCategory('dsa-mustdo')">
                    <div class="category-title">
                        <span>⭐ Must-Do Problems (Priority Order)</span>
                    </div>
                    <span class="priority-badge priority-5">Essential</span>
                </div>
                <div class="question-list" id="dsa-mustdo">
                    ${questions.dsaTechnical.mustDo.map(q => `
                        <div class="question-item">
                            <div class="question-text">
                                ${q.title}
                                ${q.leetcode ? ` (LC #${q.leetcode})` : ''}
                            </div>
                            <p style="font-size: 13px; color: var(--text-secondary); margin: 8px 0;">${q.approach}</p>
                            <div class="question-meta">
                                <span class="tag priority-badge priority-${q.priority}">Priority ${q.priority}</span>
                                <span class="tag difficulty-${q.difficulty.toLowerCase()}">${q.difficulty}</span>
                                ${q.topics.map(t => `<span class="tag">${t}</span>`).join('')}
                                ${q.leetcode ? `<span class="tag leetcode-tag">LeetCode #${q.leetcode}</span>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="question-item mt-16">
                <div class="question-text">📚 Data Structure Focus Areas:</div>
                <ul class="task-list">
                    ${questions.dsaTechnical.dataStructureFocus.map(f => `<li>${f}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    // Java & Spring
    html += `
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Round 3: Core Java & Spring Boot (45-60 mins)</h2>
                <p class="card-subtitle">${questions.javaSpring.projectDiscussion}</p>
            </div>
            
            ${Object.entries(questions.javaSpring.categories).map(([key, cat]) => `
                <div class="question-category">
                    <div class="category-header" onclick="toggleCategory('java-${key}')">
                        <div class="category-title">
                            <span>${key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        </div>
                        <span class="priority-badge priority-${cat.priority}">Priority ${cat.priority}</span>
                    </div>
                    <div class="question-list" id="java-${key}">
                        ${cat.questions.map(q => `
                            <div class="question-item">
                                <div class="question-text">${q}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    // System Design
    html += `
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Round 4: System Design (30-40 mins)</h2>
            </div>
            
            <div class="question-category">
                <div class="category-header" onclick="toggleCategory('sd-questions')">
                    <div class="category-title">
                        <span>🏗️ Actual Questions Asked</span>
                    </div>
                    <span class="priority-badge priority-5">Critical</span>
                </div>
                <div class="question-list" id="sd-questions">
                    ${questions.systemDesign.actualQuestions.map(q => `
                        <div class="question-item">
                            <div class="question-text">${q.title}</div>
                            <p style="font-size: 13px; color: var(--text-secondary); margin: 8px 0;">
                                ${q.focus || ''}
                            </p>
                            <div class="question-meta">
                                <span class="tag priority-badge priority-${q.priority}">Priority ${q.priority}</span>
                                ${q.variants ? q.variants.map(v => `<span class="tag">${v}</span>`).join('') : ''}
                                ${q.topics ? q.topics.map(t => `<span class="tag">${t}</span>`).join('') : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="question-item mt-16">
                <div class="question-text">🎯 Key Topics to Master:</div>
                <ul class="task-list">
                    ${questions.systemDesign.keyTopics.map(t => `<li>${t}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    // Behavioral
    html += `
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Round 5: HR/Behavioral (30 mins)</h2>
            </div>
            
            ${questions.behavioral.mustPrepare.map(q => `
                <div class="question-item">
                    <div class="question-text">
                        ${q.question}
                        <span class="tag priority-badge priority-${q.priority}" style="margin-left: 10px;">Priority ${q.priority}</span>
                    </div>
                    ${q.format ? `<p style="font-size: 13px; color: var(--text-secondary); margin: 8px 0;"><strong>Format:</strong> ${q.format}</p>` : ''}
                    ${q.focus ? `<p style="font-size: 13px; color: var(--text-secondary); margin: 8px 0;"><strong>Focus:</strong> ${q.focus}</p>` : ''}
                    ${q.approach ? `<p style="font-size: 13px; color: var(--text-secondary); margin: 8px 0;"><strong>Approach:</strong> ${q.approach}</p>` : ''}
                    ${q.keyPoints ? `
                        <ul class="task-list" style="margin-top: 8px;">
                            ${q.keyPoints.map(p => `<li>${p}</li>`).join('')}
                        </ul>
                    ` : ''}
                    ${q.scenarios ? `
                        <ul class="task-list" style="margin-top: 8px;">
                            ${q.scenarios.map(s => `<li>${s}</li>`).join('')}
                        </ul>
                    ` : ''}
                    ${q.suggestions ? `
                        <ul class="task-list" style="margin-top: 8px;">
                            ${q.suggestions.map(s => `<li>${s}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
            `).join('')}
            
            <div class="question-item mt-16">
                <div class="question-text">🎯 BlackRock Core Values:</div>
                <ul class="task-list">
                    ${questions.behavioral.blackrockValues.map(v => `<li>${v}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    document.getElementById('content-wrapper').innerHTML = html;
}

// Toggle category visibility
function toggleCategory(categoryId) {
    const element = document.getElementById(categoryId);
    element.classList.toggle('active');
}

// Render Study Plan
function renderStudyPlan() {
    const { studyPlan } = interviewData;
    
    let html = `
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">📅 3-Week Study Plan</h2>
                <p class="card-subtitle">Structured preparation for maximum efficiency</p>
            </div>
        </div>
    `;
    
    Object.entries(studyPlan).forEach(([weekKey, week]) => {
        html += `
            <div class="week-section">
                <div class="week-header">
                    <div class="week-title">${weekKey.toUpperCase().replace('WEEK', 'Week ')}</div>
                    <div class="week-subtitle">${week.title}</div>
                </div>
                
                <div class="day-grid">
                    ${week.days.map(day => `
                        <div class="day-card">
                            <div class="day-number">${day.day}</div>
                            <h3 class="day-title">${day.title}</h3>
                            
                            ${day.morning ? `
                                <div class="task-section">
                                    <div class="task-label">Morning (2 hrs)</div>
                                    <ul class="task-list">
                                        ${day.morning.map(task => `<li>${task}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                            
                            ${day.afternoon ? `
                                <div class="task-section">
                                    <div class="task-label">Afternoon (2 hrs)</div>
                                    <ul class="task-list">
                                        ${day.afternoon.map(task => `<li>${task}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                            
                            ${day.evening ? `
                                <div class="task-section">
                                    <div class="task-label">Evening (2 hrs)</div>
                                    <ul class="task-list">
                                        ${day.evening.map(task => `<li>${task}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                            
                            ${day.tasks ? `
                                <div class="task-section">
                                    <div class="task-label">Tasks</div>
                                    <ul class="task-list">
                                        ${day.tasks.map(task => `<li>${task}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                            
                            ${day.problems ? `
                                <div class="task-section">
                                    <div class="task-label">Problems (4-5 today)</div>
                                    <ul class="task-list">
                                        ${day.problems.map(p => `<li>${p}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                            
                            ${day.topics ? `
                                <div class="task-section">
                                    <div class="task-label">Topics</div>
                                    <ul class="task-list">
                                        ${day.topics.map(t => `<li>${t}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                            
                            ${day.designs ? `
                                <div class="task-section">
                                    <div class="task-label">Design Practice</div>
                                    <ul class="task-list">
                                        ${day.designs.map(d => `<li>${d}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                            
                            ${day.preInterview ? `
                                <div class="task-section">
                                    <div class="task-label">Pre-Interview</div>
                                    <ul class="task-list">
                                        ${day.preInterview.map(t => `<li>${t}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                            
                            ${day.postInterview ? `
                                <div class="task-section">
                                    <div class="task-label">Post-Interview</div>
                                    <ul class="task-list">
                                        ${day.postInterview.map(t => `<li>${t}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    document.getElementById('content-wrapper').innerHTML = html;
}

// Render Resources
function renderResources() {
    const { resources } = interviewData;
    
    const html = `
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">📚 Learning Resources</h2>
                <p class="card-subtitle">Curated resources for comprehensive preparation</p>
            </div>
        </div>
        
        ${Object.entries(resources).map(([category, items]) => `
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">${category.toUpperCase()}</h2>
                </div>
                <div class="resource-grid">
                    ${items.map(resource => `
                        <div class="resource-card">
                            <div class="resource-name">${resource.name}</div>
                            ${resource.type ? `<span class="resource-type">${resource.type}</span>` : ''}
                            <div class="resource-focus">${resource.focus}</div>
                            ${resource.url ? `
                                <a href="${resource.url}" target="_blank" class="resource-link">
                                    Visit Resource →
                                </a>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('')}
    `;
    
    document.getElementById('content-wrapper').innerHTML = html;
}

// Render Job Search
function renderJobSearch() {
    const { jobSearch } = interviewData;
    
    const html = `
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">🔍 Job Search Strategy</h2>
                <p class="card-subtitle">Where to find and how to apply for BlackRock positions</p>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Primary Job Sites</h2>
            </div>
            <div class="resource-grid">
                ${jobSearch.primarySites.map(site => `
                    <div class="resource-card">
                        <div class="resource-name">${site.name}</div>
                        <span class="resource-type">Priority ${site.priority}</span>
                        <a href="${site.url}" target="_blank" class="resource-link">
                            Visit Site →
                        </a>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">🔑 Search Terms to Use</h2>
            </div>
            <div class="day-grid">
                ${jobSearch.searchTerms.map(term => `
                    <div class="question-item">
                        <div class="question-text">"${term}"</div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">💡 Application Tips</h2>
            </div>
            <ul class="task-list">
                <li>Apply within 24-48 hours of job posting for maximum visibility</li>
                <li>Customize your resume for each application highlighting relevant keywords</li>
                <li>Best time to apply: Tuesday-Thursday, 8-10 AM IST</li>
                <li>Set up job alerts on all platforms to get instant notifications</li>
                <li>Connect with BlackRock employees on LinkedIn before applying</li>
                <li>Request referrals from current employees (significantly increases chances)</li>
                <li>Follow BlackRock's LinkedIn page for updates and company news</li>
                <li>Prepare a tracking spreadsheet to monitor all applications</li>
            </ul>
        </div>
    `;
    
    document.getElementById('content-wrapper').innerHTML = html;
}

// Update progress bar
function updateProgressBar() {
    const totalItems = Object.keys(completedItems).length;
    const progress = Math.min((totalItems / 100) * 100, 100);
    
    document.getElementById('overall-progress').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `${Math.round(progress)}% Complete`;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadData);
