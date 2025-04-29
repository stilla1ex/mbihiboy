document.addEventListener('DOMContentLoaded', function() {
    // Preloader animation
    const loadingText = document.querySelector('.loading-text');
    const letters = loadingText.querySelectorAll('span');
    
    // Animate each letter with a delay
    letters.forEach((letter, index) => {
      setTimeout(() => {
        letter.style.opacity = '1';
        letter.style.transform = 'translateY(0)';
      }, index * 100);
    });
    
    // Simulate loading progress
    const loadingPercentage = document.querySelector('.loading-percentage');
    const loadingProgress = document.querySelector('.loading-progress');
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 5) + 1;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Hide preloader after a short delay
        setTimeout(() => {
          const preloader = document.querySelector('.preloader');
          preloader.style.opacity = '0';
          
          setTimeout(() => {
            preloader.style.display = 'none';
          }, 500);
        }, 500);
      }
      
      loadingPercentage.textContent = `${progress}%`;
      loadingProgress.style.width = `${progress}%`;
    }, 50);
  });