let remote = require('electron').remote

module.exports = {
  close: function() {
    remote.getCurrentWindow().close();
  },
  minimize: function() {
    remote.getCurrentWindow().minimize();
  }
}
