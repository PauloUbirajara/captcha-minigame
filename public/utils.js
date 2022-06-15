const canvas = document.getElementById("canvas");
const captchaCheckbutton = document.getElementById("captcha-checkbutton");
const modal = document.getElementById("modal");

function sendValidation() {
  grecaptcha.ready(() => {
    grecaptcha.execute(PUBLIC_KEY, { action: "login" }).then((token) => {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      };

      fetch("http://localhost:3300/verify", options)
        .then((res) => {
          console.log(res.status);
          if (res.ok) {
            return res.json();
          }
          throw new Error("Erro ao enviar token");
        })
        .then((data) => {
          console.log(data);
          const { success, errorCodes } = data;
          if (success) {
            captchaCheckbutton.setAttribute("state", "success");
            return;
          }

          const invalidTokenError = `Token não aprovado pelo backend: ${errorCodes.join(
            ", "
          )}`;
          throw new Error(invalidTokenError);
        })
        .catch(failCaptcha)
        .finally(() => {
          captchaCheckbutton.removeAttribute("disabled");
        });
    });
  });

  modal.style.display = "none";
}

function changeFail() {
  captchaCheckbutton.setAttribute("state", "fail");
  modal.style.display = "none";
}
