addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector("form");

  axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let school = form[0].value;
    let degree = form[1].value;
    let fieldofstudy = form[2].value;
    let from = form[3].value;
    let checkbox = form[4].value;
    let to = form[5].value;
    // checkbox.value === true
    //   ? (to = new Date(Date.now()).toLocaleDateString())
    //   : (to = form[5].value);

    let addExp = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
    };


    let res = await axios.put("/profile/education", addExp, {
      headers: {
        "x-auth-token": `${localStorage.token}`,
      },
    });
    window.location.replace("/pages/dashboard.html");
  });
});
