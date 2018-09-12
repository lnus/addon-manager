var Crawler = require("crawler")
const cheerio = require("cheerio")
results = []

function getDownloadLink(elem) {
    //TODO: FIX THIS SHIT
    // /projects/{addon.name}/files/latest
    // https://wow.curseforge.com/projects/{addon.name}/files/latest

}

function getAddonInfo(elem) {
    var addonInfo = {
        title: "",
        desc: ""
    }
    const $ = cheerio.load(elem)
    divChildren = $(elem).children()

    $(divChildren).each((index, child) =>{
        objClass = child.attribs.class
        if(objClass === "list-item__details xs-mg-r-1"){
            a = $(child).children()[0]
            title = ($(a).text())
            formattedTitle = title.replace(/\s+/g, " ").trim()
            addonInfo.title = formattedTitle 
        }
    })

    return addonInfo
}

var c = new Crawler({
    "maxConnections": 10,
    "callback": function (error, result, $) {
        if (error) {
            console.log(error);
        } else {
            var $ = result.$;
            $("li").each((index, li) => {
                var liClass = li.attribs.class
                if (liClass === "project-list-item") {
                    var addonDiv = $(li).children()[0]
                    info = getAddonInfo($(addonDiv));
                    results.push(info)
                }
            })
        }
    }
})

module.exports = {
    search: function(searchTerm) {
        results = []
        var addon = {
            name: searchTerm
        }

        const baseUrl =  `https://www.curseforge.com/wow/addons/search?search=${addon.name}`

        c.queue(baseUrl)

        return results
    }
}