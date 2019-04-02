var Crawler = require("crawler")

var c = new Crawler({
  "maxConnections": 10,

  "callback": function (error, result, $) {
    if (error) {
      console.log(error);
    } else {
      var $ = result.$;
      console.log($("title").text());
      // console.log($("body").text());
      $("td").each(function (index, tr) {
        $(tr).children().each(function () {
          $(this).children().each(() => {
            console.log(this.attribs)

          })
        })
        // console.log($(tr).text());
      })
    }
  }
});

var addon = {
  name: "SUI"
}

const baseUrl = `http://www.wowinterface.com/downloads/search.php?search=${addon.name}&title&page=1&so=desc&sb=hits`
c.queue(baseUrl)
