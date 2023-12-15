addEventListener("DOMContentLoaded", async () => {
  axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api";
  let main = document.querySelector("#main-register");
  let form = document.querySelector("form");
  let posts = document.querySelector("div");

  let logout = document.querySelector("#logout");
  logout.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.replace("/pages/login.html");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let text = form[0].value;

    let response = await axios.post(
      "/posts",
      { text },
      {
        headers: {
          "x-auth-token": `${localStorage.token}`,
        },
      }
    );
    e.target.reset();
  });

  let response = await axios.get("/posts", {
    headers: {
      "x-auth-token": `${localStorage.token}`,
    },
  });

  let responseData = response.data;
  responseData.forEach(async (post) => {
    let postWrapper = document.createElement("div");

    let postLink = document.createElement("a");
    postLink.setAttribute("href", "#");

    let postLink2 = document.createElement("a");
    postLink2.classList.add("w-75");

    let avatar = document.createElement("img");
    avatar.setAttribute("src", post.avatar);
    avatar.classList.add("rounded-circle");

    let userName = document.createElement("p");
    userName.innerText = post.name;

    postLink.append(avatar, userName);
    postLink.classList.add("text-center");

    let postText = document.createElement("p");
    let postDiscrip = document.createElement("span");
    let likes = document.createElement("div");
    let like = document.createElement("button");
    like.classList.add("btn", "btn-light", "px-3", "py-1", "my-2");
    like.innerHTML = `<i class="fas fa-thumbs-up"></i><span></span>`;
    let deslike = document.createElement("button");
    deslike.classList.add("btn", "btn-light", "px-3", "py-1", "my-2");
    deslike.innerHTML = `<i class="fas fa-thumbs-down"></i>`;
    let comment = document.createElement("button");
    comment.innerHTML = `Discussion <span></span>`;
    comment.classList.add("btn", "btn-info", "px-3", "py-1", "my-2");

    likes.append(like, deslike, comment);

    try {
      let response = await axios.get("/profile/me", {
        headers: {
          "x-auth-token": `${localStorage.token}`,
        },
      });
      if (response.data.user._id === post.user) {
        let delet = document.createElement("button");
        delet.classList.add("btn", "btn-danger", "px-3", "py-1", "my-2");
        delet.innerText = "delete post";
        likes.append(delet);

        delet.addEventListener("click", async () => {
          let response = await axios.delete(`/posts/${post._id}`, {
            headers: {
              "x-auth-token": `${localStorage.token}`,
            },
          });
          window.location.reload();
        });
      }
    } catch (error) {}
    likes.classList.add("d-flex", "gap-2", "w-100");
    postDiscrip.innerText = `Posted on`;
    postText.innerText = post.text;
    postText.classList.add("my-5", "fs-4");

    postLink2.append(postText, postDiscrip, likes);

    postWrapper.append(postLink, postLink2);
    postWrapper.classList.add(
      "d-flex",
      "my-3",
      "p-3",
      "justify-content-between",
      "border"
    );
    main.append(postWrapper);

    comment.addEventListener("click", async (e) => {
      main.innerHTML = "";

      let response = await axios.get(`/posts/${post._id}`, {
        headers: {
          "x-auth-token": `${localStorage.token}`,
        },
      });

      localStorage.setItem("postid", post._id);
      window.location.replace("/pages/post.html");
    });
  });

  console.log(responseData);
});
