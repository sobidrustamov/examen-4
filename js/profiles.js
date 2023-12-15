addEventListener("DOMContentLoaded", async () => {
  axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api";
  let main = document.querySelector("#main-register");

  let res = await axios.get("/profile");

  res.data.forEach((profile) => {
    let profileDiv = document.createElement("div");
    profileDiv.classList.add(
      "bg-light",
      "my-4",
      "p-3",
      "justify-content-between",
      "d-flex"
    );

    let left = document.createElement("div");
    left.classList.add("d-flex", "gap-5", "align-items-center");

    let img = document.createElement("img");
    img.classList.add("rounded-circle");
    img.setAttribute("width", "300");
    img.setAttribute("height", "300");
    img.setAttribute("src", profile.user.avatar);

    let info = document.createElement("div");
    let name = document.createElement("h4");
    name.innerText = profile.user.name;
    let jobComp = document.createElement("p");
    jobComp.innerText = " at ";
    let job = document.createElement("span");
    job.innerText = profile.status;
    let company = document.createElement("span");
    company.innerText = profile.company;
    jobComp.prepend(job);
    jobComp.append(company);

    let location = document.createElement("p");
    location.innerText = profile.location;

    let btn = document.createElement("a");
    btn.classList.add("btn", "btn-info", "rounded-0", "text-white");
    btn.innerText = "View Profile";

    let right = document.createElement("div");
    right.classList.add("w-25", "my-auto");

    let skills = document.createElement("p");

    if (profile.skills) {
      for (let i = 0; i < profile.skills.length; i++) {
        skills.innerHTML += `<i class="fas fa-check"></i> ${profile.skills[i]} <br>`;
      }
    }

    skills.classList.add("text-info", "text-capitalize", "fs-5");

    right.append(skills);

    info.append(name, jobComp, location, btn);
    left.append(img, info);
    profileDiv.append(left, right);
    main.append(profileDiv);

    btn.addEventListener("click", async () => {
      main.innerHTML = `<a href="/pages/profiles.html" class="btn btn-light rounded-0">Back to Profiles</a>`;
      try {
        let response = await axios.get("/profile/me", {
          headers: {
            "x-auth-token": `${localStorage.token}`,
          },
        });

        response.data._id === profile._id
          ? (main.innerHTML += `<a href="/pages/edit-profile.html" class="btn btn-dark mx-3 rounded-0">Edit Profile</a>`)
          : "";
      } catch (error) {}

      let profileDiv = document.createElement("div");
      profileDiv.classList.add("bg-light", "p-3", "text-center", "border");

      let head = document.createElement("div");
      head.classList.add(
        "bg-info",
        "my-3",
        "py-5",
        "text-center",
        "text-white"
      );

      let img = document.createElement("img");
      img.classList.add("rounded-circle", "my-2");
      img.setAttribute("width", "300");
      img.setAttribute("height", "300");
      img.setAttribute("src", profile.user.avatar);

      let name = document.createElement("h3");
      name.innerText = profile.user.name;

      let jobComp = document.createElement("p");
      jobComp.innerText = " at ";
      let job = document.createElement("span");
      job.innerText = profile.status;
      let company = document.createElement("span");
      company.innerText = profile.company;
      jobComp.prepend(job);
      jobComp.append(company);

      let location = document.createElement("p");
      location.innerText = profile.location;

      let links = document.createElement("div");
      if (profile.social) {
        let i = 0;
        for (let x in profile.social) {
          i++;
          profile.social[x] && i === 1
            ? (links.innerHTML += `<a href="${profile.social[x]}" class="social mx-2" target="_blank">
          <i class="fab fa-youtube fa-2x"></i>
          </a>`)
            : profile.social[x] && i === 2
            ? (links.innerHTML += `<a href="${profile.social[x]}" class="social mx-2" target="_blank">
          <i class="fab fa-twitter fa-2x"></i>
          </a>`)
            : profile.social[x] && i === 3
            ? (links.innerHTML += `<a href="${profile.social[x]}" class="social mx-2" target="_blank">
          <i class="fab fa-instagram fa-2x"></i>
          </a>`)
            : profile.social[x] && i === 4
            ? (links.innerHTML += `<a href="${profile.social[x]}" class="social mx-2" target="_blank">
          <i class="fab fa-linkedin fa-2x"></i>
          </a>`)
            : profile.social[x] && i === 5
            ? (links.innerHTML += `<a href="${profile.social[x]}" class="social mx-2" target="_blank">
          <i class="fab fa-facebook fa-2x"></i>
          </a>`)
            : (links.innerHTML += "");
        }
      }

      let bio = document.createElement("h3");
      let biotext = document.createElement("p");
      if (profile.bio) {
        bio.classList.add("text-info");
        bio.innerText = `${profile.user.name}s Bio`;
        biotext.innerText = profile.bio;
      }

      let hr = document.createElement("hr");
      hr.classList.add("my-4");

      let title = document.createElement("h3");
      let skill = document.createElement("h4");
      title.classList.add("text-info");
      skill.classList.add("mx-3");
      if (profile.skills) {
        for (let i = 0; i < profile.skills.length; i++) {
          skill.innerHTML += `<span class="mx-3"><i class="fas fa-check"></i> ${profile.skills[i]} </span>`;
        }
      }

      let expedu = document.createElement("div");
      expedu.classList.add("d-flex", "gap-3", "my-4");
      let exp = document.createElement("div");
      exp.classList.add("p-5", "w-50", "border");
      let exptitle = document.createElement("h3");
      exptitle.classList.add("text-info");
      exptitle.innerText = "Experience";
      let edu = document.createElement("div");
      edu.classList.add("p-5", "w-50", "border");
      let edutitle = document.createElement("h3");
      edutitle.classList.add("text-info");
      edutitle.innerText = "Education";
      edu.append(edutitle);

      if (profile.experience) {
        profile.experience.forEach((element, index) => {
          let comp = document.createElement("p");
          let jobname = document.createElement("p");
          let discrp = document.createElement("p");
          let location2 = document.createElement("p");
          let td3 = document.createElement("p");
          comp.innerText = `Company: ${element.company}`;
          jobname.innerText = `Position: ${element.title}`;
          location2.innerText = `Location: ${element.location}`;
          discrp.innerText = `Desciption: ${element.description}`;
          let from = new Date(element.from);
          let to = new Date(element.to);
          td3.innerText = `${from.toLocaleDateString()}-${
            element.current === true ? "Now" : to.toLocaleDateString()
          }`;
          if (index > 0) {
            let hr = document.createElement("hr");
            exp.append(hr);
          }
          exp.append(comp, td3, jobname, location2, discrp);
          expedu.append(exp);
        });
      }

      if (profile.education) {
        profile.education.forEach((element, index) => {
          let comp = document.createElement("p");
          let jobname = document.createElement("p");
          let discrp = document.createElement("p");
          let location2 = document.createElement("p");
          let td3 = document.createElement("p");
          comp.innerText = `School: ${element.school}`;
          jobname.innerText = `Degree: ${element.degree}`;
          location2.innerText = `Faild of Study: ${element.fieldofstudy}`;
          discrp.innerText = `Description: ${element.description}`;
          let from = new Date(element.from);
          let to = new Date(element.to);
          td3.innerText = `${from.toLocaleDateString()}-${
            element.current === true ? "Now" : to.toLocaleDateString()
          }`;
          if (index > 0) {
            let hr = document.createElement("hr");
            edu.append(hr);
          }
          edu.append(comp, td3, jobname, location2, discrp);
          expedu.append(edu);
        });
      }
      exp.prepend(exptitle);
      edu.prepend(edutitle);

      head.append(img, name, jobComp, location, links);
      profileDiv.append(bio, biotext, hr, title, skill);

      console.log(profile.experience);

      let gittitle = document.createElement("h3");
      let repodiv = document.createElement("div");
      try {
        let response = await axios.get(
          `/profile/github/${profile.githubusername}`,
          {
            headers: {
              "x-auth-token": `${localStorage.token}`,
            },
          }
        );
        gittitle.innerText = "Github Repos";
        gittitle.classList.add("text-info");

        response.data.forEach((repo) => {
          repodiv.classList.add("p-2");
          let repolink = document.createElement("a");
          let rep = document.createElement("div");

          repolink.setAttribute("href", repo.git_url);
          repolink.innerText = repo.name;
          repolink.classList.add("text-info");
          rep.append(repolink);
          rep.classList.add("p-3", "border", "my-3");
          repodiv.append(rep);
        });

        console.log(response);
      } catch (error) {}
      main.append(head, profileDiv, expedu, gittitle, repodiv);
    });
  });
});
