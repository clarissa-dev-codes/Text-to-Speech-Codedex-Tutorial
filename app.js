// ========================================
// Text-to-Speech App
// Using Browser Web Speech API
// ========================================

// DOM Element References
const textInput = document.getElementById("text-input");
const voiceSelect = document.getElementById("voice-select");
const speedSlider = document.getElementById("speed-slider");
const pitchSlider = document.getElementById("pitch-slider");
const speedValue = document.getElementById("speed-value");
const pitchValue = document.getElementById("pitch-value");
const speakBtn = document.getElementById("speak-btn");
const stopBtn = document.getElementById("stop-btn");
const charCount = document.getElementById("char-count");
const status = document.getElementById("status");
const statusText = document.getElementById("status-text");

// Web Speech API
const synth = window.speechSynthesis;
let voices = [];

// Step 3: Load available voices
// Get voices from the browser and populate the dropdown
function loadVoices() {
  // TODO: Get voices using synth.getVoices()
  voices = synth.getVoices();

  // TODO: Check if voices array is empty (async loading)
  if(voices.length === 0){
    return;
  }

  // TODO: Clear the dropdown
  voiceSelect.innerHTML = "";

  // TODO: Loop through voices and create option elements
  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });

  // TODO: Set option value to index, text to voice name and language
  console.log(`Loaded${voices.length} voices`);
}

// Step 4: Update character counter
// Show how many characters the user has typed
function updateCharCount() {
  // TODO: Get the length of textInput.value
  const count = textInput.value.length;

  // TODO: Update charCount.textContent with the count
  charCount.textContent = count;
}

function updateSliderValues(){
  speedValue.textContent = speedSlider.value;
  pitchValue.textContent = pitchSlider.value;
}

// Step 5: Implement speech synthesis
// The main speak() function that converts text to speech
function speak() {
  // TODO: Get text from input and trim whitespace
  if(synth.speaking){
    synth.cancel();
  }
  const text = textInput.value.trim();

  // TODO: Validate that text is not empty
  if(!text){
    alert("Please enter some text to speak");
    return;
  }

  // TODO: Create new SpeechSynthesisUtterance with the text
  const utterance = new SpeechSynthesisUtterance(text);

  // TODO: Set utterance.voice from selected dropdown index
  const selectedVoiceIndex = voiceSelect.value;
  if(selectedVoiceIndex !== ""){
    utterance.voice = voices[selectedVoiceIndex];
  }

  // TODO: Set utterance.rate from speed slider
  utterance.rate = parseFloat(speedSlider.value);

  // TODO: Set utterance.pitch from pitch slider
  utterance.pitch = parseFloat(pitchSlider.value);
  utterance.volume = 1.0;

  // TODO: Add onstart handler to update UI (add 'speaking' class, disable speak button)
  utterance.onstart = () => {
    status.classList.add("speaking");
    statusText.textContent = "Speaking...";
    speakBtn.disabled = true;
    stopBtn.disabled = false;
  };

  // TODO: Add onend handler to reset UI (remove 'speaking' class, enable speak button)
  utterance.onend = () => {
    status.classList.remove("speaking");
    statusText.textContent = "Ready";
    speakBtn.disabled = false;
    stopBtn.disabled = true;
  };

  // TODO: Add onerror handler for error cases
  utterance.onerror = (event) => {
    console.error("Speech synthesis error:", event);
    statusText.textContent = "Error occured";
    speakBtn.disabled = false;
    stopBtn.disabled = true;
  };

  // TODO: Call synth.speak(utterance) to start speaking
  synth.speak(utterance);

  console.log("Speaking:", text.substring(0, 50) + "...");
}

// Stop speaking
// Cancel any ongoing speech
function stop() {
  // TODO: Call synth.cancel()
  synth.cancel();

  // TODO: Update status text to 'Stopped'
  status.classList.remove("speaking");
  statusText.textContent = "Stopped";

  // TODO: Reset button states
  speakBtn.disabled = false;
  stopBtn.disabled = true;
}

// Initialize the app
// Set up all event listeners when DOM is ready
function init() {
  // TODO: Call loadVoices() initially
  loadVoices();

  // TODO: Listen for 'voiceschanged' event (for Chrome async loading)
  synth.addEventListener("voiceschanged", loadVoices);

  // TODO: Add 'input' listener on textInput for character counter
  textInput.addEventListener("input", updateCharCount);

  // TODO: Add 'input' listeners on sliders to update value displays
  speedSlider.addEventListener("input", updateSliderValues);
  pitchSlider.addEventListener("input", updateSliderValues);

  // TODO: Add 'click' listener on speakBtn
  speakBtn.addEventListener("click", speak);

  // TODO: Add 'click' listener on stopBtn
  stopBtn.addEventListener("click", stop);

  // TODO: Initialize displays (call updateCharCount)
  updateCharCount();

  // TODO: Disable stop button initially
  stopBtn.disabled = true;
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", init);
