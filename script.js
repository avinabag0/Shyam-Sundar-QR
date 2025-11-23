// Floating particles
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 15; // Reduced for performance
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (10 + Math.random() * 5) + 's';
    particlesContainer.appendChild(particle);
  }
}

createParticles();

// Open all links with optimized delay
function openAllLinks() {
  const links = [
    'https://www.instagram.com/shyamsundarsalkia',
    'https://www.facebook.com/syamsundarsalkia',
    'https://www.youtube.com/@shyamsundarsalkiahowrah5493'
  ];
  links.forEach((link, index) => {
    setTimeout(() => window.open(link, '_blank'), index * 150);
  });
}

// Mouse-follow background effect
document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  document.querySelector('.bg-gradient').style.transform = `translate(${mouseX * 15}px, ${mouseY * 15}px)`;
});