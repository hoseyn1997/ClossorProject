let form = $.getElementById("contact-us");
let submit_form = $.getElementById("send-contact-us");

submit_form.addEventListener("click", () => {
  let data = new FormData(form);
  console.log({
    name: data.get("name"),
    email: data.get("email"),
    subject: data.get("subject"),
    message: data.get("message"),
  });
});