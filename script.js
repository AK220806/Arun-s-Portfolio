// ======================
// PORTFOLIO JAVASCRIPT WITH DUAL EMAIL SYSTEM
// ======================

console.log('🚀 Portfolio script loading...');
console.log('📧 EmailJS loaded:', typeof emailjs !== 'undefined' ? '✅ Yes' : '❌ No');

// ======================
// EMAILJS CONFIGURATION - DUAL TEMPLATES
// ======================
const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_ytc3fjl',           // Your EmailJS Service ID
    TEMPLATE_TO_ME: 'template_03qdmuj',       // Template 1: Message to YOU (replace with actual ID)
    TEMPLATE_AUTO_REPLY: 'template_8ykpjhd',  // Template 2: Auto-reply to VISITOR (replace with actual ID)
    USER_ID: 'NkNU_yvbh0b4vgRcD'             // Your Public Key
};

// ======================
// MOBILE MENU TOGGLE
// ======================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// ======================
// BACK TO TOP BUTTON
// ======================
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ======================
// ALERT NOTIFICATION SYSTEM
// ======================
function showAlert(message, type = 'info', duration = 5000) {
    // Remove existing alert
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) existingAlert.remove();
    
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `custom-alert alert-${type}`;
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';
    if (type === 'warning') icon = '⚠️';
    
    alertDiv.innerHTML = `
        <div class="alert-content">
            <span class="alert-icon">${icon}</span>
            <span class="alert-message">${message}</span>
            <button class="alert-close">&times;</button>
        </div>
    `;
    
    // Style the alert
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;
    
    alertDiv.querySelector('.alert-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    // Close button style
    const closeBtn = alertDiv.querySelector('.alert-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.2s;
    `;
    
    closeBtn.addEventListener('click', () => {
        alertDiv.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => alertDiv.remove(), 300);
    });
    
    // Auto remove after duration
    setTimeout(() => {
        if (alertDiv.parentElement) {
            alertDiv.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => alertDiv.remove(), 300);
        }
    }, duration);
    
    document.body.appendChild(alertDiv);
}

// ======================
// DUAL EMAIL SYSTEM - CONTACT FORM HANDLER
// ======================
function setupContactForm() {
    console.log('📧 Setting up DUAL email contact form...');
    
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        console.warn('Contact form not found');
        return;
    }
    
    // Remove any existing attributes
    contactForm.removeAttribute('action');
    contactForm.removeAttribute('method');
    contactForm.removeAttribute('target');
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('📝 Form submitted - Sending dual emails...');
        
        // Get form values
        const from_name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        console.log('Form data:', { from_name, email, subject, message });
        
        // Validation
        if (!from_name || !email || !subject || !message) {
            showAlert('❌ Please fill all fields', 'error', 3000);
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert('❌ Please enter a valid email address', 'error', 3000);
            return;
        }
        
        // Get submit button
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Show sending notification
        showAlert('📨 Sending your message...', 'info', 2000);
        
        try {
            // Prepare parameters for both emails
            const params = {
                from_name: from_name,
                email: email,
                subject: subject,
                message: message,
                reply_to: email,
                date: new Date().toLocaleDateString('en-IN'),
                time: new Date().toLocaleTimeString('en-IN')
            };
            
            console.log('📤 Email parameters:', params);
            
            // ============================================
            // 1. FIRST: Send message TO YOU (Arun)
            // ============================================
            console.log('📧 Step 1: Sending message to Arun...');
            showAlert('📧 Sending message to Arun...', 'info', 1500);
            
            const responseToMe = await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_TO_ME,
                params
            );
            
            console.log('✅ Message sent to Arun:', responseToMe);
            
            // ============================================
            // 2. SECOND: Send auto-reply TO VISITOR
            // ============================================
            console.log('📧 Step 2: Sending auto-reply to visitor...');
            showAlert('📧 Sending confirmation to you...', 'info', 1500);
            
            const responseToVisitor = await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_AUTO_REPLY,
                params
            );
            
            console.log('✅ Auto-reply sent to visitor:', responseToVisitor);
            
            // ============================================
            // SUCCESS - Both emails sent
            // ============================================
            console.log('🎉 Both emails sent successfully!');
            showAlert('✅ Message sent! Check your email for confirmation.', 'success', 5000);
            
            // Reset form
            contactForm.reset();
            
        } catch (error) {
            console.error('❌ EmailJS error:', error);
            
            // Show detailed error
            let errorMessage = 'Failed to send message. ';
            
            if (error.text) {
                errorMessage += error.text;
            } else if (error.message) {
                errorMessage += error.message;
            }
            
            showAlert(`❌ ${errorMessage}`, 'error', 5000);
            
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        }
    });
    
    console.log('✅ Dual email contact form ready');
}

// ======================
// SMOOTH SCROLLING
// ======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ======================
// SCROLL ANIMATIONS
// ======================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, { threshold: 0.1 });

// Observe elements to animate
document.querySelectorAll('.project-card, .skill-category, .summary-card').forEach(el => {
    if (el) observer.observe(el);
});

// ======================
// PAGE INITIALIZATION
// ======================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM fully loaded');
    
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.USER_ID);
        console.log('📧 EmailJS initialized with User ID:', EMAILJS_CONFIG.USER_ID);
        console.log('🔄 Service ID:', EMAILJS_CONFIG.SERVICE_ID);
        console.log('📨 Template to Me:', EMAILJS_CONFIG.TEMPLATE_TO_ME);
        console.log('📩 Template Auto-reply:', EMAILJS_CONFIG.TEMPLATE_AUTO_REPLY);
    } else {
        console.error('❌ EmailJS not loaded! Make sure to include the EmailJS SDK in your HTML');
        showAlert('❌ Email service not loaded. Please refresh the page.', 'error', 5000);
    }
    
    // Initialize all components
    setupContactForm();
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
            opacity: 0;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Project card animation delays */
        .project-card:nth-child(1) { animation-delay: 0.1s; }
        .project-card:nth-child(2) { animation-delay: 0.2s; }
        .project-card:nth-child(3) { animation-delay: 0.3s; }
        .project-card:nth-child(4) { animation-delay: 0.4s; }
        
        /* Skill category animation delays */
        .skill-category:nth-child(1) { animation-delay: 0.1s; }
        .skill-category:nth-child(2) { animation-delay: 0.2s; }
        .skill-category:nth-child(3) { animation-delay: 0.3s; }
        
        /* Summary card animation delays */
        .summary-card:nth-child(1) { animation-delay: 0.1s; }
        .summary-card:nth-child(2) { animation-delay: 0.2s; }
        .summary-card:nth-child(3) { animation-delay: 0.3s; }
        .summary-card:nth-child(4) { animation-delay: 0.4s; }
        
        /* Loading spinner animation */
        .fa-spinner {
            animation: spin 1s linear infinite;
            margin-right: 8px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* Back to top button */
        .back-to-top {
            transition: all 0.3s ease;
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        /* Alert animations */
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        /* Form button loading state */
        button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
        
        /* Mobile menu styles */
        .nav-links.active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            padding: 20px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .menu-toggle {
            display: none;
        }
        
        @media (max-width: 768px) {
            .menu-toggle {
                display: block;
            }
            .nav-links {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('🎉 Portfolio fully initialized with DUAL email system!');
});

// ======================
// TEST FUNCTIONS
// ======================

// Test EmailJS connection
window.testEmailJS = function() {
    console.log('🧪 Testing EmailJS connection...');
    
    if (typeof emailjs === 'undefined') {
        showAlert('❌ EmailJS not loaded', 'error');
        return;
    }
    
    // Check if credentials are set
    if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.USER_ID) {
        showAlert('⚠️ EmailJS credentials not properly configured', 'warning', 5000);
        console.error('EmailJS credentials missing:', EMAILJS_CONFIG);
        return;
    }
    
    showAlert('🧪 Testing EmailJS connection...', 'info', 2000);
    
    // Test with minimal parameters
    const testParams = {
        from_name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Email from Portfolio',
        message: 'This is a test message to verify EmailJS is working correctly.',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    };
    
    console.log('🧪 Test params:', testParams);
    
    // Send test email (just one to check connection)
    emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_TO_ME || EMAILJS_CONFIG.TEMPLATE_AUTO_REPLY,
        testParams
    )
    .then(response => {
        console.log('✅ EmailJS test successful:', response);
        showAlert('✅ Test email sent successfully!', 'success', 5000);
    })
    .catch(error => {
        console.error('❌ EmailJS test failed:', error);
        let errorMsg = 'Test failed: ' + (error.text || error.message);
        showAlert(errorMsg, 'error', 5000);
    });
};

// Test DUAL email system
window.testDualEmails = function() {
    console.log('🧪 Testing DUAL email system...');
    
    if (typeof emailjs === 'undefined') {
        showAlert('❌ EmailJS not loaded', 'error');
        return;
    }
    
    showAlert('🧪 Testing dual email system...', 'info', 3000);
    
    const testParams = {
        from_name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Dual Email System',
        message: 'Testing if both emails are sent correctly.',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    };
    
    // Test Template 1 (To Arun)
    console.log('📧 Step 1: Testing email to Arun...');
    emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_TO_ME,
        testParams
    )
    .then(response1 => {
        console.log('✅ Email to Arun sent:', response1);
        
        // Test Template 2 (Auto-reply to Visitor)
        console.log('📧 Step 2: Testing auto-reply to visitor...');
        return emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_AUTO_REPLY,
            testParams
        );
    })
    .then(response2 => {
        console.log('✅ Auto-reply sent:', response2);
        showAlert('✅ DUAL email system working! Both emails sent.', 'success', 5000);
    })
    .catch(error => {
        console.error('❌ Dual email test failed:', error);
        showAlert('❌ Test failed: ' + (error.text || error.message), 'error', 5000);
    });
};

// Test form with sample data
window.testPortfolio = function() {
    console.log('=== PORTFOLIO TEST ===');
    console.log('1. Contact form:', document.getElementById('contactForm') ? '✅ Found' : '❌ Missing');
    console.log('2. EmailJS loaded:', typeof emailjs !== 'undefined' ? '✅ Yes' : '❌ No');
    console.log('3. Service ID:', EMAILJS_CONFIG.SERVICE_ID);
    console.log('4. Template to Me:', EMAILJS_CONFIG.TEMPLATE_TO_ME);
    console.log('5. Template Auto-reply:', EMAILJS_CONFIG.TEMPLATE_AUTO_REPLY);
    console.log('6. User ID:', EMAILJS_CONFIG.USER_ID);
    console.log('=== TEST COMPLETE ===');
    
    // Auto-fill test data
    const form = document.getElementById('contactForm');
    if (form) {
        form.querySelector('#name').value = 'Test User';
        form.querySelector('#email').value = 'test@example.com';
        form.querySelector('#subject').value = 'Test Dual Email System';
        form.querySelector('#message').value = 'This is testing the dual email system where Arun gets my message and I get an auto-reply.';
        
        showAlert('✅ Test data filled! Click "Send Message" to test.', 'success', 5000);
    }
};

// Check EmailJS templates
window.checkTemplates = function() {
    console.log('🔍 Checking EmailJS templates...');
    console.log('Service ID:', EMAILJS_CONFIG.SERVICE_ID);
    console.log('Template 1 (To Arun):', EMAILJS_CONFIG.TEMPLATE_TO_ME);
    console.log('Template 2 (Auto-reply):', EMAILJS_CONFIG.TEMPLATE_AUTO_REPLY);
    console.log('User ID:', EMAILJS_CONFIG.USER_ID);
    
    showAlert('🔍 Check console for template details', 'info', 3000);
};

// Make test functions accessible
console.log('🔧 Test functions available:');
console.log('  testEmailJS() - Basic EmailJS test');
console.log('  testDualEmails() - Test dual email system');
console.log('  testPortfolio() - Fill form with test data');
console.log('  checkTemplates() - Show template details');