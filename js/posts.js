function addPost() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (user.role === "viewer") {
    alert("Viewers cannot create posts");
    return;
  }

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const status = document.getElementById("status").value;

  if (!title || !content) {
    alert("All fields required");
    return;
  }

  const posts = getPosts();

  posts.push({
    id: Date.now(),
    title,
    content,
    status,
    author: user.username
  });

  savePosts(posts);
  renderPosts();
  updateStats();
}

function renderPosts() {
  const list = document.getElementById("postList");
  list.innerHTML = "";

  getPosts().forEach(post => {
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${post.title}</strong> (${post.status})
      <br>By: ${post.author}
      <button onclick="deletePost(${post.id})">Delete</button>
    `;

    list.appendChild(li);
  });
}

function deletePost(id) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user.role !== "admin") {
    alert("Only admin can delete posts");
    return;
  }

  let posts = getPosts();
  posts = posts.filter(p => p.id !== id);

  savePosts(posts);
  renderPosts();
  updateStats();
}
