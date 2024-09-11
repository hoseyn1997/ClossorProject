let login_form = document.getElementById("login-form");
let login_button = document.getElementById("login-button");

let register_from = document.getElementById("signUp-form");
let register_btn = document.getElementById("signUp-form");

register_from.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = new FormData(register_from);
  registerTo(
    data.get("email"),
    data.get("username"),
    data.get("password"),
  ).then(get_current_user());
});

login_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = new FormData(login_form);
  login(data.get("username"), data.get("password")).then(() =>
    get_current_user(),
  );
});

// handle login
async function login(username, password) {
  let login_btn = $.getElementById("login-button");
  openLoader(login_btn);

  //connect_login
  await loginTo(username, password).then((data) => {
    if (data.status != 401) {
      localStorage.setItem("Token", data.token);
      areLoggedIn();
    } else console.log("error happened", data);

    if (!!localStorage.getItem("Token")) {
      // toast open
      toaster.classList.remove("h-0", "w-0");
      toaster.classList.add("h-10", "w-36");
      toaster.firstElementChild.innerText = "loggin successful";

      setTimeout(() => {
        //toast close
        toaster.classList.remove("h-10", "w-36");
        toaster.classList.add("h-0", "w-0");
      }, 2000);
    }
    closeLoader(login_btn);
  });
}

async function register(email, username, password) {
  let register_result = undefined;

  let headers = new Headers();
  headers.append("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  headers.append("Access-Control-Allow-Credentials", "true");
  headers.append("Content-Type", "application/json");

  await fetch("http://localhost:5000/api/account/register", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      email: email,
      username: username,
      password: password,
    }),
  }).then((res) => {
    register_result = res.json();
    register_result.statusCode = res.status;
  });
  return register_result;
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

function openLoader(item) {
  //loader open
  item.firstElementChild.classList.add("hidden");
  item.childNodes[3].classList.remove("hidden");
  item.lastElementChild.classList.add("hidden");
}
function closeLoader(item) {
  //loader close
  item.firstElementChild.classList.remove("hidden");
  item.childNodes[3].classList.add("hidden");
  item.lastElementChild.classList.remove("hidden");
}

async function loginTo(username, password) {
  let login_info = undefined;
  let headers = new Headers();
  headers.append("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  headers.append("Access-Control-Allow-Credentials", "true");
  headers.append("Content-Type", "application/json");

  await fetch("http://localhost:5000/api/account/login", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }).then((res) => (login_info = res.json()));
  return login_info;
}

async function registerTo(email, username, password) {
  openLoader(register_btn);
  await register(email, username, password).then((data) => {
    console.log(data.status);
    if (data.status != 400) {
      localStorage.setItem("Token", data.token);
      areLoggedIn();
    } else console.log("error happened", data);

    if (!!localStorage.getItem("Token")) {
      // toast open
      toaster.classList.remove("h-0", "w-0");
      toaster.classList.add("h-10", "w-36");
      toaster.firstElementChild.innerText = "register successful";

      setTimeout(() => {
        //toast close
        toaster.classList.remove("h-10", "w-36");
        toaster.classList.add("h-0", "w-0");
      }, 2000);
    }
    closeLoader(register_btn);
  });
}
