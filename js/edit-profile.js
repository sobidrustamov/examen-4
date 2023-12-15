addEventListener("DOMContentLoaded", async () => {
  let social = document.querySelector("#social-links");
  let links = document.querySelector(".links");
  let form = document.querySelector("form");

  axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api";

  social.addEventListener("click", () => {
    links.classList.toggle("hidden");
  });

  let response = await axios.get("/profile/me", {
    headers: {
      "x-auth-token": `${localStorage.token}`,
    },
  });

  console.log(response.data);

  form[0].value = response.data.status;
  form[1].value = response.data.company;
  form[2].value = response.data.website;
  form[3].value = response.data.location;
  form[4].value = response.data.skills;
  form[5].value = response.data.githubusername;
  form[6].value = response.data.bio;
  form[7].value = response.data.social.twitter;
  form[8].value = response.data.social.youtube;
  form[9].value = response.data.social.facebook;
  form[10].value = response.data.social.linkedin;
  form[11].value = response.data.social.instagram;
  
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
