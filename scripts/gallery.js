// Get needed elements and init variables.
var galleryDisplay = document.querySelector('.gallery-display');
var galleryItem = document.querySelector('.gallery-item');
var leftArrow = document.querySelector('.arrow-left');
var rightArrow = document.querySelector('.arrow-right');
var close = document.querySelector('.close');
var captionBox = document.querySelector('.caption');
var currentGallery;
var currentGalleryImgs;
var currentGalleryCaptns = [];
var currentImg;

// Create event listeners for required elements.
addListeners = function() {
  var imgs = document.querySelectorAll('.gallery-img'); // Get all images with the class of .gallery-img.
  for (var i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener('click', handleImgClick); // Loop through the images and add an event listener to all of them.
  }
  // Add event listeners for the close button, arrows, and one for the body to detect key codes.
  close.addEventListener('click', handleCloseClick);
  leftArrow.addEventListener('click', handleLeftArrowClick);
  rightArrow.addEventListener('click', handleRightArrowClick);
  document.querySelector('body').addEventListener('keyup', handleKeyUp);
};

// Function called when any image with a class of .gallery-img is clicked.
handleImgClick = function(e) {
  galleryItem.src = e.target.src;
  currentImg = e.target;
  currentGallery = e.target.parentElement.parentElement; // Sets currentGallery to the 2x parent element. (gallery>gallery-block>gallery-img)
  currentGalleryImgs = currentGallery.querySelectorAll('.gallery-img'); // Gets all the images in the current gallery.
  galleryDisplay.style.display = 'block';
  getCaptions(currentGallery);
  setCaptionText();
};

// Function called when the close button is clicked.
handleCloseClick = function() {
  galleryDisplay.style.display = 'none'; // Hides the gallery.
};

// Function called when the left arrow is clicked.
handleLeftArrowClick = function() {
  if (getCurrentImgLocation() === 0) { // If the current image is the first one.
    currentImg = currentGalleryImgs[currentGalleryImgs.length - 1]; // Sets the image to the last image in the gallery.
    galleryItem.src = currentImg.src; // Sets src.
    setCaptionText(); // Sets caption text.
  }
  else {
    currentImg = currentGalleryImgs[getCurrentImgLocation() - 1]; // Sets currentImg to the img element before currentImg.
    galleryItem.src = currentImg.src;
    setCaptionText();
  }
};

// Function called when the right arrow is clicked.
handleRightArrowClick = function() {
  if (getCurrentImgLocation() === currentGalleryImgs.length - 1) { // If the currentImg is the last one.
    currentImg = currentGalleryImgs[0]; // Sets currentImg to the first image.
    galleryItem.src = currentImg.src;
    setCaptionText();
  }
  else {
    currentImg = currentGalleryImgs[getCurrentImgLocation() + 1]; // Sets currentImg to the next img element.
    galleryItem.src = currentImg.src;
    setCaptionText();
  }
};

// Function called when a key is pressed.
handleKeyUp = function(e) {
  if (galleryDisplay.style.display !== '') { // Checks if the gallery is currently displayed or not.
    if (e.keyCode === 37) { // If the key that was pressed was the left arrow key.
      handleLeftArrowClick();
    }
    else if (e.keyCode === 39) { // Right arrow key.
      handleRightArrowClick();
    }
    else if (e.keyCode === 27) { // Esc key.
      handleEscKeyPress();
    }
  }
};

handleEscKeyPress = function() {
  galleryDisplay.style.display = 'none';
};

// Function to get the location of the currentImg variable within the collection of images from the current gallery.
getCurrentImgLocation = function() {
  for (var i = 0; i < currentGalleryImgs.length; i++) { // Loops through the collection.
    if (currentGalleryImgs[i] === currentImg) { // Checks if elems are the same.
      return i; // Returns location.
    }
  }
};

// Function to get captions from a gallery.
getCaptions = function(gallery) {
  // Initialise variables.
  currentGalleryCaptns = []; // Resets captions, otherwise if you click on a different gallery it will be added and not cleared.
  var galleryItems = gallery.children; // Sets galleryItems to the children of the passed in gallery.

  // Purpose of this loop is to check if an element has a class of .gallery-block.
  // This is needed to allow things such as <h2> elements for splitting up a gallery.
  for (var i = 0; i < galleryItems.length; i++) { // Loop through gallery items.
    for (var j = 0; j < galleryItems[i].classList.length; j++) { // Loop through the classes of the galleryItem.
      if (galleryItems[i].classList[j] === 'gallery-block') { // Checks if it has the .gallery-block class.
        var selector = galleryItems[i].querySelector('.gallery-caption'); // Tries to select a caption.
        if (selector === undefined) { // If there is no caption.
          currentGalleryCaptns.push(null); // Push null. This is required to keep the arrays the same length.
        }
        else {
          currentGalleryCaptns.push(selector); // Push caption.
        }
      }
    }
  }
};

// Sets the caption text for the current image.
setCaptionText = function() {
  if (currentGalleryCaptns[getCurrentImgLocation()] === undefined) {
    captionBox.style.display = 'none';
  }
  else if (currentGalleryCaptns[getCurrentImgLocation()] === null) {
    captionBox.style.display = 'none';
  }
  else {
    var text = currentGalleryCaptns[getCurrentImgLocation()].innerText; // Gets the text of the caption element.
    captionBox.innerHTML = text; // Sets inner html to the text from the caption element.
    captionBox.style.display = 'flex'; // Shows captionBox.
  }
};

addListeners();