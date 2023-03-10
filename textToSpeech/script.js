// Define global variables
let synth = window.speechSynthesis;
let voices = [];

// Get references to DOM elements
let playButton = document.getElementById('play-button');
let pauseButton = document.getElementById('pause-button');
let resumeButton = document.getElementById('resume-button');
let stopButton = document.getElementById('stop-button');
let textInput = document.getElementById('text-input');
let speedInput = document.getElementById('speed-input');
let voiceSelect = document.getElementById('voice-select');
let speedDisplay = document.getElementById('speedDisplay');

// Load available voices
function loadVoices() {
  voices = synth.getVoices();
  voices.forEach(function(voice, i) {
    let option = document.createElement('option');
    option.value = i;
    option.textContent = voice.name + ' (' + voice.lang + ')';
    voiceSelect.appendChild(option);
  });
}

// Display selected speed rate
speedInput.oninput = function() {
  speedDisplay.textContent = `Speed: ${this.value}x`;
}

// Start playing the speech
function startPlaying() {
  let utterance = new SpeechSynthesisUtterance(textInput.value);
  utterance.voice = voices[voiceSelect.value];
  utterance.rate = parseFloat(speedInput.value);
  synth.speak(utterance);
}

// Event listeners for buttons
playButton.addEventListener('click', function() {
  if (synth.speaking) {
    synth.resume();
    return;
  }
  startPlaying();
});

// Pause the playing voice
pauseButton.addEventListener('click', function() {
  synth.pause();
});

// Resume the paused voice
resumeButton.addEventListener('click', function() {
  synth.resume();
});

// Stop generating voice
stopButton.addEventListener('click', function() {
  synth.cancel();
});

// Event listener for voice selection
voiceSelect.addEventListener('change', function() {
  startPlaying();
});

// Load available voices when the window is loaded
window.addEventListener('load', function() {
  loadVoices();
});
