const SftpWatcher = require("sftp-watcher");
const config = require("../config");

class ftpListener {
  event = new SftpWatcher({
    host: config.ftp.FTPHOST,
    port: config.ftp.FTPPORT,
    username: config.ftp.FTPUSER,
    password: config.ftp.FTPPASS,
    path: config.ftp.FTPLISTENERPATH,
  });

  start() {
    this.event.on("upload", function (data) {
      console.log(data);
    });
    this.event.on("error", function (data) {
      console.log(data.toString());
    });
  }

  stop() {
    this.event.emit("stop");
  }
}

const ftpListenerObj = new ftpListener();

module.exports = ftpListenerObj;
