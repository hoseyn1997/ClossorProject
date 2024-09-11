let token = localStorage.getItem("Token");
let login_section = document.getElementById("you-can-log-in");
let loggedIn_section = document.getElementById("you-are-logged-in");

if (!!!token) {
  should_logIn();
} else {
  areLoggedIn();
}

let logOut_btn = document.getElementById("log-out-btn");
logOut_btn.addEventListener("click", () => {
  localStorage.removeItem("Token");
  should_logIn();
});

function areLoggedIn() {
  login_section.classList.add("hidden");
  loggedIn_section.classList.remove("hidden");
  loggedIn_section.classList.add("grid");
}
function should_logIn() {
  login_section.classList.remove("hidden");
  loggedIn_section.classList.add("hidden");
  loggedIn_section.classList.remove("grid");
}


