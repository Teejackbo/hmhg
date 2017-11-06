var dropdown = document.querySelector('.dropdown');
var dropdownContent = document.querySelector('.dropdown-content');

handleClick = function() {
  if (dropdownContent.style.display === 'none') {
    dropdownContent.style.display = 'block';
  }
  else {
    dropdownContent.style.display = 'none';
  }
};

dropdown.addEventListener('click', handleClick);