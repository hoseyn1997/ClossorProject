new Swiper("#swiper-1", {
  effect: "slide",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
  autoplay: {
    delay: 5000,
  },
  speed: 700,
  lazyLoadin: true,
  allowTouchMove: false,
});

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
      });

      let swiperSlide1 = $.getElementById("swiper-part-1");
      let swiperSlide2 = $.getElementById("swiper-part-2");
      let topCourses = $.getElementById("index-top-coures");

      for (let index = 0; index < 6; index++) {
        addCoursesToSlide(swiperSlide1, courses[index]);
      }
      for (let index = 6; index < 12; index++) {
        addCoursesToSlide(swiperSlide2, courses[index]);
      }
      for (let index = 12; index < 16; index++) {
        addTopCourses(topCourses, courses[index]);
      }
    })
    .catch((err) => console.log("some thing went wrong: ", err));
}

getCourses();

function addCoursesToSlide(slideMainElem, course) {
  let card = document.createElement("a");
  card.classList.add("relative", "swiper-item");
  card.href = `courses.html?courseId=${course.id}`;

  let first_card_elem = document.createElement("div");
  first_card_elem.classList.add(
    "absolute",
    "bottom-3",
    "left-3",
    "z-10",
    "text-white",
  );
  first_card_elem.innerHTML = course.title;

  let last_card_elem = document.createElement("img");
  last_card_elem.src = course.src;
  last_card_elem.alt = course.title;
  last_card_elem.classList.add(
    "col-span-1",
    "h-64",
    "w-full",
    "rounded",
    "object-cover",
  );

  card.appendChild(first_card_elem);
  card.appendChild(last_card_elem);
  slideMainElem.appendChild(card);
}

function addTopCourses(MainContainer, course) {
  let card = document.createElement("div");
  card.classList.add(
    "grid",
    "grid-cols-2",
    "items-center",
    "gap-3",
    "font-bold",
  );

  let image = document.createElement("img");
  image.classList.add("top_coursesImage");
  image.src = course.src;
  image.alt = course.title;

  let last_card_Child = document.createElement("div");
  let courseTitle = document.createElement("p");
  courseTitle.classList.add("text-sm", "md:text-xl");
  courseTitle.innerHTML = course.title;
  let courseDescription = document.createElement("a");
  courseDescription.classList.add("Just4Rows", "top_courses_description");
  courseDescription.href = `courses.html?courseId=${course.id}`;
  courseDescription.innerHTML = course.description;
  last_card_Child.appendChild(courseTitle);
  last_card_Child.appendChild(courseDescription);

  card.appendChild(image);
  card.appendChild(last_card_Child);
  MainContainer.appendChild(card);
}
