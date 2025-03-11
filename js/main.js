document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking a nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Sticky Header on Scroll
    const header = document.querySelector('header');
    let scrollPosition = window.scrollY;

    function updateHeaderStyle() {
        scrollPosition = window.scrollY;
        
        if (scrollPosition > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    }

    window.addEventListener('scroll', updateHeaderStyle);

    // Calculate gradient positions for chart bars
    const chartBars = document.querySelectorAll('.chart-bar[data-value]');
    if (chartBars.length) {
        // Find max and min values
        let maxValue = -Infinity;
        let minValue = Infinity;
        
        chartBars.forEach(bar => {
            const value = parseFloat(bar.getAttribute('data-value'));
            maxValue = Math.max(maxValue, value);
            minValue = Math.min(minValue, value);
        });
        
        // Set CSS variables
        document.documentElement.style.setProperty('--max-value', maxValue);
        document.documentElement.style.setProperty('--min-value', minValue);
        
        // Calculate position for each bar and adjust text position
        chartBars.forEach(bar => {
            const value = parseFloat(bar.getAttribute('data-value'));
            
            // Calculate position between 0% (min/negative) and 100% (max/positive)
            let position;
            if (value < 0) {
                // Negative values: 0-40% of the gradient (red to orange)
                position = Math.max(0, 40 - (Math.abs(value) / Math.abs(minValue)) * 40);
            } else {
                // Positive values: 40-100% of the gradient (yellow to green)
                position = 40 + (value / maxValue) * 60;
            }
            
            // Apply the calculated position
            bar.style.backgroundPosition = `${position}% center`;
            
            // Adjust text color based on bar width and value
            const barWidth = parseFloat(bar.style.width);
            const valueSpan = bar.querySelector('.chart-value');
            
            if (valueSpan) {
                // For very short bars, ensure text is visible outside
                if (barWidth < 10 || value < 0) {
                    valueSpan.style.right = '-65px';
                    valueSpan.style.color = '#333';
                } else {
                    valueSpan.style.right = '10px';
                    valueSpan.style.color = barWidth > 50 ? '#fff' : '#333';
                }
            }
        });
    }

    // Form Submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const investorType = document.getElementById('investor-type').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send this data to your server
            // For this example, we'll just show an alert
            alert(`Thank you for your interest, ${name}. We will contact you shortly at ${email}.`);
            
            // Reset the form
            contactForm.reset();
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
