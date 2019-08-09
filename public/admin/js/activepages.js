// Get the container element
var linkContainer = document.getElementById("nav-link");

// Get all buttons with class="btn" inside the container
var links = linkContainer.getElementsByClassName("linking");

// Loop through the buttons and add the active class to the current/clicked button
// for (var i = 0; i < links.length; i++) {
//   links[i].addEventListener("click", function() {
//     console.log(i);
//     var current = document.getElementsByClassName("active");
//     current[0].className = current[0].className.replace(" active", "");
//     this.className += " active";
//   });
// }

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < links.length; i++) {
  console.log(links.length);
  links[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    console.log(current);
    // If there's no active class
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }

    // Add the active class to the current/clicked button
    this.className += " active";
  });
}