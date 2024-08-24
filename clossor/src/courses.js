let courses = [
  { name: "", src: "./assets/courses/art.webp" },
  { name: "", src: "./assets/courses/chemistry.webp" },
  { name: "", src: "./assets/courses/biology.webp" },
  { name: "", src: "./assets/courses/css.webp" },
  { name: "", src: "./assets/courses/economy.webp" },
  { name: "", src: "./assets/courses/english.webp" },
  { name: "", src: "./assets/courses/history.webp" },
  { name: "", src: "./assets/courses/js.webp" },
  { name: "", src: "./assets/courses/math.webp" },
  { name: "", src: "./assets/courses/physics.webp" },
];
let parentElement = $.getElementById("coursesList");

let coursesListSection = $.getElementById("courses-list");
let courseDetailsSection = $.getElementById("course-details");
let backToListbtn = $.getElementById("back-to-courses-list");

courses.forEach((course) => {
  let baseCourse = $.getElementById("course");
  baseCourse.firstElementChild.src = course.src;
  let clonedCourse = baseCourse.cloneNode(true);
  clonedCourse.classList.remove("hidden");
  clonedCourse.classList.add("grid");
  clonedCourse.children[1].children[3].addEventListener("click", () => {
    coursesListSection.classList.add("hidden");
    courseDetailsSection.classList.remove("hidden");
    courseDetailsSection.classList.add("grid");

    const url = new URL(window.location.href);
    // Create URLSearchParams from the current URL
    const params = new URLSearchParams(url.search);
    // Append a new parameter
    params.append("courseId", "ab6111d7-6c90-4658-8f4e-24c753acfd36");
    // Update the URL without reloading the page
    url.search = params.toString();
    history.pushState({}, "", url);
  });
  parentElement.appendChild(clonedCourse);
});

backToListbtn.addEventListener("click", () => {
  coursesListSection.classList.remove("hidden");
  courseDetailsSection.classList.remove("grid");
  courseDetailsSection.classList.add("hidden");

  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  // Remove a parameter by its name
  params.delete("courseId");
  // Update the URL
  url.search = params.toString();
  history.pushState(null, "", url);
});

window.addEventListener("beforeunload", () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  // Remove a parameter by its name
  params.delete("courseId");
  // Update the URL
  url.search = params.toString();
  history.pushState(null, "", url);
});

window.addEventListener("popstate", function (event) {
  coursesListSection.classList.remove("hidden");
  courseDetailsSection.classList.remove("grid");
  courseDetailsSection.classList.add("hidden");
});
