// Listen for the 'keydown' event (key press)
window.addEventListener('keydown', playSound);

// Function to play sound
function playSound(e) {
    let key;
    let keyCode;

    // If the event is from the keyboard (keydown)
    if (e.type === 'keydown') {
        keyCode = e.keyCode;
        key = document.querySelector(`.key[data-key="${keyCode}"]`);
    }

    // If the event is from the mouse (click)
    if (e.type === 'click') {
        key = e.target.closest('.key'); // Get the .key element that was clicked
        keyCode = key ? key.getAttribute('data-key') : null; // Get the corresponding keyCode
    }

    // If no matching key is found
    if (!keyCode || !key) return;

    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);

    if (audio) {
        audio.currentTime = 0; // Reset the audio to the beginning
        audio.play(); // Play the sound
    }

    // Add class for animation
    key.classList.add("playing");
    
    // Add animation on key word
    const icon = key.querySelector('i');
    icon.style.transform = 'scale(0.5)';

    setTimeout(() =>{
    icon.style.transform = 'scale(1)';
},200);
}



// Function to remove the class after the animation is complete
function removeTransition(e) {
    if (e.propertyName !== 'transform') return; // Ensure the animation is related to 'transform'
    this.classList.remove('playing'); // Remove the 'playing' class
}

// Add event listeners to each .key element
const keys = document.querySelectorAll('.key');

// For each .key element, add 'click' and 'transitionend' event listeners
keys.forEach((key) => {
    key.addEventListener('click', playSound); // Handle click events
    key.addEventListener('transitionend', removeTransition); // Remove the class after the animation ends
});

// Add the button volume ------
// Find slider and audio elements
let volumeSlider = document.getElementById('html-input-range');
let allAudioElements = document.querySelectorAll('audio');
 // Function for volume update
function volumeScrolling(){
    const volumeValue = volumeSlider.value / 100; // Convert the value from 0 to 100 to the range [0, 1]
    allAudioElements.forEach((audio) =>{ 
        audio.volume = volumeValue; // Set volume
    });
    console.log(`Current volume: ${volumeValue * 100}%`);
}
// Add an event handler for slider changes
volumeSlider.addEventListener('input' , volumeScrolling);