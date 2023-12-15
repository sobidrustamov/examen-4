addEventListener("DOMContentLoaded", async () => {
  axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api";

  let welcome = document.querySelector("#welcome");
  let wel = document.querySelector("#wel");
  let create = document.querySelector("#create");
  let profileInfo = document.querySelector("#profile-info");
  
  console.log(localStorage.token);
  let logout = document.querySelector("#logout");
  logout.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.replace("/pages/login.html");
  });

  let res = await axios.get("/auth", {
    headers: {
      "x-auth-token": `${localStorage.token}`,
    },
  });

  let obj = res.data;

  try {
    let response = await axios.get("/profile/me", {
      headers: {
        "x-auth-token": `${localStorage.token}`,
      },
    });

    profileInfo.classList.remove("d-none");

    console.log(response.data);

    let data = response.data;
    welcome.innerHTML += `Welcome ${obj.name}`;

    data.experience.forEach((exp) => {
      let tbody = document.querySelector("#ex-body");
      let tr = document.createElement("tr");
      let td2 = document.createElement("td");
      let td1 = document.createElement("td");
      let td3 = document.createElement("td");
      let td4 = document.createElement("td");
      let del = document.createElement("button");
      td1.innerText = exp.company;
      td2.innerText = exp.title;
      let from = new Date(exp.from);
      let to = new Date(exp.to);
      td3.innerText = `${from.toLocaleDateString()}-${
        exp.current === true ? "Now" : to.toLocaleDateString()
      }`;
      del.classList.add("btn", "btn-danger", "rounded-0");
      del.innerText = "Delete";
      td4.append(del);
      tr.append(td1, td2, td3, td4);
      tbody.append(tr);

      del.addEventListener("click", async () => {
        await axios.delete(`/profile/experience/${exp._id}`, {
          headers: {
            "x-auth-token": `${localStorage.token}`,
          },
        });
        tr.remove();
      });
    });

    data.education.forEach((edu) => {
      let eduTbody = document.querySelector("#edu-body");
      let tr = document.createElement("tr");
      let td2 = document.createElement("td");
      let td1 = document.createElement("td");
      let td3 = document.createElement("td");
      let td4 = document.createElement("td");
      let del = document.createElement("button");
      td1.innerText = edu.school;
      td2.innerText = edu.degree;
      let from = new Date(edu.from);
      td3.innerText = `${from.toLocaleDateString()}-${
        edu.current === false ? new Date().toLocaleDateString() : "now"
      }`;
      del.classList.add("btn", "btn-danger", "rounded-0");
      del.innerText = "Delete";
      td4.append(del);
      tr.append(td1, td2, td3, td4);
      eduTbody.append(tr);

      del.addEventListener("click", async () => {
        await axios.delete(`/profile/education/${edu._id}`, {
          headers: {
            "x-auth-token": `${localStorage.token}`,
          },
        });
        tr.remove();
      });
    });

    let deleteAccount = document.createElement("button");
    deleteAccount.classList.add("btn", "btn-danger", "rounded-0", "my-5");
    deleteAccount.innerText = "Delete Account";
    profileInfo.append(deleteAccount);

    deleteAccount.addEventListener("click", async () => {
      await axios.delete("/profile", {
        headers: {
          "x-auth-token": localStorage.token,
        },
      });
      window.location.replace("/pages/login.html");
    });
  } catch (error) {
    create.classList.remove("d-none");
    wel.innerHTML += `Welcome ${obj.name}`;
  }

  // console.log(obj);
});
