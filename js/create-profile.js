addEventListener("DOMContentLoaded", () => {
  let social = document.querySelector("#social-links");
  let links = document.querySelector(".links");
  let form = document.querySelector("form");

  let logout = document.querySelector("#logout");
  logout.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.replace("/pages/login.html");
  });

  axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api";

  social.addEventListener("click", () => {
    links.classList.toggle("hidden");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let status = form[0].value;
    let company = form[1].value;
    let website = form[2].value;
    let location = form[3].value;
    let skills = form[4].value;
    let githubusername = form[5].value;
    let bio = form[6].value;
    let twitter = form[7].value;
    let youtube = form[8].value;
    let facebook = form[9].value;
    let linkedin = form[10].value;
    let instagram = form[11].value;
    console.log(status);

    let userInfo = {
      status,
      company,
      website,
      location,
      skills,
      githubusername,
      bio,
      twitter,
      youtube,
      facebook,
      linkedin,
      instagram,
    };

    let res = await axios.post("/profile", userInfo, {
      headers: {
        "x-auth-token": `${localStorage.token}`,
      },
    });
    console.log(res.data);
    window.location.replace("/pages/dashboard.html");
  });
});
