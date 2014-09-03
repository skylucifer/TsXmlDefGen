var XMLDefGenerator = (function () {
    function XMLDefGenerator(xml) {
        this.lookup = {};
        var data = x2js.xml_str2json(xml, true);
        console.log(data);

        this.analyseChild(data, XMLDefGenerator.ROOT_NAME);

        console.log(this.lookup);

        this.writeInterfaces();
    }
    XMLDefGenerator.prototype.indent = function (s) {
        return "\t" + s;
    };

    XMLDefGenerator.prototype.makeInterfaceName = function (s) {
        return "I" + s + "El";
    };

    XMLDefGenerator.prototype.writeInterfaces = function () {
        var _this = this;
        var output = [];
        for (name in this.lookup) {
            if (name == XMLDefGenerator.ROOT_NAME)
                continue;

            var el = this.lookup[name];

            output.push("interface " + this.makeInterfaceName(name));
            output.push("{");

            var prop = name;
            if (el.isArray)
                prop += XMLDefGenerator.ARRAY_SUFFIX;

            el.attributes.forEach(function (item, index, array) {
                output.push(_this.indent(item + ":string;"));
            });

            el.children.forEach(function (item, index, array) {
                var child = _this.lookup[item];
                var childName = item;
                var childValue = _this.makeInterfaceName(item);
                if (child.isArray) {
                    childName += XMLDefGenerator.ARRAY_SUFFIX;
                    childValue += "[]";
                }
                output.push(_this.indent(childName + ":" + childValue + ";"));
            });
            output.push("}");
        }
        console.log(output.join("\n"));
    };

    XMLDefGenerator.prototype.analyseChild = function (data, name) {
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
            } else if (prop != "0" && prop.replace(/[0-9]/g, "") == "" || prop == XMLDefGenerator.COUNT_PROP) {
                continue;
            } else if (prop.charAt(0) == "_" || typeof value == "string" || (XMLDefGenerator.COUNT_PROP in value && value[XMLDefGenerator.COUNT_PROP] == 0)) {
                el.attributes.push(prop);
            } else if (prop.indexOf(XMLDefGenerator.ARRAY_SUFFIX) == -1) {
                this.analyseChild(value, prop);
                el.children.push(prop);

                var arrayData = data[prop + XMLDefGenerator.ARRAY_SUFFIX];
                if (arrayData && arrayData.length > 1) {
                    this.lookup[prop].isArray = true;
                }
            }
        }
        return el;
    };
    XMLDefGenerator.ARRAY_SUFFIX = "_asArray";
    XMLDefGenerator.COUNT_PROP = "__cnt";
    XMLDefGenerator.ROOT_NAME = "Object";
    return XMLDefGenerator;
})();

var Main = (function () {
    function Main() {
    }
    Main.start = function () {
        var url = "spin_wild_response.xml";

        $.ajax({
            type: "GET",
            url: url,
            timeout: 30000,
            dataType: "text",
            success: function (xmlData) {
                new XMLDefGenerator(xmlData);
            },
            error: function (xhr, errorType, error) {
                console.log("ajax XML load failed");
            }
        });
    };
    return Main;
})();
