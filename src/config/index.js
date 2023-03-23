const imapConfig = require("./imap.config");
const ftpConfig = require("./ftp.config");
const appConfig = require("./app.config");

module.exports = {
  app: appConfig,
  imap: imapConfig,
  ftp: ftpConfig,
};
