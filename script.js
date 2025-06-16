// GSAP Block Reveal Animation
document.addEventListener('DOMContentLoaded', function () {
    // Set initial state for all reveal blocks
    gsap.set('.reveal-block', {
        opacity: 0,
        y: 50,
        rotationX: 15,
        transformPerspective: 1000
    });

    // Create timeline for sequential reveal
    const tl = gsap.timeline({
        delay: 0.5
    });

    // Animate calculator container
    tl.to('.container', {
        duration: 1.2,
        opacity: 1,
        y: 0,
        rotationX: 0,
        ease: "power3.out"
    })

        // Animate display
        .to('.value', {
            duration: 0.8,
            opacity: 1,
            y: 0,
            rotationX: 0,
            ease: "power2.out"
        }, "-=0.6")

        // Animate buttons in waves
        .to('.num[data-button="C"], .num[data-button="CE"], .num[data-button="/"], .num[data-button="*"]', {
            duration: 0.6,
            opacity: 1,
            y: 0,
            rotationX: 0,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }, "-=0.4")

        .to('.num[data-button="7"], .num[data-button="8"], .num[data-button="9"], .num[data-button="-"]', {
            duration: 0.6,
            opacity: 1,
            y: 0,
            rotationX: 0,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }, "-=0.3")

        .to('.num[data-button="4"], .num[data-button="5"], .num[data-button="6"], .num[data-button="+"]', {
            duration: 0.6,
            opacity: 1,
            y: 0,
            rotationX: 0,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }, "-=0.3")

        .to('.num[data-button="1"], .num[data-button="2"], .num[data-button="3"], .num[data-button="="]', {
            duration: 0.6,
            opacity: 1,
            y: 0,
            rotationX: 0,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }, "-=0.3")

        .to('.num[data-button="0"], .num[data-button="00"], .num[data-button="."]', {
            duration: 0.6,
            opacity: 1,
            y: 0,
            rotationX: 0,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }, "-=0.3");

    // Add subtle floating animation after reveal
    tl.to('.container', {
        duration: 4,
        y: -10,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
    }, "+=1");
});

// Create AudioContext for button click sound
let audioContext;

function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playClickSound() {
    if (!audioContext) initAudio();

    // Create a short beep sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Configure the sound
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Add click animation and sound to all buttons
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.num');

    buttons.forEach(button => {
        button.addEventListener('mousedown', function () {
            // Initialize audio on first user interaction
            initAudio();

            // Play click sound
            playClickSound();

            // Add scale animation class
            this.classList.add('button-clicked');
        });

        button.addEventListener('mouseup', function () {
            // Remove scale animation class
            setTimeout(() => {
                this.classList.remove('button-clicked');
            }, 100);
        });

        button.addEventListener('mouseleave', function () {
            // Remove scale animation class if mouse leaves
            this.classList.remove('button-clicked');
        });
    });
});

