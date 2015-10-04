var xpi = require('jpm/lib/xpi');
var fs = require('fs');

var EXTENSION_FILE = "data/extension.js";

module.exports = function() {
	this.cacheable();
    var query = parseQuery(this.query);

    var current_dir = process.cwd();
    var work_dir = current_dir + "/" + process.env.FF_FOLDER;
    process.chdir(work_dir)

    var data = fs.readFileSync(EXTENSION_FILE, 'utf-8');
    data = "var exports; " + data;
    fs.writeFileSync(EXTENSION_FILE, data, 'utf-8');

    xpi();
    process.chdir(current_dir)
};

function parseQuery(query){
    var args = query.split("?")[1].split("&");
    var result = {};

    for(var i=0; i< args.length; i++){
        var vr = args[i].split("=");
        result[vr[0]] = vr[1];
    }

    return result;
}


