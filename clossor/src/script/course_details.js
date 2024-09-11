window.onload = async function () {
  $.getElementById("Loader")?.classList.add("hidden");
  await getCurrentCourse();
};

async function getCurrentCourse() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  let courseId = params.get("courseId");

  // get course using courseId
  let headers = new Headers();
  headers.append("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  headers.append("Access-Control-Allow-Credentials", "true");
  headers.append("Content-Type", "application/json");
  if (courseId != null)
    await fetch(
      `http://localhost:5000/api/courses/${courseId}`,
      (headers = headers),
    )
      .then((res) => res.json())
      .then((data) => {
        let current_course = data;
        current_course.src = `./assets/courses/${current_course.title}.webp`;
        // show that course:
        coursesListSection.classList.add("hidden");
        handleCourseDetails(current_course);
      })
      .catch((err) => console.log("some thing went wrong: ", err));
}
