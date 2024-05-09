const signupForm = document.querySelector(".signupForm");

const handleSignup = async (event) => {
  event.preventDefault();
  const email = document.querySelector("#emailSignup").val.trim();
  const password = document.querySelector("#passwordSignup").val.trim();
  if (email && password) {
    const response = await fetch("api/userApi", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      header: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/");
    }
  }
};

signupForm.addEventListener("submit", handleSignup);
