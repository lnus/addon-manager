var Crawler = require("crawler")
const cheerio = require("cheerio")

function getAddonInfo(elem) {
    var addonInfo = {}
    const $ = cheerio.load(elem)
    console.log($(elem).children()[0].attribs.class)

    $(elem).each((index, part) => {
        // console.log(part)
        var currentClass = part.attribs.class
        // console.log(currentClass)
        if(currentClass === "list-item_details xs-mg-r-1") {
            // console.log(currentClass)
        }
    })
}

var c = new Crawler({
    "maxConnections": 10,
    "callback": function (error, result, $) {
        if (error) {
            console.log(error);
        } else {
            var $ = result.$;
            console.log($("title").text());
            $("li").each((index, li) => {
                var liClass = li.attribs.class
                if (liClass === "project-list-item") {
                    var addonDiv = $(li).children()[0]
                    getAddonInfo($(addonDiv).children()[0]);
                }
            })
        }
    }
})

var addon = {
    name: "deadly+boss+mods"
}

const baseUrl =  `https://www.curseforge.com/wow/addons/search?search=${addon.name}`

c.queue(baseUrl)