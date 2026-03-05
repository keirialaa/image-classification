// Fetch and store HTML elements
const uploadBox = document.getElementById("upload-box");
const fileInput = document.getElementById("file-input");
const browseBtn = document.getElementById("browse-btn");
const uploadBtn = document.getElementById("upload-btn");
const imagePreview = document.getElementById("image-preview");
const uploadText = document.getElementById("upload-text");
const iconSvg = uploadBox.querySelector("svg");

// Open file dialog when user clicks the browse button
browseBtn.addEventListener("click", () => fileInput.click());

// Visual feedback for drag & drop
uploadBox.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadBox.style.borderColor = "#1685fa";
  uploadBox.style.backgroundColor = "#F2F2F2";
});

uploadBox.addEventListener("dragleave", () => {
  uploadBox.style.borderColor = "";
  uploadBox.style.backgroundColor = "";
});

uploadBox.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadBox.style.borderColor = "";
  uploadBox.style.backgroundColor = "";

  if (e.dataTransfer.files.length > 0) {
    fileInput.files = e.dataTransfer.files;
    handlePreview(e.dataTransfer.files[0]);
  }
});

// Handle selection via file dialog
fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    handlePreview(fileInput.files[0]);
  }
});

// Show image preview
function handlePreview(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.src = e.target.result;
    uploadBox.style.gap = "0";
    imagePreview.style.display = "block";

    // Hide the icon and change text to filename
    iconSvg.style.display = "none";
    uploadText.innerText = file.name;

    // Enable the Analyze button
    uploadBtn.disabled = false;
    uploadBtn.style.opacity = "1";
    uploadBtn.style.cursor = "pointer";
  };
  reader.readAsDataURL(file);
}

// Submit image and make a prediction
document.getElementById("upload-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // Stop the page from refreshing

  const formData = new FormData(e.target);
  uploadBtn.innerText = "Analyzing...";
  uploadBtn.disabled = true;

  try {
    const response = await fetch("/classify", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    // Display the result in UI
    alert(`Prediction: ${data.prediction} (${data.confidence})`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    uploadBtn.innerText = "Analyze Image";
    uploadBtn.disabled = false;
  }
});
