function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.add("hidden");
  });
  document.getElementById(id).classList.remove("hidden");
}

function updateStats() {
  const posts = getPosts();

  document.getElementById("totalPosts").innerText = posts.length;
  document.getElementById("publishedPosts").innerText =
    posts.filter(p => p.status === "published").length;
  document.getElementById("draftPosts").innerText =
    posts.filter(p => p.status === "draft").length;
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

function showUser() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  document.getElementById("userInfo").innerText =
    `${user.username} (${user.role})`;
}

showUser();
renderPosts();
updateStats();
