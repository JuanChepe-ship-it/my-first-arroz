// Tabs functionality
    document.addEventListener('DOMContentLoaded', function() {
      const tabButtons = document.querySelectorAll('.tab-button');
      
      tabButtons.forEach(button => {
        button.addEventListener('click', function() {
          // Remove active class from all buttons and contents
          document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
          document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
          
          // Add active class to clicked button
          this.classList.add('active');
          
          // Show corresponding content
          const tabId = this.getAttribute('data-tab');
          document.getElementById(tabId).classList.add('active');
        });
      });
      
      // Rating stars functionality
      const stars = document.querySelectorAll('.star');
      const ratingText = document.getElementById('rating-text');
      const ratingTexts = [
        '¡No me gustó!',
        'Podría mejorar',
        'Está bien',
        'Me gustó mucho',
        '¡Excelente receta!'
      ];
      
      stars.forEach(star => {
        star.addEventListener('click', function() {
          const rating = this.getAttribute('data-rating');
          
          // Reset all stars
          stars.forEach(s => s.classList.remove('active'));
          
          // Activate stars up to the clicked one
          for (let i = 0; i < rating; i++) {
            stars[i].classList.add('active');
          }
          
          // Update rating text
          ratingText.textContent = ratingTexts[rating - 1];
        });
      });
      
      // Smooth scrolling for navigation links
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        });
      });
    });