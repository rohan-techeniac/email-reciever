const { accessTokenService } = require("../services/token.service");
const notifier = require("mail-notifier");
const config = require("../config");

const startImap = async () => {
  const token = await accessTokenService().catch((e) => console.log(e));

  const _build_XOAuth2_token = (user = "", access_token = "") =>
    Buffer.from(
      [`user=${user}`, `auth=Bearer ${access_token}`, "", ""].join("\x01"),
      "utf-8"
    ).toString("base64");

  xoauthtoken = _build_XOAuth2_token(config.imap.EMAIL, token.access_token);

  const imap = {
    xoauth2: xoauthtoken,
    user: config.imap.EMAIL,
    password: config.imap.EMAIL_PASSWORD, // Will be deprecated on May 30, 2022
    host: config.imap.IMAPHOST,
    port: config.imap.IMAPPORT, // imap port
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
  };

  const n = notifier(imap);
  n.on("end", () => n.start()) // session closed
    .on("mail", (mail) => {
      console.log(mail.from[0].address, mail.subject);
      console.log(mail.text);
    })
    .start();
};

module.exports = startImap;
