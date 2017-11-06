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

addListeners = function() {
  var imgs = document.querySelectorAll('.gallery-img');
  for (var i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener('click', handleImgClick);
  }
  close.addEventListener('click', handleCloseClick);
  leftArrow.addEventListener('click', handleLeftArrowClick);
  rightArrow.addEventListener('click', handleRightArrowClick);
  document.querySelector('body').addEventListener('keyup', handleKeyUp);
};

handleImgClick = function(e) {
  galleryDisplay.style.display = 'block';
  galleryItem.src = e.target.src;
  currentImg = e.target;
  currentGallery = e.target.parentElement.parentElement;
  currentGalleryImgs = currentGallery.querySelectorAll('.gallery-img');
  getCaptions(currentGallery);
  setCaptionText();
};

handleCloseClick = function(e) {
  galleryDisplay.style.display = 'none';
};

handleLeftArrowClick = function(e) {
  if (getCurrentImgLocation() === 0) {
    currentImg = currentGalleryImgs[currentGalleryImgs.length - 1];
    galleryItem.src = currentImg.src;
    setCaptionText();
  }
  else {
    currentImg = currentGalleryImgs[getCurrentImgLocation() - 1];
    galleryItem.src = currentImg.src;
    setCaptionText();
  }
};

handleRightArrowClick = function(e) {
  if (getCurrentImgLocation() === currentGalleryImgs.length - 1) {
    currentImg = currentGalleryImgs[0];
    galleryItem.src = currentImg.src;
    setCaptionText();
  }
  else {
    currentImg = currentGalleryImgs[getCurrentImgLocation() + 1];
    galleryItem.src = currentImg.src;
    setCaptionText();
  }
};

handleKeyUp = function(e) {
  if (galleryDisplay.style.display !== '') {
    if (e.keyCode === 37) {
      handleLeftArrowKeyPress();
    }
    else if (e.keyCode === 39) {
      handleRightArrowKeyPress();
    }
    else if (e.keyCode === 27) {
      handleEscKeyPress();
    }
  }
};

handleLeftArrowKeyPress = function() {
  if (getCurrentImgLocation() === 0) {
    currentImg = currentGalleryImgs[currentGalleryImgs.length - 1];
    galleryItem.src = currentImg.src;
    setCaptionText();
  }
  else {
    currentImg = currentGalleryImgs[getCurrentImgLocation() - 1];
    galleryItem.src = currentImg.src;
    setCaptionText();
  }
};

handleRightArrowKeyPress = function() {
  if (getCurrentImgLocation() === currentGalleryImgs.length - 1) {
    currentImg = currentGalleryImgs[0];
    galleryItem.src = currentImg.src;
    setCaptionText();
  }
  else {
    currentImg = currentGalleryImgs[getCurrentImgLocation() + 1];
    galleryItem.src = currentImg.src;
    setCaptionText();
  }
};

handleEscKeyPress = function() {
  galleryDisplay.style.display = 'none';
};

getCurrentImgLocation = function() {
  for (var i = 0; i < currentGalleryImgs.length; i++) {
    if (currentGalleryImgs[i] === currentImg) {
      return i;
    }
  }
};

getCaptions = function(gallery) {
  currentGalleryCaptns = [];
  var galleryItems = gallery.children;
  var strippedGalleryItems = [];

  for (var i = 0; i < galleryItems.length; i++) {
    for (var j = 0; j < galleryItems[i].classList.length; j++) {
      if (galleryItems[i].classList[j] === 'gallery-block') {
        strippedGalleryItems.push(galleryItems[i]);
      }
    }
  }

  for (var i = 0; i < strippedGalleryItems.length; i++) {
    var selector = strippedGalleryItems[i].querySelector('.gallery-caption');
    if (selector === undefined) {
      currentGalleryCaptns.push(null);
    }
    else {
      currentGalleryCaptns.push(selector);
    }
  }
};

setCaptionText = function() {
  if (currentGalleryCaptns[getCurrentImgLocation()] === undefined) {
    captionBox.style.display = 'none';
  }
  else if (currentGalleryCaptns[getCurrentImgLocation()] === null) {
    captionBox.style.display = 'none';
  }
  else {
    var text = currentGalleryCaptns[getCurrentImgLocation()].innerText;
    captionBox.style.display = 'flex';
    captionBox.innerHTML = text;
  }
};

addListeners();