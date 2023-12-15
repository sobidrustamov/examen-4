addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector("form");

  let logout = document.querySelector("#logout");
  logout.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.replace("/pages/login.html");
  });
  axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let title = form[0].value;
    let company = form[1].value;
    let location = form[2].value;
    let from = form[3].value;
    let checkbox = form[4].value;
    let to = form[5].value;
    let description = form[6].value;

    let addExp = {
      title,
      company,
      location,
      from,
      to,
      description,
    };

    let res = await axios.put("/profile/experience", addExp, {
      headers: {
        "x-auth-token": `${localStorage.token}`,
      },
    });
    console.log(res.data);
    window.location.replace("/pages/dashboard.html");
  });
});
