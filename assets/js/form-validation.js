document.addEventListener('DOMContentLoaded', function() {
    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        let isValid = true;
        
        // Reset error states
        document.querySelectorAll('.form-group').forEach(group => {
          group.classList.remove('error');
        });
        
        // Validate name
        if (name.value.trim() === '') {
          name.closest('.form-group').classList.add('error');
          isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
          email.closest('.form-group').classList.add('error');
          isValid = false;
        }
        
        // Validate subject
        if (subject.value === '') {
          subject.closest('.form-group').classList.add('error');
          isValid = false;
        }
        
        // Validate message
        if (message.value.trim() === '') {
          message.closest('.form-group').classList.add('error');
          isValid = false;
        }
        
        if (isValid) {
          // Form is valid, show success message
          document.getElementById('formSuccess').classList.add('active');
          
          // Reset form
          contactForm.reset();
          
          // Hide success message after 3 seconds
          setTimeout(() => {
            document.getElementById('formSuccess').classList.remove('active');
          }, 3000);
        }
      });
    }
    
    // Newsletter form validation
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(emailInput.value.trim())) {
          emailInput.style.borderColor = 'var(--error-color)';
        } else {
          emailInput.style.borderColor = '';
          
          // Show success message (in a real app, you would submit the form)
          alert('Thank you for subscribing to our newsletter!');
          newsletterForm.reset();
        }
      });
    }
  });