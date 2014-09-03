declare var x2js;

class XMLDefGenerator {
    
    private lookup:{[name:string]:IElement} = {};
    
    private static ARRAY_SUFFIX:string = "_asArray";
    private static COUNT_PROP:string = "__cnt";
    private static ROOT_NAME:string = "Object";
    
    constructor(xml:string) {
        
        var data:any = x2js.xml_str2json(xml, true);
        console.log(data);
        
        this.analyseChild(data, XMLDefGenerator.ROOT_NAME);
        
        console.log(this.lookup);
        
        this.writeInterfaces();
    }
    
    private indent(s:string):string {
        return "\t" + s;
    }
    
    private makeInterfaceName(s:string):string {
        return "I" + s + "El";
    }
    
    private writeInterfaces():void {
        
        var output:string[] = [];
        for (name in this.lookup)
        {
            if (name == XMLDefGenerator.ROOT_NAME) continue;
            
            var el:IElement = this.lookup[name];
            
            output.push("interface " + this.makeInterfaceName(name));
            output.push("{");
            
            var prop:string = name;
            if (el.isArray) prop += XMLDefGenerator.ARRAY_SUFFIX;
            
            el.attributes.forEach((item, index, array)=>{
                output.push(this.indent(item + ":string;"));
            });
            
            el.children.forEach((item, index, array)=>{
                
                var child:IElement = this.lookup[item];
                var childName:string = item;
                var childValue:string = this.makeInterfaceName(item);
                if (child.isArray)
                {
                    childName += XMLDefGenerator.ARRAY_SUFFIX;
                    childValue += "[]";
                }
                output.push(this.indent(childName + ":" + childValue + ";"));
            });
            output.push("}");
        }
        console.log(output.join("\n"));
        
    }
    
    private analyseChild(data:any, name:string):IElement {
        
        var el:IElement = this.lookup[name];
        
        if (!el) 
        {
            el = {
                name: name,
                attributes: [],
                children: [],
                isArray:false
            };
            this.lookup[name] = el;
        } /*else {
            el.isArray = true;    
        }*/
        
            
        
        for (var prop in data)
        {
            
            var value:any = data[prop];
            
            if (prop == "0")
            {
                this.analyseChild(value, name);
            } else if (prop != "0" && prop.replace(/[0-9]/g, "") == "" || prop == XMLDefGenerator.COUNT_PROP)
            {
                continue;
            } else if (prop.charAt(0) == "_" || typeof value == "string" || (XMLDefGenerator.COUNT_PROP in value && value[XMLDefGenerator.COUNT_PROP] == 0))
            {
                el.attributes.push(prop);    
            } else if (prop.indexOf(XMLDefGenerator.ARRAY_SUFFIX)==-1){
                
                this.analyseChild(value, prop)
                el.children.push(prop);

                var arrayData:any[] = data[prop + XMLDefGenerator.ARRAY_SUFFIX];
                if (arrayData && arrayData.length > 1)
                {
                    this.lookup[prop].isArray = true;
                }
            }
        }
        return el;
    }
}


interface IElement {
    
    name:string;
    isArray:boolean;
    children:string[];
    attributes:string[];
}