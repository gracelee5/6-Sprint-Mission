let isEmailValid = false;
let isNicknameValid = false;
let isPasswordValid = false;
let isPasswordCheckValid = false;

/*이메일 설정 */
const emailInput = document.getElementById("emailInput");
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
  manageSignUpButton();
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
/*닉네임 설정 */
const nicknameInput = document.getElementById("nickname");
const nicknameError = document.getElementById("nicknameError");
nicknameInput.addEventListener("blur", function () {
  const nickname = nicknameInput.value.trim();

  if (!nickname) {
    nicknameInput.classList.add("error");
    nicknameError.textContent = "닉네임을 입력해주세요.";
    nicknameError.style.display = "block";
    isNicknameValid = false;
  } else {
    nicknameInput.classList.remove("error");
    nicknameError.textContent = "";
    nicknameError.style.display = "none";
    isNicknameValid = true;
  }
  manageSignUpButton();
});
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
  manageSignUpButton();
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
/*비밀번호 확인 설정 */
const passwordCheckInput = document.getElementById("passwordCheck");
const passwordCheckError = document.getElementById("passwordCheckError");

passwordCheckInput.addEventListener("blur", function () {
  const passwordCheck = passwordCheckInput.value.trim();
  const password = passwordInput.value.trim();

  if (passwordCheck !== password) {
    passwordCheckInput.classList.add("error");
    passwordCheckError.textContent = "비밀번호가 일치하지 않습니다.";
    passwordCheckError.style.display = "block";
    isPasswordCheckValid = false;
  } else {
    passwordCheckInput.classList.remove("error");
    passwordCheckError.textContent = "";
    passwordCheckError.style.display = "none";
    isPasswordCheckValid = true;
  }
  manageSignUpButton();
});
function increaseCounter() {
  validationCounter++;
  checkValidationCounter();
}

function decreaseCounter() {
  validationCounter--;
  checkValidationCounter();
}

const signUpButton = document.getElementById("signupButton");
signUpButton.disabled = true;
function manageSignUpButton() {
  if (
    isEmailValid &&
    isNicknameValid &&
    isPasswordValid &&
    isPasswordCheckValid
  ) {
    signUpButton.disabled = false;
  } else {
    signUpButton.disabled = true;
  }
}
signUpButton.addEventListener("click", function () {
  window.location.href = "../signin.html";
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

const passwordCheckVisibility = document.getElementById(
  "passwordCheckVisibility"
);
passwordCheckVisibility.addEventListener("click", function () {
  if (passwordCheckInput.type === "password") {
    passwordCheckInput.type = "text";
    passwordCheckVisibility.src = "../images/eyeon.svg";
  } else {
    passwordCheckInput.type = "password";
    passwordCheckVisibility.src = "../images/eyeoff.svg";
  }
});
