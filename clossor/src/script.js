let $ = document;
let button = $.getElementById("toggle");
let toaster = $.getElementById("toaster");
let sidebar = $.getElementById("side-bar");
let theme = localStorage.getItem("theme");
let is_logged_in = false;
let current_user = "";

is_logged_in = !!localStorage.getItem("Token") ? true : false;

if (is_logged_in) get_current_user();
async function get_current_user() {
  let headers = new Headers();
  headers.append("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  headers.append("Access-Control-Allow-Credentials", "true");
  headers.append("Content-Type", "application/json");

  headers.append("Authorization", `Bearer ${localStorage.getItem("Token")}`);
  await fetch("http://localhost:5000/api/account", {
    headers: headers,
  })
    .then((res) => res.json())
    .then((data) => {
      current_user = data.username;
      document.getElementById("authontication").innerHTML =
        `<p class='text-xl font-bold dark:text-white hover:scale-110 transition-all cursor-pointer'>${current_user}</p>`;
    });
}

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
