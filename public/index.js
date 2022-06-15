const VERIFICATION_ENDPOINT = "http://localhost:3300/verify";
const PUBLIC_KEY = "6LeUFkAfAAAAAJyqI6lH0hIH1SSb-SQ1BS0iDgLB";
const games = [snakeGame, jigsawGame];

function onClick(event) {
  event.preventDefault();
  modal.style.display = "block";
  games[Math.floor(Math.random() * games.length)]();
  canvas.focus();
  // if (captchaCheckbutton.getAttribute("state") == "success") {
  //   return;
  // }

  // captchaCheckbutton.setAttribute("disabled", "disabled");
  // captchaCheckbutton.removeAttribute("state");
}

function failCaptcha(reason) {
  console.warn(reason);
  captchaCheckbutton.setAttribute("state", "fail");
}
