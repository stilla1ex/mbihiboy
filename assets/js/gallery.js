document.addEventListener('DOMContentLoaded', function() {
    // Gallery lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.prev-img');
    const nextBtn = document.querySelector('.next-img');
    
    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => ({
      src: item.querySelector('img').src,
      caption: item.querySelector('.gallery-caption').textContent
    }));
    
    // Open lightbox when clicking a gallery item
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    
    // Update lightbox image and caption
    function updateLightboxImage() {
      lightboxImg.src = images[currentImageIndex].src;
      lightboxCaption.textContent = images[currentImageIndex].caption;
    }
    
    // Close lightbox
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
    
    // Previous image
    prevBtn.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
      updateLightboxImage();
    });
    
    // Next image
    nextBtn.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      updateLightboxImage();
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
          lightbox.classList.remove('active');
          document.body.style.overflow = 'auto';
        } else if (e.key === 'ArrowLeft') {
          currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
          updateLightboxImage();
        } else if (e.key === 'ArrowRight') {
          currentImageIndex = (currentImageIndex + 1) % images.length;
          updateLightboxImage();
        }
      }
    });
    
    // Video gallery navigation
    const videoThumbs = document.querySelectorAll('.video-thumb');
    const videoIframe = document.querySelector('.video-wrapper iframe');
    const prevVideoBtn = document.querySelector('.prev-video');
    const nextVideoBtn = document.querySelector('.next-video');
    
    let currentVideoIndex = 0;
    
    // Set active video thumb
    function setActiveVideo(index) {
      videoThumbs.forEach(thumb => thumb.classList.remove('active'));
      videoThumbs[index].classList.add('active');
      
      // In a real implementation, you would update the iframe src with the new video ID
      // videoIframe.src = `https://www.youtube.com/embed/NEW_VIDEO_ID`;
    }
    
    // Click on video thumb
    videoThumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        currentVideoIndex = index;
        setActiveVideo(currentVideoIndex);
      });
    });
    
    // Previous video
    prevVideoBtn.addEventListener('click', () => {
      currentVideoIndex = (currentVideoIndex - 1 + videoThumbs.length) % videoThumbs.length;
      setActiveVideo(currentVideoIndex);
    });
    
    // Next video
    nextVideoBtn.addEventListener('click', () => {
      currentVideoIndex = (currentVideoIndex + 1) % videoThumbs.length;
      setActiveVideo(currentVideoIndex);
    });
    
    // Filter gallery items
    const filterBtns = document.querySelectorAll('.gallery-filter .filter-btn');
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.dataset.filter;
        
        galleryItems.forEach(item => {
          if (filterValue === 'all' || item.dataset.category === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  });