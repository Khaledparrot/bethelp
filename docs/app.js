// SafeBet Hub Application
class SafeBetHub {
    constructor() {
        this.currentPage = 'home';
        this.isLoggedIn = false;
        this.data = this.loadData();
        this.init();
    }

    init() {
        this.setupNavigation();
        this.loadPage('home');
        this.setupEventListeners();
    }

    setupNavigation() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');

        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Handle navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    const page = href.substring(1);
                    this.loadPage(page);
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    setupEventListeners() {
        // Handle form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.classList.contains('admin-form')) {
                e.preventDefault();
                this.handleAdminForm(e.target);
            }
        });

        // Handle admin navigation
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('admin-nav-btn')) {
                e.preventDefault();
                const section = e.target.dataset.section;
                this.showAdminSection(section);
            }
        });
    }

    loadPage(page) {
        this.currentPage = page;
        const mainContent = document.getElementById('mainContent');
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${page}`) {
                link.classList.add('active');
            }
        });

        // Load page content
        switch(page) {
            case 'home':
                this.loadHomePage();
                break;
            case 'platforms':
                this.loadPlatformsPage();
                break;
            case 'advice':
                this.loadAdvicePage();
                break;
            case 'about':
                this.loadAboutPage();
                break;
            case 'admin':
                this.loadAdminPage();
                break;
            default:
                this.loadHomePage();
        }
    }

    loadHomePage() {
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = `
            <section class="hero">
                <div class="container">
                    <h1>${this.data.homepage.heroTitle}</h1>
                    <p>${this.data.homepage.heroSubtitle}</p>
                    <div class="hero-buttons">
                        <a href="#platforms" class="btn">Explore Platforms</a>
                        <a href="#advice" class="btn btn-outline">Safe Gambling Tips</a>
                    </div>
                </div>
            </section>

            <section class="container mt-6">
                <h2 class="text-center mb-6">Why Choose SafeBet Hub?</h2>
                <div class="grid grid-4">
                    <div class="card">
                        <h3>🔒 Verified Platforms</h3>
                        <p>All platforms are thoroughly tested and verified for safety and fairness.</p>
                    </div>
                    <div class="card">
                        <h3>📊 Expert Reviews</h3>
                        <p>Professional reviews based on extensive testing and user feedback.</p>
                    </div>
                    <div class="card">
                        <h3>🎯 Responsible Gaming</h3>
                        <p>Promoting safe gambling practices and providing help resources.</p>
                    </div>
                    <div class="card">
                        <h3>🏆 Best Bonuses</h3>
                        <p>Finding the best bonuses and promotions from trusted platforms.</p>
                    </div>
                </div>
            </section>

            <section class="container mt-6">
                <h2 class="text-center mb-6">Featured Platforms</h2>
                <div class="grid grid-3">
                    ${this.data.platforms.slice(0, 3).map(platform => `
                        <div class="card platform-card">
                            <img src="${platform.logo}" alt="${platform.name}" class="platform-logo">
                            <h3 class="platform-name">${platform.name}</h3>
                            <div class="platform-rating">${'⭐'.repeat(platform.rating)}</div>
                            <ul class="platform-features">
                                ${platform.features.slice(0, 3).map(feature => `<li>✓ ${feature}</li>`).join('')}
                            </ul>
                            <a href="#platforms" class="btn">View Details</a>
                        </div>
                    `).join('')}
                </div>
            </section>

            <section class="container mt-6">
                <h2 class="text-center mb-6">Latest Updates</h2>
                <div class="grid grid-2">
                    <div class="card">
                        <h3>New Platform Added</h3>
                        <p>We've added a new verified platform to our directory. Check out the latest addition!</p>
                        <a href="#platforms" class="btn">View Platforms</a>
                    </div>
                    <div class="card">
                        <h3>Safety Tips Updated</h3>
                        <p>Our safe gambling guide has been updated with the latest best practices.</p>
                        <a href="#advice" class="btn">Read Tips</a>
                    </div>
                </div>
            </section>
        `;
    }

    loadPlatformsPage() {
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = `
            <section class="container">
                <h1 class="text-center mb-6">Online Gambling Platforms</h1>
                <p class="text-center mb-6">Discover the best and safest online gambling platforms</p>
                
                <div class="grid grid-4">
                    ${this.data.platforms.map(platform => `
                        <div class="card platform-card">
                            <img src="${platform.logo}" alt="${platform.name}" class="platform-logo">
                            <h3 class="platform-name">${platform.name}</h3>
                            <div class="platform-rating">${'⭐'.repeat(platform.rating)}</div>
                            <p class="mb-4">${platform.description}</p>
                            <ul class="platform-features">
                                ${platform.features.map(feature => `<li>✓ ${feature}</li>`).join('')}
                            </ul>
                            <div class="mt-4">
                                <span class="badge ${platform.license === 'Yes' ? 'badge-success' : 'badge-warning'}">
                                    ${platform.license === 'Yes' ? 'Licensed' : 'Unlicensed'}
                                </span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    }

    loadAdvicePage() {
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = `
            <section class="container">
                <h1 class="text-center mb-6">Safe Gambling Advice</h1>
                <p class="text-center mb-6">Essential tips for responsible and safe gambling</p>
                
                <div class="grid grid-2">
                    <div class="card">
                        <h2>🛡️ Safety Tips</h2>
                        <ul>
                            ${this.data.advice.safetyTips.map(tip => `<li>${tip}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="card">
                        <h2>⚠️ Warning Signs</h2>
                        <ul>
                            ${this.data.advice.warningSigns.map(sign => `<li>${sign}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <div class="card mt-6">
                    <h2 class="text-center mb-4">Self-Assessment Test</h2>
                    <p class="text-center mb-4">Answer these questions honestly to assess your gambling habits</p>
                    <div class="assessment-test">
                        ${this.data.advice.selfAssessment.map((question, index) => `
                            <div class="form-group">
                                <label class="form-label">${index + 1}. ${question}</label>
                                <div class="radio-group">
                                    <label><input type="radio" name="q${index}" value="yes"> Yes</label>
                                    <label><input type="radio" name="q${index}" value="no"> No</label>
                                </div>
                            </div>
                        `).join('')}
                        <button class="btn" onclick="app.showAssessmentResults()">Get Results</button>
                    </div>
                </div>

                <div class="card mt-6">
                    <h2 class="text-center mb-4">Help Resources</h2>
                    <div class="grid grid-2">
                        <div>
                            <h3>Hotlines</h3>
                            <ul>
                                ${this.data.advice.helpResources.hotlines.map(hotline => `<li>${hotline}</li>`).join('')}
                            </ul>
                        </div>
                        <div>
                            <h3>Websites</h3>
                            <ul>
                                ${this.data.advice.helpResources.websites.map(website => `<li><a href="${website.url}" target="_blank">${website.name}</a></li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    loadAboutPage() {
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = `
            <section class="container">
                <h1 class="text-center mb-6">About SafeBet Hub</h1>
                
                <div class="card">
                    <h2>Our Mission</h2>
                    <p>${this.data.about.mission}</p>
                </div>

                <div class="card mt-6">
                    <h2>Our Team</h2>
                    <div class="grid grid-3">
                        ${this.data.about.team.map(member => `
                            <div class="text-center">
                                <div class="team-avatar">
                                    <div class="avatar-placeholder">${member.name.split(' ').map(n => n[0]).join('')}</div>
                                </div>
                                <h3>${member.name}</h3>
                                <p>${member.role}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="card mt-6">
                    <h2>Our Methodology</h2>
                    <p>${this.data.about.methodology}</p>
                </div>

                <div class="card mt-6">
                    <h2>Contact Us</h2>
                    <p>Email: ${this.data.about.contact.email}</p>
                    <p>Phone: ${this.data.about.contact.phone}</p>
                </div>
            </section>
        `;
    }

    loadAdminPage() {
        if (!this.isLoggedIn) {
            this.showAdminLogin();
            return;
        }

        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = `
            <div class="admin-container">
                <div class="admin-header">
                    <h1>Admin Panel</h1>
                    <p>Manage your SafeBet Hub content</p>
                    <button class="btn btn-secondary" onclick="app.logout()">Logout</button>
                </div>

                <div class="admin-nav">
                    <button class="admin-nav-btn active" data-section="platforms">Platforms</button>
                    <button class="admin-nav-btn" data-section="homepage">Homepage</button>
                    <button class="admin-nav-btn" data-section="advice">Advice</button>
                    <button class="admin-nav-btn" data-section="about">About</button>
                    <button class="admin-nav-btn" data-section="export">Export/Import</button>
                </div>

                <div id="admin-platforms" class="admin-section active">
                    <h2>Manage Platforms</h2>
                    <div id="platforms-list"></div>
                    <button class="btn" onclick="app.addPlatform()">Add New Platform</button>
                </div>

                <div id="admin-homepage" class="admin-section">
                    <h2>Edit Homepage</h2>
                    <form class="admin-form" data-section="homepage">
                        <div class="form-group">
                            <label class="form-label">Hero Title</label>
                            <input type="text" class="form-input" name="heroTitle" value="${this.data.homepage.heroTitle}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Hero Subtitle</label>
                            <input type="text" class="form-input" name="heroSubtitle" value="${this.data.homepage.heroSubtitle}">
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn">Save Changes</button>
                        </div>
                    </form>
                </div>

                <div id="admin-advice" class="admin-section">
                    <h2>Edit Safe Gambling Advice</h2>
                    <form class="admin-form" data-section="advice">
                        <div class="form-group">
                            <label class="form-label">Safety Tips (one per line)</label>
                            <textarea class="form-textarea" name="safetyTips">${this.data.advice.safetyTips.join('\\n')}</textarea>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn">Save Changes</button>
                        </div>
                    </form>
                </div>

                <div id="admin-about" class="admin-section">
                    <h2>Edit About Page</h2>
                    <form class="admin-form" data-section="about">
                        <div class="form-group">
                            <label class="form-label">Mission</label>
                            <textarea class="form-textarea" name="mission">${this.data.about.mission}</textarea>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Methodology</label>
                            <textarea class="form-textarea" name="methodology">${this.data.about.methodology}</textarea>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn">Save Changes</button>
                        </div>
                    </form>
                </div>

                <div id="admin-export" class="admin-section">
                    <h2>Export/Import Data</h2>
                    <div class="card">
                        <h3>Export Data</h3>
                        <p>Download all your website data as a JSON file</p>
                        <button class="btn" onclick="app.exportData()">Export Data</button>
                    </div>
                    <div class="card mt-4">
                        <h3>Import Data</h3>
                        <p>Upload a JSON file to restore your website data</p>
                        <input type="file" id="import-file" accept=".json" class="form-input">
                        <button class="btn mt-2" onclick="app.importData()">Import Data</button>
                    </div>
                </div>
            </div>
        `;

        this.loadPlatformsList();
    }

    showAdminLogin() {
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = `
            <div class="admin-container">
                <div class="card">
                    <h2 class="text-center mb-6">Admin Login</h2>
                    <form id="adminLoginForm">
                        <div class="form-group">
                            <label class="form-label">Password</label>
                            <input type="password" class="form-input" id="adminPassword" required>
                        </div>
                        <button type="submit" class="btn">Login</button>
                    </form>
                </div>
            </div>
        `;

        document.getElementById('adminLoginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('adminPassword').value;
            if (password === 'admin123') {
                this.isLoggedIn = true;
                this.loadAdminPage();
            } else {
                alert('Incorrect password');
            }
        });
    }

    showAdminSection(section) {
        document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.admin-nav-btn').forEach(b => b.classList.remove('active'));
        
        document.getElementById(`admin-${section}`).classList.add('active');
        document.querySelector(`[data-section="${section}"]`).classList.add('active');
    }

    loadPlatformsList() {
        const platformsList = document.getElementById('platforms-list');
        if (!platformsList) return;

        platformsList.innerHTML = this.data.platforms.map((platform, index) => `
            <div class="card mb-4">
                <div class="platform-edit">
                    <h3>${platform.name}</h3>
                    <div class="form-actions">
                        <button class="btn btn-secondary" onclick="app.editPlatform(${index})">Edit</button>
                        <button class="btn btn-danger" onclick="app.deletePlatform(${index})">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    handleAdminForm(form) {
        const section = form.dataset.section;
        const formData = new FormData(form);
        
        switch(section) {
            case 'homepage':
                this.data.homepage.heroTitle = formData.get('heroTitle');
                this.data.homepage.heroSubtitle = formData.get('heroSubtitle');
                break;
            case 'advice':
                this.data.advice.safetyTips = formData.get('safetyTips').split('\\n').filter(tip => tip.trim());
                break;
            case 'about':
                this.data.about.mission = formData.get('mission');
                this.data.about.methodology = formData.get('methodology');
                break;
        }
        
        this.saveData();
        this.showAlert('Changes saved successfully!', 'success');
    }

    addPlatform() {
        const name = prompt('Platform name:');
        if (!name) return;

        const newPlatform = {
            name: name,
            logo: 'images/platform-placeholder.png',
            rating: 4,
            description: 'New platform description',
            features: ['Feature 1', 'Feature 2'],
            license: 'Yes'
        };

        this.data.platforms.push(newPlatform);
        this.saveData();
        this.loadPlatformsList();
        this.showAlert('Platform added successfully!', 'success');
    }

    editPlatform(index) {
        const platform = this.data.platforms[index];
        const newName = prompt('Platform name:', platform.name);
        if (!newName) return;

        platform.name = newName;
        this.saveData();
        this.loadPlatformsList();
        this.showAlert('Platform updated successfully!', 'success');
    }

    deletePlatform(index) {
        if (!confirm('Are you sure you want to delete this platform?')) return;

        this.data.platforms.splice(index, 1);
        this.saveData();
        this.loadPlatformsList();
        this.showAlert('Platform deleted successfully!', 'success');
    }

    exportData() {
        const dataStr = JSON.stringify(this.data, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'safebet-hub-data.json';
        link.click();
        URL.revokeObjectURL(url);
    }

    importData() {
        const fileInput = document.getElementById('import-file');
        const file = fileInput.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                this.data = importedData;
                this.saveData();
                this.showAlert('Data imported successfully!', 'success');
                setTimeout(() => this.loadAdminPage(), 1000);
            } catch (error) {
                this.showAlert('Error importing data. Please check the file format.', 'error');
            }
        };
        reader.readAsText(file);
    }

    logout() {
        this.isLoggedIn = false;
        this.loadPage('home');
    }

    showAlert(message, type = 'success') {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        alert.style.position = 'fixed';
        alert.style.top = '20px';
        alert.style.right = '20px';
        alert.style.zIndex = '1000';
        alert.style.maxWidth = '300px';
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }

    showAssessmentResults() {
        const questions = this.data.advice.selfAssessment;
        let yesCount = 0;
        
        for (let i = 0; i < questions.length; i++) {
            const yesRadio = document.querySelector(`input[name="q${i}"][value="yes"]`);
            if (yesRadio && yesRadio.checked) {
                yesCount++;
            }
        }
        
        let message = '';
        if (yesCount === 0) {
            message = 'Great! You seem to have healthy gambling habits.';
        } else if (yesCount <= 2) {
            message = 'You might want to monitor your gambling habits more closely.';
        } else {
            message = 'Please consider seeking help from our resources below.';
        }
        
        alert(`Assessment Results: ${message}`);
    }

    loadData() {
        const defaultData = {
            homepage: {
                heroTitle: "Welcome to SafeBet Hub",
                heroSubtitle: "Your trusted guide to safe online gambling"
            },
            platforms: [
                {
                    name: "BetSafe Casino",
                    logo: "images/platform1.png",
                    rating: 5,
                    description: "Top-rated casino with excellent security and fair play",
                    features: ["100% Bonus up to $1000", "24/7 Support", "Fast Withdrawals", "Live Casino"],
                    license: "Yes"
                },
                {
                    name: "SecureBet Sports",
                    logo: "images/platform2.png",
                    rating: 4,
                    description: "Comprehensive sportsbook with competitive odds",
                    features: ["Wide range of sports", "Live betting", "Mobile app", "VIP program"],
                    license: "Yes"
                },
                {
                    name: "LuckySlots Pro",
                    logo: "images/platform3.png",
                    rating: 4,
                    description: "Premium slot gaming experience with huge jackpots",
                    features: ["1000+ Slot games", "Progressive jackpots", "Free spins", "Tournaments"],
                    license: "Yes"
                }
            ],
            advice: {
                safetyTips: [
                    "Set a budget and stick to it",
                    "Never gamble with money you can't afford to lose",
                    "Take regular breaks",
                    "Don't chase losses",
                    "Understand the games you play"
                ],
                warningSigns: [
                    "Gambling more than you can afford",
                    "Lying about gambling habits",
                    "Borrowing money to gamble",
                    "Neglecting responsibilities",
                    "Feeling anxious about gambling"
                ],
                selfAssessment: [
                    "Do you gamble more than you can afford?",
                    "Do you need to gamble with larger amounts to get the same excitement?",
                    "Have you tried to cut back on gambling without success?",
                    "Do you feel restless or irritable when trying to stop gambling?",
                    "Do you gamble to escape problems or relieve feelings of helplessness?"
                ],
                helpResources: {
                    hotlines: [
                        "National Gambling Helpline: 1-800-522-4700",
                        "Gamblers Anonymous: 1-213-386-8789"
                    ],
                    websites: [
                        {name: "National Council on Problem Gambling", url: "https://www.ncpgambling.org"},
                        {name: "Gamblers Anonymous", url: "https://www.gamblersanonymous.org"}
                    ]
                }
            },
            about: {
                mission: "Our mission is to provide accurate, unbiased information about online gambling platforms to help users make informed decisions and gamble responsibly.",
                team: [
                    {name: "John Smith", role: "Lead Reviewer"},
                    {name: "Sarah Johnson", role: "Safety Expert"},
                    {name: "Mike Davis", role: "Industry Analyst"}
                ],
                methodology: "We test each platform thoroughly, evaluating security, game variety, bonuses, customer support, and payment options to provide comprehensive reviews.",
                contact: {
                    email: "info@safebet-hub.com",
                    phone: "1-800-SAFEBET"
                }
            }
        };

        const savedData = localStorage.getItem('safebetHubData');
        return savedData ? JSON.parse(savedData) : defaultData;
    }

    saveData() {
        localStorage.setItem('safebetHubData', JSON.stringify(this.data));
    }
}

// Initialize the application
const app = new SafeBetHub();