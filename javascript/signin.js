let isEmailValid = false;
let isPasswordValid = false;

/*이메일 설정 */
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");

emailInput.addEventListener("blur", function () {
  const email = emailInput.value.trim();

  if (!email) {
    displayEmailError("이메일을 입력해주세요.");
    isEmailValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    displayEmailError("잘못된 이메일 형식입니다.");
    isEmailValid = false;
  } else {
    clearEmailError();
    isEmailValid = true;
  }
  manageLoginButton();
});

function displayEmailError(message) {
  emailInput.classList.add("error");
  emailError.textContent = message;
  emailError.style.display = "block";
}

function clearEmailError() {
  emailInput.classList.remove("error");
  emailError.textContent = "";
  emailError.style.display = "none";
}

/*비밀번호 설정 */
const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("passwordError");

passwordInput.addEventListener("blur", function () {
  const password = passwordInput.value.trim();

  if (!password) {
    displayPasswordError("비밀번호를 입력해주세요.");
    isPasswordValid = false;
  } else if (password.length < 8) {
    displayPasswordError("비밀번호를 8자 이상 입력해주세요.");
    isPasswordValid = false;
  } else {
    clearPasswordError();
    isPasswordValid = true;
  }
  manageLoginButton();
});

function displayPasswordError(message) {
  passwordInput.classList.add("error");
  passwordError.textContent = message;
  passwordError.style.display = "block";
}

function clearPasswordError() {
  passwordInput.classList.remove("error");
  passwordError.textContent = "";
  passwordError.style.display = "none";
}

const loginButton = document.getElementById("loginButton");
loginButton.disabled = true;
function manageLoginButton() {
  if (isEmailValid && isPasswordValid) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}
loginButton.addEventListener("click", function () {
  window.location.href = "../index.html";
});

const passwordVisibility = document.getElementById("passwordVisibility");
passwordVisibility.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passwordVisibility.src = "../images/eyeon.svg";
  } else {
    passwordInput.type = "password";
    passwordVisibility.src = "../images/eyeoff.svg";
  }
});
