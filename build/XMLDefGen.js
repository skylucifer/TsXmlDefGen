var Constants = (function () {
    function Constants() {
    }
    Constants.ARRAY_SUFFIX = "_asArray";
    Constants.COUNT_PROP = "__cnt";
    Constants.ROOT_NAME = "Object";
    return Constants;
})();

var Reader = (function () {
    function Reader(xml, lookup) {
        this.lookup = lookup;

        var data = x2js.xml_str2json(xml, true);
        console.log(data);

        this.analyseChild(data, Constants.ROOT_NAME);

        console.log(this.lookup);
    }
    Reader.prototype.analyseChild = function (data, name) {
        var el = this.lookup[name];

        if (!el) {
            el = {
                name: name,
                attributes: [],
                children: [],
                isArray: false
            };
            this.lookup[name] = el;
        }

        for (var prop in data) {
            var value = data[prop];

            if (prop == "0") {
                this.analyseChild(value, name);
            } else if (prop != "0" && prop.replace(/[0-9]/g, "") == "" || prop == Constants.COUNT_PROP) {
                continue;
            } else if (prop.charAt(0) == "_" || typeof value == "string" || (Constants.COUNT_PROP in value && value[Constants.COUNT_PROP] == 0)) {
                el.attributes.push(prop);
            } else if (prop.indexOf(Constants.ARRAY_SUFFIX) == -1) {
                this.analyseChild(value, prop);
                el.children.push(prop);

                var arrayData = data[prop + Constants.ARRAY_SUFFIX];
                if (arrayData && arrayData.length > 1) {
                    this.lookup[prop].isArray = true;
                }
            }
        }
        return el;
    };
    return Reader;
})();
var Writer = (function () {
    function Writer(lookup) {
        var _this = this;
        var output = [];
        for (name in lookup) {
            if (name == Constants.ROOT_NAME)
                continue;

            var el = lookup[name];

            output.push("interface " + this.makeInterfaceName(name));
            output.push("{");

            var prop = name;
            if (el.isArray)
                prop += Constants.ARRAY_SUFFIX;

            el.attributes.forEach(function (item, index, array) {
                output.push(_this.indent(item + ":string;"));
            });

            el.children.forEach(function (item, index, array) {
                var child = lookup[item];
                var childName = item;
                var childValue = _this.makeInterfaceName(item);
                if (child.isArray) {
                    childName += Constants.ARRAY_SUFFIX;
                    childValue += "[]";
                }
                output.push(_this.indent(childName + ":" + childValue + ";"));
            });
            output.push("}");
        }
        console.log(output.join("\n"));
    }
    Writer.prototype.indent = function (s) {
        return "\t" + s;
    };

    Writer.prototype.makeInterfaceName = function (s) {
        return "I" + s + "El";
    };
    return Writer;
})();
var TextLoader = (function () {
    function TextLoader(url, onLoaded) {
        $.ajax({
            type: "GET",
            url: url,
            timeout: 30000,
            dataType: "text",
            success: function (xmlData) {
                onLoaded(xmlData);
            },
            error: function (xhr, errorType, error) {
                console.log("TextLoader ajax XML load failed. url:" + url);
            }
        });
    }
    return TextLoader;
})();

var Main = (function () {
    function Main() {
    }
    Main.start = function () {
        var lookup = {};

        var path = "xml/responses/";

        new TextLoader(path + "init_response.xml", function (xml) {
            new Reader(xml, lookup);
            new TextLoader(path + "spin_wild_response.xml", function (xml) {
                new Reader(xml, lookup);

                new Writer(lookup);
            });
        });
    };
    return Main;
})();
