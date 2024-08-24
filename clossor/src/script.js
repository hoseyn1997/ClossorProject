let $ = document;
let button = $.getElementById("toggle");
let toaster = $.getElementById("toaster");
let sidebar = $.getElementById("side-bar");
let theme = localStorage.getItem("theme");

window.onload = function () {
  $.getElementById("Loader")?.classList.add("hidden");
};

if (theme == "dark") {
  $.documentElement.classList.add("dark");
} else if (theme === "light") {
  $.documentElement.classList.remove("dark");
}

// change theme
button.addEventListener("click", () => {
  $.documentElement.classList.toggle("dark");
  let current_theme = localStorage.getItem("theme");
  if (current_theme === "dark") {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});

//handle invalid username
let invalidUsername_items = [
  "$",
  ".",
  "#",
  "@",
  "!",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "+",
  "=",
  "?",
  "/",
  "<",
  ">",
  "~",
  "`",
  "'",
  ";",
  ":",
  '"',
  "|",
  "\\",
];
function handleUsername(e) {
  if (invalidUsername_items.includes(e.key)) {
    e.preventDefault();
  }
}

// handle login
function login() {
  let login_btn = $.getElementById("login-button");

  //loader open
  login_btn.firstElementChild.classList.add("hidden");
  login_btn.childNodes[3].classList.remove("hidden");
  login_btn.lastElementChild.classList.add("hidden");

  //toast open
  toaster.classList.remove("h-0", "w-0");
  toaster.classList.add("h-10", "w-36");
  toaster.firstElementChild.innerText = "loggin successful";

  setTimeout(() => {
    //toast close
    toaster.classList.remove("h-10", "w-36");
    toaster.classList.add("h-0", "w-0");

    //loader close
    login_btn.firstElementChild.classList.remove("hidden");
    login_btn.childNodes[3].classList.add("hidden");
    login_btn.lastElementChild.classList.remove("hidden");
  }, 2000);
}
//handle signUp
function signUp() {
  let signUp_btn = $.getElementById("signUp-button");

  //loader open
  signUp_btn.firstElementChild.classList.add("hidden");
  signUp_btn.childNodes[3].classList.remove("hidden");
  signUp_btn.lastElementChild.classList.add("hidden");

  //open toaster
  toaster.classList.remove("h-0", "w-0");
  toaster.classList.add("h-10", "w-36");
  toaster.firstElementChild.innerText = "singUp successful";

  setTimeout(() => {
    //close toaster
    toaster.classList.remove("h-10", "w-36");
    toaster.classList.add("h-0", "w-0");

    //loader close
    signUp_btn.firstElementChild.classList.remove("hidden");
    signUp_btn.childNodes[3].classList.add("hidden");
    signUp_btn.lastElementChild.classList.remove("hidden");
  }, 2000);
}
function handleSignMode(predicate) {
  let signUp = document.getElementById("signUp-form");
  let login = document.getElementById("login-form");
  if (predicate === "login") {
    signUp.classList.remove("grid");
    signUp.classList.add("hidden");
    login.classList.remove("hidden");
    login.classList.add("grid");
  }
  if (predicate === "signUp") {
    signUp.classList.add("grid");
    signUp.classList.remove("hidden");
    login.classList.add("hidden");
    login.classList.remove("grid");
  }
}

function sidebar_handle() {
  if (sidebar.getAttribute("open") === "false") {
    sidebar.classList.remove("-left-very");
    sidebar.classList.add("left-0");
    sidebar.setAttribute("open", "true");
  } else if (sidebar.getAttribute("open") === "true") {
    sidebar.classList.add("-left-very");
    sidebar.classList.remove("left-0");
    sidebar.setAttribute("open", "false");
  }
}

let prevScrollpos = 50;
let backToTop = $.getElementById("back-to-top");
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos < currentScrollPos) {
    backToTop.classList.remove("lg:hidden");
    backToTop.classList.add("lg:block");
  } else {
    backToTop.classList.add("lg:hidden");
    backToTop.classList.remove("lg:block");
  }
}
