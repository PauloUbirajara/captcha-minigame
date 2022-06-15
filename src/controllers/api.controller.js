import axios from "axios";

class APIController {
  get = (_req, res) => {
    return res.json({ success: true });
  };

  verify = async (req, res) => {
    const { token } = req.body;
    const { PRIVATE_KEY } = process.env;
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${PRIVATE_KEY}&response=${token}`;

    return axios
      .post(verificationURL)
      .then((apiResult) => {
        const { data, status } = apiResult;
        console.log(data);
        const { success, score, action, "error-codes": errorCodes } = data;
        console.log(data, status);
        return res.status(status).json({ success, score, action, errorCodes });
      })
      .catch((err) => {
        const errorMessage = `Erro durante verificação com a API do ReCaptchaV3: ${err}`;
        return res.status(401).json({
          error: errorMessage,
        });
      });
  };
}

export default new APIController();
