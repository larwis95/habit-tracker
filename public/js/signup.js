const signupForm = document.querySelector(".signupForm");

const handleSignup = async (event) => {
  event.preventDefault();
  const username = document.querySelector("#usernameSignup").value;
  const email = document.querySelector("#emailSignup").value;
  const password = document.querySelector("#passwordSignup").value;
  console.log(username, email, password)
  if (username && email && password) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      header: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/");
    }
  }
};

signupForm.addEventListener("submit", handleSignup);
