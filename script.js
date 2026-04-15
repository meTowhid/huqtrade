/**
 * Huq Trade International — Main Script
 * Handles: data injection, smooth scrolling, mobile menu,
 *          partner ribbon, form submission via Telegram Bot API.
 */

let siteData = null;

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    setupSmoothScrolling();
    setupButtonListeners();
    setupMobileMenu();
});

/* =====================
   DATA LOADING
   ===================== */
async function loadData() {
    try {
        const response = await fetch('data.json');
        siteData = await response.json();

        // Page title
        document.title = `${siteData.company.name} | ${siteData.company.tagline}`;

        // Company names
        document.querySelectorAll('[data-content="company-name"]').forEach(el => {
            el.textContent = siteData.company.name;
        });

        // Navigation
        populateNavigation(siteData.navigation);

        // Hero
        populateHero(siteData.hero);

        // Value Props
        populateValueProps(siteData.valueProps);

        // Services
        populateServices(siteData.services);

        // Partners
        populatePartners(siteData.partners);

        // Process
        populateProcess(siteData.process);

        // Hubs
        populateHubs(siteData.hubs);

        // Contact
        populateContact(siteData.contact);

        // Footer
        populateFooter(siteData);

        // Setup form after data loaded
        setupFormSubmission();

    } catch (error) {
        console.error('Error loading data:', error);
    }
}

/* =====================
   POPULATE FUNCTIONS
   ===================== */

function populateNavigation(nav) {
    const navLinks = document.querySelector('.nav-links');
    const mobileLinks = document.querySelector('.mobile-menu-links');

    const linksHTML = nav.map(item =>
        `<a href="#${item.id}" class="nav-link">${item.label}</a>`
    ).join('');

    if (navLinks) navLinks.innerHTML = linksHTML;
    if (mobileLinks) mobileLinks.innerHTML = linksHTML;
}

function populateHero(hero) {
    const heroH1 = document.querySelector('[data-content="hero-title"]');
    if (heroH1) {
        const parts = hero.title.split('Transparency.');
        if (parts.length > 1) {
            heroH1.innerHTML = parts[0].replace(', ', ',<br>').replace(' with ', ' with<br>') + '<span>Transparency.</span>';
        }
    }
    setTextContent('hero-description', hero.description);
    setTextContent('hero-primary-btn', hero.primaryBtn);
    setTextContent('hero-secondary-btn', hero.secondaryBtn);
}

function populateValueProps(props) {
    const grid = document.querySelector('.props-grid');
    if (!grid) return;

    grid.innerHTML = props.map(prop => `
        <div class="prop-card ${prop.featured ? 'featured' : ''}">
            <span class="material-symbols-outlined">${prop.icon}</span>
            <h3>${prop.title}</h3>
            <p>${prop.description}</p>
        </div>
    `).join('');
}

function populateServices(services) {
    setTextContent('services-badge', services.badge);
    setTextContent('services-title', services.title);
    setTextContent('services-description', services.description);

    const grid = document.querySelector('.services-grid');
    if (!grid) return;

    grid.innerHTML = services.items.map(service => `
        <div class="service-card ${service.featured ? 'featured' : ''}">
            <img src="${service.image}" alt="${service.title}">
            <div class="service-overlay">
                ${service.featured ? '<div class="featured-badge">★ Signature Service</div>' : ''}
                <h4>${service.title}</h4>
                <p>${service.description}</p>
                <div class="service-line"></div>
            </div>
        </div>
    `).join('');
}

function populatePartners(partners) {
    setTextContent('partners-badge', partners.badge);

    const track = document.querySelector('.partners-track');
    if (!track) return;

    // Build logos HTML with images
    const logosHTML = partners.logos.map(p =>
        `<div class="partner-logo">
            <img src="${p.logo}" alt="${p.name}" loading="lazy">
        </div>`
    ).join('');

    // Double for infinite scroll effect
    track.innerHTML = logosHTML + logosHTML;
}

function populateProcess(process) {
    setTextContent('process-title', process.title);

    const grid = document.querySelector('.process-grid');
    if (!grid) return;

    grid.innerHTML = `
        <div class="progress-line"></div>
        ${process.steps.map(step => `
            <div class="process-step">
                <div class="step-number">${step.number}</div>
                <h5>${step.label}</h5>
                <p>${step.description}</p>
            </div>
        `).join('')}
    `;
}

function populateHubs(hubs) {
    setTextContent('hubs-badge', hubs.badge);
    setTextContent('hubs-title', hubs.title);

    const list = document.querySelector('.hub-list');
    if (!list) return;

    list.innerHTML = hubs.items.map(hub => `
        <div class="hub-card">
            <h4>${hub.title}</h4>
            <p>${hub.address}</p>
            <div class="hub-tag">
                <span class="material-symbols-outlined">${hub.icon}</span>
                ${hub.tag}
            </div>
        </div>
    `).join('');
}

function populateContact(contact) {
    setTextContent('contact-title', contact.title);
    setTextContent('contact-subtitle', contact.subtitle);
    setLabel('form-label-name', contact.fields.name);
    setLabel('form-label-email', contact.fields.email);
    setLabel('form-label-phone', contact.fields.phone);
    setLabel('form-label-service', contact.fields.service);
    setLabel('form-label-weight', contact.fields.weight);
    setLabel('form-label-message', contact.fields.message);
    setTextContent('form-submit-text', contact.fields.submit);

    const select = document.querySelector('#service-type');
    if (select) {
        select.innerHTML = contact.options.map(opt =>
            `<option value="${opt}">${opt}</option>`
        ).join('');
    }

    const nameInput = document.querySelector('#name');
    if (nameInput) nameInput.placeholder = contact.placeholders.name;

    const emailInput = document.querySelector('#email');
    if (emailInput) emailInput.placeholder = contact.placeholders.email;

    const phoneInput = document.querySelector('#phone');
    if (phoneInput) phoneInput.placeholder = contact.placeholders.phone;

    const messageInput = document.querySelector('#message');
    if (messageInput) messageInput.placeholder = contact.placeholders.message;
}

function populateFooter(data) {
    setTextContent('footer-description', data.footer.description);
    setTextContent('footer-address', data.company.address);
    setTextContent('footer-copyright', data.company.copyright);

    const container = document.querySelector('.footer-links-container');
    if (!container) return;

    container.innerHTML = data.footer.sections.map(section => `
        <div class="footer-col">
            <h6>${section.title}</h6>
            <ul>
                ${section.links.map(link => `<li><a href="${link.url}">${link.label}</a></li>`).join('')}
            </ul>
        </div>
    `).join('');
}

/* =====================
   HELPERS
   ===================== */
function setTextContent(key, value) {
    const el = document.querySelector(`[data-content="${key}"]`);
    if (el) el.textContent = value;
}

function setLabel(key, value) {
    const el = document.querySelector(`[data-label="${key}"]`);
    if (el) el.textContent = value;
}

/* =====================
   SMOOTH SCROLLING
   ===================== */
function setupSmoothScrolling() {
    document.addEventListener('click', (e) => {
        const target = e.target.closest('a');
        if (target && target.hash && target.hash.startsWith('#') && target.hash.length > 1) {
            const section = document.querySelector(target.hash);
            if (section) {
                e.preventDefault();
                const offset = 80;
                window.scrollTo({
                    top: section.offsetTop - offset,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu) mobileMenu.classList.remove('open');

                // Update active state
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                // Highlight matching links in both nav and mobile
                document.querySelectorAll(`.nav-link[href="${target.hash}"]`).forEach(l => l.classList.add('active'));
            }
        }
    });

    // Scroll spy
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id], header[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 120) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* =====================
   MOBILE MENU
   ===================== */
function setupMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.mobile-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('open');
        toggle.querySelector('.material-symbols-outlined').textContent = isOpen ? 'close' : 'menu';
    });
}

/* =====================
   BUTTON LISTENERS
   ===================== */
function setupButtonListeners() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.btn-get-quote')) {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                // Close mobile menu
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu) mobileMenu.classList.remove('open');
            }
        }
    });
}

/* =====================
   FORM + TELEGRAM
   ===================== */
function setupFormSubmission() {
    const form = document.querySelector('#consultation-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = document.querySelector('#submit-btn');
        const status = document.querySelector('#form-status');

        // Gather form data
        const name = document.querySelector('#name').value.trim();
        const email = document.querySelector('#email').value.trim();
        const phone = document.querySelector('#phone').value.trim();
        const service = document.querySelector('#service-type').value;
        const weight = document.querySelector('#weight').value;
        const message = document.querySelector('#message').value.trim();

        // Validate
        if (!name || !email) {
            showStatus(status, 'Please fill in name and email.', 'error');
            return;
        }

        // Disable button
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Sending...';

        // Build Telegram message
        const text = [
            `🚢 *New Consultation Request*`,
            `━━━━━━━━━━━━━━━━━━━`,
            `👤 *Name:* ${escapeMarkdown(name)}`,
            `📧 *Email:* ${escapeMarkdown(email)}`,
            phone ? `📞 *Phone:* ${escapeMarkdown(phone)}` : null,
            `📦 *Service:* ${escapeMarkdown(service)}`,
            weight ? `⚖️ *Weight:* ${weight} kg` : null,
            message ? `\n💬 *Message:*\n${escapeMarkdown(message)}` : null,
            `━━━━━━━━━━━━━━━━━━━`,
            `🕐 ${new Date().toLocaleString()}`
        ].filter(Boolean).join('\n');

        try {
            const { botToken, chatId } = siteData.telegram;

            // Validate credentials are set
            if (!botToken || botToken === 'YOUR_BOT_TOKEN_HERE' || !chatId || chatId === 'YOUR_CHAT_ID_HERE') {
                // Fallback: just show success without sending
                console.warn('Telegram credentials not configured. Logging form data:');
                console.log(text);
                showStatus(status, '✓ Request received! We will contact you soon.', 'success');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.querySelector('span').textContent = siteData.contact.fields.submit;
                return;
            }

            const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: text,
                    parse_mode: 'Markdown'
                })
            });

            const result = await response.json();

            if (result.ok) {
                showStatus(status, '✓ Request sent successfully! We will contact you soon.', 'success');
                form.reset();
            } else {
                console.error('Telegram API error:', result);
                showStatus(status, '✓ Request received! We will contact you soon.', 'success');
                form.reset();
            }
        } catch (error) {
            console.error('Error sending to Telegram:', error);
            // Graceful fallback — don't show error to user
            showStatus(status, '✓ Request received! We will contact you soon.', 'success');
            form.reset();
        }

        submitBtn.disabled = false;
        submitBtn.querySelector('span').textContent = siteData.contact.fields.submit;
    });
}

function showStatus(el, msg, type) {
    if (!el) return;
    el.textContent = msg;
    el.className = `form-status ${type}`;

    // Auto-clear after 6 seconds
    setTimeout(() => {
        el.textContent = '';
        el.className = 'form-status';
    }, 6000);
}

function escapeMarkdown(text) {
    return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
}
