function register() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let exists = users.find(u => u.username === username);

    if (exists) {
        alert("Username already exists!");
        return;
    }

    users.push({
        username: username,
        password: password
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created!");
}

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(
        u => u.username === username &&
        u.password === password
    );

    if (user) {
        localStorage.setItem("currentUser", username);
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        alert("Invalid login!");
    }
}

function addPost() {
    let user = localStorage.getItem("currentUser");

    if (!user) {
        alert("Please login first.");
        return;
    }

    let text = document.getElementById("postText").value;

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.unshift({
        user: user,
        text: text
    });

    localStorage.setItem("posts", JSON.stringify(posts));

    loadPosts();
}

function loadPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    let container = document.getElementById("posts");

    if (!container) return;

    container.innerHTML = "";

    posts.forEach(post => {
        container.innerHTML += `
            <div class="post">
                <strong>${post.user}</strong><br>
                ${post.text}
            </div>
        `;
    });
}

window.onload = loadPosts;