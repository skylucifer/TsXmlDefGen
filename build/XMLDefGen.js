var XMLDefGenerator = (function () {
    function XMLDefGenerator(xml) {
        this.lookup = {};
        var data = x2js.xml_str2json(xml, true);
        console.log(data);

        this.analyseChild(data, "Object");

        console.log(this.lookup);
    }
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
            if (prop.replace(/[0-9]/g, "") == "" || prop == "__cnt") {
                continue;
            } else if (prop.charAt(0) == "_") {
                el.attributes.push(prop);
            } else if (prop.indexOf(XMLDefGenerator.ARRAY_SUFFIX) == -1) {
                this.analyseChild(data[prop], prop);
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
