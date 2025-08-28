(function(){
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // mobile nav
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks){
    navToggle.addEventListener('click', () => {
      const open = navLinks.style.display === 'flex';
      navLinks.style.display = open ? 'none' : 'flex';
      navToggle.setAttribute('aria-expanded', (!open).toString());
    });
  }

  // theme toggle (persist in localStorage)
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const setLight = () => {
    root.style.setProperty('--bg', '#f7fbfb');
    root.style.setProperty('--txt', '#0b0f14');
    root.style.setProperty('--muted', '#4b5a57');
    root.style.setProperty('--glass', 'rgba(0,0,0,0.04)');
    root.style.setProperty('--border', '1px solid rgba(0,0,0,0.12)');
  };
  const stored = localStorage.getItem('theme') || 'dark';
  if (stored === 'light') setLight();
  if (themeToggle){
    themeToggle.addEventListener('click', () => {
      const now = (localStorage.getItem('theme') || 'dark') === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', now);
      if (now === 'light') setLight(); else location.reload();
    });
  }

  // Lightbox functionality
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDescription = document.getElementById('lightbox-description');

  // Screenshot data for lightbox
  const screenshotData = {
    'overview': {
      title: 'Cluster Overview Dashboard',
      description: 'Real-time monitoring of pod status, node health, and resource metrics across all namespaces.',
      image: 'screenshots/overview.png'
    },
    'pod-explorer': {
      title: 'Pod Explorer & Logs',
      description: 'Browse pods by namespace, view real-time logs, and manage containers with ease.',
      image: 'screenshots/pod-explorer.png'
    },
    'anomaly-detection': {
      title: 'AI Anomaly Detection',
      description: 'Machine learning-powered insights that detect unusual patterns and alert you proactively.',
      image: 'screenshots/anomaly-detection.png'
    },
    'kubernetes-shell': {
      title: 'Kubernetes Shell',
      description: 'Execute kubectl commands directly from the dashboard with RBAC awareness and history.',
      image: 'screenshots/kubernetes-shell.png'
    },
    'auto-scaling': {
      title: 'Auto-scaling Control',
      description: 'AI-powered HPA recommendations and one-click updates for optimal resource utilization.',
      image: 'screenshots/auto-scaling.png'
    },
    'misi-ai': {
      title: 'Misi AI Assistant',
      description: 'Intelligent chatbot providing contextual help, navigation, and quick actions.',
      image: 'screenshots/misi-ai.png'
    }
  };

  // Open lightbox function
  window.openLightbox = function(screenshotId) {
    const data = screenshotData[screenshotId];
    if (data) {
      lightboxImg.src = data.image;
      lightboxTitle.textContent = data.title;
      lightboxDescription.textContent = data.description;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  };

  // Close lightbox function
  window.closeLightbox = function() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  };

  // Close lightbox with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // Close lightbox when clicking outside content
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Tab functionality for deployment options
  window.showTab = function(tabName) {
    // Hide all tab panes
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabPanes.forEach(pane => pane.classList.remove('active'));
    
    // Remove active class from all tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab pane
    const selectedPane = document.getElementById(tabName);
    if (selectedPane) {
      selectedPane.classList.add('active');
    }
    
    // Activate selected tab button
    const selectedBtn = document.querySelector(`[onclick="showTab('${tabName}')"]`);
    if (selectedBtn) {
      selectedBtn.classList.add('active');
    }
  };

  // Copy to clipboard functionality
  window.copyToClipboard = function(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      const text = element.textContent;
      navigator.clipboard.writeText(text).then(() => {
        // Show success feedback
        const copyBtn = element.parentElement.querySelector('.copy-btn');
        if (copyBtn) {
          const originalText = copyBtn.textContent;
          copyBtn.textContent = '✅';
          copyBtn.style.background = 'var(--secondary)';
          
          setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
          }, 2000);
        }
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // Show success feedback
        const copyBtn = element.parentElement.querySelector('.copy-btn');
        if (copyBtn) {
          const originalText = copyBtn.textContent;
          copyBtn.textContent = '✅';
          copyBtn.style.background = 'var(--secondary)';
          
          setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
          }, 2000);
        }
      });
    }
  };
})();
