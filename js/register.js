addEventListener("DOMContentLoaded", () => {
  axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api";
  let form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let name = form[0].value;
    let email = form[1].value;
    if (form[2].value === form[3].value) {
      let password = form[2].value;

      let newUser = { name, email, password };
      let {
        data: { token },
      } = await axios.post("/users", newUser);
      console.log(token);
      localStorage.setItem("token", token);
    }

    window.location.replace("dashboard.html")
  });
});
