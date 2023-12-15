addEventListener("DOMContentLoaded", async () => {
  let form = document.querySelector("form");
  axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let email = form[0].value;
    let password = form[1].value;

    let loginUser = { email, password };
    let {
      data: { token },
    } = await axios.post("/auth", loginUser);

    localStorage.setItem("token", token);
    window.location.replace("/pages/dashboard.html");
  });
});
