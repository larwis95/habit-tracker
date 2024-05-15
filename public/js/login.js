const loginForm = document.querySelector(".loginForm");

const handleLogin = async(event) => {
  event.preventDefault()
  const email = document.querySelector("#emailinput").value
  const password = document.querySelector("#passwordinput").value
  if (!email && !password) return;
  const response = await fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" }
  })
  if (response.ok) {
<<<<<<< HEAD
    document.location.replace('/');
=======
    document.location.replace('/dashboard');
>>>>>>> main
  }
};

loginForm.addEventListener("submit", handleLogin);
