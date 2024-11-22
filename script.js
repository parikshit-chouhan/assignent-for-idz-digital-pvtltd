// DOM Elements
const airPump = document.getElementById('airPump');
console.log(airPump)
const balloonArea = document.getElementById('balloonArea');

const balloonImages = [
    '/Graphics/Symbol 100001.png', '/Graphics/Symbol 100002.png', '/Graphics/Symbol 100003.png',
    '/Graphics/Symbol 100004.png', '/Graphics/Symbol 100005.png', '/Graphics/Symbol 100006.png',
    '/Graphics/Symbol 100007.png', '/Graphics/Symbol 100008.png', '/Graphics/Symbol 100009.png',
    '/Graphics/Symbol 100010.png'
]; // Array of predefined balloon images

let pumpAnimationRunning = false;
let currentBalloon = null; // To track the current balloon being inflated

// Handle pump animation and balloon inflation
airPump.addEventListener('click', () => {
    console.log("clicked")
    if (!pumpAnimationRunning) {
        pumpAnimationRunning = true;

        airPump.style.transform = 'translateX(-50%) translateY(20px)';

        // Reset position after a short delay
        setTimeout(() => {
            airPump.style.transform = 'translateX(-50%)';
        }, 200); // Delay in milliseconds for the animation
        if (currentBalloon === null) {
            // Create a new balloon only if no balloon is currently inflating
            currentBalloon = createBalloon();
        }

        inflateBalloon(currentBalloon);
    }
});

// Create a balloon element
function createBalloon() {
    const balloon = document.createElement('img');
    balloon.classList.add('balloon');
    balloon.src = getRandomBalloonImage(); // Random balloon image from predefined list
    balloon.style.width = '0px'; // Start from 0 size
    balloon.style.height = 'auto';
    balloon.style.position = 'absolute'; // Position the balloon absolutely to control its floating
    balloonArea.appendChild(balloon);
    balloon.addEventListener('click', () => {
        burstBalloon(balloon);
    });
    return balloon;
}

// Inflate balloon and increase size smoothly
function inflateBalloon(balloon) {
    let width = 0;
    let scale = 0;

    // Smooth inflation using transform property
    const inflationInterval = setInterval(() => {
        width += 5;
        scale += 0.05;
        balloon.style.width = `${width}px`;
        balloon.style.transform = `scale(${scale})`;

        // When balloon reaches the target size (100px), stop inflation
        if (width >= 100) {
            clearInterval(inflationInterval);
            setTimeout(() => {
                makeBalloonFloat(balloon); // Start floating once inflated
            }, 500); // Delay before floating starts
        }
    }, 50); // Speed of inflation
}

// Make balloon float smoothly after inflation
function makeBalloonFloat(balloon) {
    let leftPosition = Math.random(); // Random horizontal position
    let bottomPosition = Math.random(); // Random vertical position

    balloon.style.left = `${leftPosition}px`;
    balloon.style.bottom = `${bottomPosition}px`;

    // Smooth floating animation using velocity and acceleration
    let velocityX = Math.random() * 2 - 1; // Random horizontal speed
    let velocityY = Math.random() * 2 - 1; // Random vertical speed
    let acceleration = 0.03; // Acceleration (gravity-like effect)

    function floatBalloon() {
        velocityY += acceleration; // Apply gravity-like effect
        leftPosition += velocityX;
        bottomPosition += velocityY;

        // Boundaries check to keep balloon within screen
        if (leftPosition < 0 || leftPosition > window.innerWidth - 100) velocityX = -velocityX;
        if (bottomPosition < 0 || bottomPosition > window.innerHeight - 100) velocityY = -velocityY;

        balloon.style.left = `${leftPosition}px`;
        balloon.style.bottom = `${bottomPosition}px`;

        requestAnimationFrame(floatBalloon); // Continue floating smoothly
    }

    floatBalloon(); // Start the floating animation

    // Reset variables for the next balloon
    currentBalloon = null;
    pumpAnimationRunning = false; // Allow next balloon inflation after this one finishes floating
}

// Burst balloon on click
function burstBalloon(balloon) {
    
    balloon.style.visibility = 'hidden'; // Simulate burst
    setTimeout(() => {
        balloon.remove(); // Remove balloon after burst
    }, 500);

    // Reset the state for next balloon inflation
    currentBalloon = null;
    pumpAnimationRunning = false;
}

// Get a random balloon image from the predefined list
function getRandomBalloonImage() {
    const randomIndex = Math.floor(Math.random() * balloonImages.length);
    return balloonImages[randomIndex];
}
