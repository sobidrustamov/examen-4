addEventListener("DOMContentLoaded", async () => {
  axios.defaults.baseURL = "https://nt-devconnector.onrender.com/api";
  let main = document.querySelector("#main-register");
  let com = document.querySelector("#comment");
  let form = document.querySelector("form");
  main.innerHTML = `<a href="/pages/posts.html" class="btn btn-light">Back to Post</a>`;

  let response = await axios.get(`/posts`, {
    headers: {
      "x-auth-token": `${localStorage.token}`,
    },
  });

  let logout = document.querySelector("#logout");
  logout.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.replace("/pages/login.html");
  });

  let posts = response.data;

  posts.forEach(async (userpost) => {
    if (userpost._id === localStorage.postid) {
      let postWrapper = document.createElement("div");

      let postLink = document.createElement("a");
      postLink.setAttribute("href", "#");

      let postLink2 = document.createElement("a");
      postLink2.classList.add("w-75");

      let avatar = document.createElement("img");
      avatar.setAttribute("src", userpost.avatar);
      avatar.classList.add("rounded-circle");

      let userName = document.createElement("p");
      userName.innerText = userpost.name;

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
      likes.classList.add("d-flex", "gap-2", "w-100");
      postDiscrip.innerText = `Posted on`;
      postText.innerText = userpost.text;
      postText.classList.add("my-5", "fs-4");

      try {
        let response = await axios.get("/profile/me", {
          headers: {
            "x-auth-token": `${localStorage.token}`,
          },
        });
        if (response.data.user._id === userpost.user) {
          let delet = document.createElement("button");
          delet.classList.add("btn", "btn-danger", "px-3", "py-1", "my-2");
          delet.innerText = "delete post";
          likes.append(delet);

          delet.addEventListener("click", async () => {
            let response = await axios.delete(`/posts/${userpost._id}`, {
              headers: {
                "x-auth-token": `${localStorage.token}`,
              },
            });
            window.location.reload();
          });
        }
      } catch (error) {}

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

      let response = await axios.get(`/posts/${userpost._id}`, {
        headers: {
          "x-auth-token": `${localStorage.token}`,
        },
      });
      let comments = response.data.comments;
      comments.forEach(async (element) => {
        let commentdiv = document.createElement("div");
        commentdiv.classList.add(
          "bg-light",
          "my-4",
          "p-3",
          "justify-content-between",
          "d-flex"
        );
        let commentuser = document.createElement("div");
        let commenavatar = document.createElement("img");
        commenavatar.setAttribute("src", element.avatar);
        commenavatar.classList.add("rounded-circle");

        let commentuserName = document.createElement("h5");
        commentuserName.innerText = element.name;

        commentuser.append(commenavatar, commentuserName);
        commentuser.classList.add("text-center", "w-25");
        let commentinfo = document.createElement("div");
        let commenttext = document.createElement("p");
        commenttext.innerText = element.text;
        let commentdate = document.createElement("span");
        let time = new Date(element.date);
        commentdate.innerText = `Posted on ${time.toLocaleDateString()}`;

        commentinfo.append(commenttext, commentdate);
        commentinfo.classList.add("w-50", "mt-5");

        try {
          let response = await axios.get("/profile/me", {
            headers: {
              "x-auth-token": `${localStorage.token}`,
            },
          });
          if (response.data.user._id === userpost.user) {
            let delet = document.createElement("button");
            delet.classList.add("btn", "btn-danger", "px-3", "py-1", "my-2");
            delet.innerText = "delete";
            commentinfo.append(delet);

            // delet.addEventListener("click", async () => {
            //   let response = await axios.delete(`/posts/${userpost._id}`, {
            //     headers: {
            //       "x-auth-token": `${localStorage.token}`,
            //     },
            //   });
            //   window.location.reload();
            // });
          }
        } catch (error) {}

        commentdiv.append(commentuser, commentinfo);
        com.append(commentdiv);
        console.log(element);

        // let commentinfo = document.createElement("div");
      });
      console.log(response.data.comments);
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let text = form[0].value;
      let response = await axios.post(
        `/posts/comment/${userpost._id}`,
        { text },
        {
          headers: {
            "x-auth-token": `${localStorage.token}`,
          },
        }
      );
      e.target.reset();
    });

    // window.location.reload();
    let commentdiv = document.createElement("div");
  });
});
