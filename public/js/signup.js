const signupBtn = document.querySelector("#signupBtn");
const signupForm = document.querySelector(".loginForm");
const handleSignup = async (event) => {
  console.log(signupForm);
  event.preventDefault();
  const username = document.querySelector("#usernameSignup").value.trim();
  const email = document.querySelector("#emailSignup").value.trim();
  const password = document.querySelector("#passwordSignup").value.trim();
  if (username && email && password) {
    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      console.log("here");
      const errorEl2 = document.createElement("p");
      const error2 = await response.json();
      errorEl2.textContent = error2.message;
      signupForm.appendChild(errorEl2);
      setTimeout(() => {
        errorEl2.remove();
    }, 4000);
  }
}
};

signupBtn.addEventListener("click", handleSignup);
