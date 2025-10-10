const canvas = document.getElementById('threadCanvas');
const ctx = canvas.getContext('2d');

// Initialize canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear on resize
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// --- Mesh Animation (Restored) ---
const threads = [];
const numThreads = 8; // Reduced for performance with needle

class Thread {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.5; // Slow movement
        this.vy = (Math.random() - 0.5) * 1.5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + 8, this.y + 8); // Short thread segments
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
    }
}

// Initialize mesh threads
for (let i = 0; i < numThreads; i++) {
    threads.push(new Thread());
}

// --- Needle Setup ---
const needle = document.createElement('div');
needle.id = 'needle';
document.body.appendChild(needle);

let needleX = canvas.width / 2;
let needleY = canvas.height / 2;
let needleVx = (Math.random() - 0.5) * 2; // Initial random velocity
let needleVy = (Math.random() - 0.5) * 2;
let lastX = needleX;
let lastY = needleY;
let angleOffset = 0; // For smooth weaving curves

function updateNeedle() {
    // Weaving effect with smooth, curved motion
    const maxSpeed = 3.5; // Slightly faster for coverage
    const turnRate = 0.1; // Increased for curvier paths
    angleOffset += 0.05; // Oscillate for wave-like motion

    // Add sinusoidal variation for organic weaving
    needleVx += Math.sin(angleOffset) * turnRate;
    needleVy += Math.cos(angleOffset) * turnRate;

    // Clamp speed for controlled movement
    let speed = Math.hypot(needleVx, needleVy);
    if (speed > maxSpeed) {
        needleVx *= maxSpeed / speed;
        needleVy *= maxSpeed / speed;
    } else if (speed < 0.5) {
        needleVx *= 0.5 / speed;
        needleVy *= 0.5 / speed;
    }

    // Bounce off edges
    if (needleX < 0 || needleX > canvas.width) needleVx *= -1.01;
    if (needleY < 0 || needleY > canvas.height) needleVy *= -1.01;

    // Update position
    lastX = needleX;
    lastY = needleY;
    needleX += needleVx;
    needleY += needleVy;

    // Keep needle in bounds
    needleX = Math.min(Math.max(0, needleX), canvas.width);
    needleY = Math.min(Math.max(0, needleY), canvas.height);

    // Rotate needle to face direction
    let needleAngle = Math.atan2(needleVy, needleVx) * 180 / Math.PI;
    needle.style.transform = `translate(${needleX}px, ${needleY}px) rotate(${needleAngle}deg)`;

    // Draw persistent thread trail
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(needleX, needleY);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)'; // Very low opacity for dense fabric texture
    ctx.lineWidth = 1.2; // Slightly thicker for visibility
    ctx.stroke();
}

function drawScene() {
    // Do not clear canvas to let needle threads accumulate
    // Draw mesh
    threads.forEach(thread => {
        thread.update();
        thread.draw();
        threads.forEach(other => {
            const dist = Math.hypot(thread.x - other.x, thread.y - other.y);
            if (dist < 80) { // Shorter connections for denser mesh
                ctx.beginPath();
                ctx.moveTo(thread.x, thread.y);
                ctx.lineTo(other.x, other.y);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        });
    });

    // Update and draw needle
    updateNeedle();
    requestAnimationFrame(drawScene);
}

// Start animation
drawScene();