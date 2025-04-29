document.addEventListener('DOMContentLoaded', function() {
    // Music Player Functionality
    const audioPlayer = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const progressFill = document.getElementById('progress-fill');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const currentTrackEl = document.getElementById('current-track');
    const currentAlbumEl = document.getElementById('current-album');
    const currentCoverEl = document.getElementById('current-cover');
    const trackList = document.getElementById('track-list');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const repeatBtn = document.getElementById('repeat-btn');
    const volumeBtn = document.getElementById('mute-btn');
    const volumeBar = document.getElementById('volume-bar');
    const volumeLevel = document.getElementById('volume-level');
    
    // Sample tracks data (in a real app, this would come from an API)
    const tracks = [
      {
        title: "NEON DREAMS",
        album: "DIGITAL DREAMS",
        duration: "3:45",
        cover: "assets/images/album-covers/album1.jpg",
        audio: "assets/audio/track1.mp3"
      },
      {
        title: "CYBER LOVE",
        album: "DIGITAL DREAMS",
        duration: "4:12",
        cover: "assets/images/album-covers/album1.jpg",
        audio: "assets/audio/track2.mp3"
      },
      {
        title: "DATA GHOST",
        album: "SINGLE",
        duration: "3:28",
        cover: "assets/images/album-covers/single1.jpg",
        audio: "assets/audio/track3.mp3"
      },
      {
        title: "ALGORITHM",
        album: "NEON GHOSTS",
        duration: "5:20",
        cover: "assets/images/album-covers/album2.jpg",
        audio: "assets/audio/track4.mp3"
      },
      {
        title: "BINARY HEART",
        album: "NEON GHOSTS",
        duration: "4:05",
        cover: "assets/images/album-covers/album2.jpg",
        audio: "assets/audio/track5.mp3"
      }
    ];
    
    let currentTrackIndex = 0;
    let isPlaying = false;
    let isShuffled = false;
    let isRepeated = false;
    let isMuted = false;
    let originalVolume = 0.8;
    
    // Initialize player
    function initPlayer() {
      // Load first track
      loadTrack(currentTrackIndex);
      
      // Create playlist items
      tracks.forEach((track, index) => {
        const li = document.createElement('li');
        li.className = 'playlist-item';
        li.dataset.category = track.album === "SINGLE" ? "single" : "album";
        li.dataset.audio = track.audio;
        li.dataset.cover = track.cover;
        
        li.innerHTML = `
          <div class="item-number">${String(index + 1).padStart(2, '0')}</div>
          <div class="item-info">
            <div class="item-title">${track.title}</div>
            <div class="item-album">${track.album}</div>
          </div>
          <div class="item-duration">${track.duration}</div>
          <div class="item-play"><i class="fas fa-play"></i></div>
        `;
        
        li.addEventListener('click', () => {
          playTrack(index);
        });
        
        trackList.appendChild(li);
      });
      
      // Set initial volume
      audioPlayer.volume = originalVolume;
      volumeLevel.style.width = `${originalVolume * 100}%`;
    }
    
    // Load track
    function loadTrack(index) {
      const track = tracks[index];
      
      audioPlayer.src = track.audio;
      currentTrackEl.textContent = track.title;
      currentAlbumEl.textContent = track.album;
      currentCoverEl.src = track.cover;
      
      // Update active item in playlist
      const playlistItems = document.querySelectorAll('.playlist-item');
      playlistItems.forEach(item => item.classList.remove('active'));
      playlistItems[index].classList.add('active');
      
      // Update vinyl rotation
      const vinyl = document.querySelector('.vinyl');
      if (isPlaying) {
        vinyl.style.animationPlayState = 'running';
      } else {
        vinyl.style.animationPlayState = 'paused';
      }
      
      // Reset progress bar
      progressFill.style.width = '0%';
      currentTimeEl.textContent = '0:00';
      durationEl.textContent = track.duration;
    }
    
    // Play track
    function playTrack(index) {
      if (index !== currentTrackIndex) {
        currentTrackIndex = index;
        loadTrack(currentTrackIndex);
      }
      
      audioPlayer.play();
      isPlaying = true;
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
      document.querySelector('.music-player').classList.add('playing');
    }
    
    // Pause track
    function pauseTrack() {
      audioPlayer.pause();
      isPlaying = false;
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
      document.querySelector('.music-player').classList.remove('playing');
    }
    
    // Next track
    function nextTrack() {
      if (isShuffled) {
        currentTrackIndex = Math.floor(Math.random() * tracks.length);
      } else {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
      }
      loadTrack(currentTrackIndex);
      if (isPlaying) {
        audioPlayer.play();
      }
    }
    
    // Previous track
    function prevTrack() {
      if (audioPlayer.currentTime > 3) {
        // If more than 3 seconds into the song, restart it
        audioPlayer.currentTime = 0;
      } else {
        // Otherwise go to previous track
        if (isShuffled) {
          currentTrackIndex = Math.floor(Math.random() * tracks.length);
        } else {
          currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        }
        loadTrack(currentTrackIndex);
        if (isPlaying) {
          audioPlayer.play();
        }
      }
    }
    
    // Update progress bar
    function updateProgress() {
      const { duration, currentTime } = audioPlayer;
      const progressPercent = (currentTime / duration) * 100;
      progressFill.style.width = `${progressPercent}%`;
      
      // Update time display
      const durationMinutes = Math.floor(duration / 60);
      let durationSeconds = Math.floor(duration % 60);
      if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
      
      if (duration) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
      }
      
      const currentMinutes = Math.floor(currentTime / 60);
      let currentSeconds = Math.floor(currentTime % 60);
      if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
      
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
    
    // Set progress bar
    function setProgress(e) {
      const width = this.clientWidth;
      const clickX = e.offsetX;
      const duration = audioPlayer.duration;
      audioPlayer.currentTime = (clickX / width) * duration;
    }
    
    // Set volume
    function setVolume(e) {
      const width = this.clientWidth;
      const clickX = e.offsetX;
      const volume = clickX / width;
      
      audioPlayer.volume = volume;
      originalVolume = volume;
      volumeLevel.style.width = `${volume * 100}%`;
      
      if (volume === 0) {
        isMuted = true;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
      } else {
        isMuted = false;
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
      }
    }
    
    // Toggle mute
    function toggleMute() {
      if (isMuted) {
        audioPlayer.volume = originalVolume;
        volumeLevel.style.width = `${originalVolume * 100}%`;
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        isMuted = false;
      } else {
        audioPlayer.volume = 0;
        volumeLevel.style.width = '0%';
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        isMuted = true;
      }
    }
    
    // Toggle shuffle
    function toggleShuffle() {
      isShuffled = !isShuffled;
      shuffleBtn.classList.toggle('active', isShuffled);
    }
    
    // Toggle repeat
    function toggleRepeat() {
      isRepeated = !isRepeated;
      repeatBtn.classList.toggle('active', isRepeated);
      audioPlayer.loop = isRepeated;
    }
    
    // Filter playlist
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        const items = document.querySelectorAll('.playlist-item');
        
        items.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
    
    // Play album when clicking on album card
    const albumCards = document.querySelectorAll('.album-card');
    albumCards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('album-play')) {
          // Find first track of this album
          const albumTitle = card.querySelector('h4').textContent;
          const firstTrackIndex = tracks.findIndex(track => track.album === albumTitle);
          
          if (firstTrackIndex !== -1) {
            playTrack(firstTrackIndex);
          }
        }
      });
    });
    
    // Play button on album cards
    const albumPlayBtns = document.querySelectorAll('.album-play');
    albumPlayBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const albumTitle = btn.closest('.album-card').querySelector('h4').textContent;
        const firstTrackIndex = tracks.findIndex(track => track.album === albumTitle);
        
        if (firstTrackIndex !== -1) {
          playTrack(firstTrackIndex);
        }
      });
    });
    
    // Event listeners
    playBtn.addEventListener('click', () => {
      isPlaying ? pauseTrack() : playTrack(currentTrackIndex);
    });
    
    prevBtn.addEventListener('click', prevTrack);
    nextBtn.addEventListener('click', nextTrack);
    
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', () => {
      if (!isRepeated) {
        nextTrack();
      }
    });
    audioPlayer.addEventListener('loadedmetadata', updateProgress);
    
    progressBar.addEventListener('click', setProgress);
    
    volumeBar.addEventListener('click', setVolume);
    volumeBtn.addEventListener('click', toggleMute);
    
    shuffleBtn.addEventListener('click', toggleShuffle);
    repeatBtn.addEventListener('click', toggleRepeat);
    
    // Initialize player
    initPlayer();
  });