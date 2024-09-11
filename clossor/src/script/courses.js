let parentElement = $.getElementById("coursesList");
let coursesListSection = $.getElementById("courses-list");
let courseDetailsSection = $.getElementById("course-details");
let backToListbtn = $.getElementById("back-to-courses-list");
let scrollPosition = 0;

async function getCourses() {
  let headers = new Headers();
  headers.append("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  headers.append("Access-Control-Allow-Credentials", "true");
  headers.append("Content-Type", "application/json");

  await fetch("http://localhost:5000/api/courses", (headers = headers))
    .then((res) => res.json())
    .then((data) => {
      let courses = data;
      courses.forEach((course) => {
        // create the source of image
        course.src = `./assets/courses/${course.title}.webp`;

        Create_and_add_CourseCard(course);
      });
    })
    .catch((err) => console.log("some thing went wrong: ", err));
}

getCourses();

async function Create_and_add_CourseCard(course) {
  // adding courses list cards:
  let baseCourse = $.getElementById("course");
  baseCourse.firstElementChild.src = course.src;

  // copy(or clone) the baseCourse:
  let clonedCourse = baseCourse.cloneNode(true);
  clonedCourse.classList.remove("hidden");
  clonedCourse.classList.add("grid");

  // Handle Show Course Details
  clonedCourse.children[1].children[3].addEventListener("click", (e) => {
    coursesListSection.classList.add("hidden");
    addQueryParams(course).then(() => getCurrentCourse());

    // save current position of the element
    scrollPosition = e.offsetY - 400;
  });
  clonedCourse.children[1].children[2].innerHTML = course.description;
  clonedCourse.children[1].children[1].innerHTML = course.title.toUpperCase();
  clonedCourse.children[1].children[1].href = `courses.html?courseId=${course.id}`;

  // add the card to the courses list:
  parentElement.appendChild(clonedCourse);
}

function handleCourseDetails(course) {
  // add information to the course details section:
  courseDetailsSection.children[0].children[1].children[0].children[0].src =
    course.src;
  courseDetailsSection.children[0].children[1].children[1].children[0].innerHTML =
    "Learn " + course.title + " Here";
  courseDetailsSection.children[0].children[1].children[1].children[1].innerHTML =
    course.title;
  courseDetailsSection.children[0].children[1].children[1].children[3].innerHTML =
    course.description;
  courseDetailsSection.children[1].children[0].src = course.src;

  // add register to the lesson:
  courseDetailsSection.children[0].children[1].children[1].children[4].addEventListener(
    "click",
    () => registerCourse(course),
  );
  // and finally show course details section:
  courseDetailsSection.classList.remove("hidden");
  courseDetailsSection.classList.add("grid");
}

backToListbtn.addEventListener("click", () => {
  // coursesListSection.classList.remove("hidden");
  // courseDetailsSection.classList.remove("grid");
  // courseDetailsSection.classList.add("hidden");

  // delete query params
  // deleteQueryParams();

  // Push a new state to the history
  history.pushState({ coursesList: true }, "coursesList", "./courses.html");
  // Create and dispatch a new popstate event
  const popStateEvent = new PopStateEvent("popstate", {
    state: { someData: "example" },
  });
  window.dispatchEvent(popStateEvent);
  // Now new state pushed to history and popstate event dispatched
});

// window.addEventListener("beforeunload", () => {
//   // delete query params
//   deleteQueryParams()
// });

// if (performance.navigation.type === 1) {
//   // delete query params
//   deleteQueryParams();
// }

function deleteQueryParams() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  // Remove a parameter by its name
  params.delete("courseId");
  // Update the URL
  url.search = params.toString();
  history.pushState(null, "", url);
}

async function addQueryParams(course) {
  // add query params:
  const url = new URL(window.location.href);
  // Create URLSearchParams from the current URL
  const params = new URLSearchParams(url.search);
  // Append a new parameter
  params.append("courseId", course.id);
  // Update the URL without reloading the page
  url.search = params.toString();
  history.pushState({}, "", url);
}

window.addEventListener("popstate", function (e) {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  let courseId = params.get("courseId");
  if (courseId !== null) {
    getCurrentCourse();
  } else {
    coursesListSection.classList.remove("hidden");
    courseDetailsSection.classList.remove("grid");
    courseDetailsSection.classList.add("hidden");
  }

  // it gets us back to previous course_card when we click on the back_button in course_details section
  window.scrollTo(0, scrollPosition);
});

async function registerCourse(course) {
  alert(
    `you have been added to this course...\nRegister Successfull\nNow You Can See More Details Of This Page...\n\n🌟🌟🌟🌟🌟\nCourse Name: ${course.title}`,
  );
}
