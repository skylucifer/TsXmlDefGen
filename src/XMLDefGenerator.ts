declare var x2js;

class XMLDefGenerator {
    
    private lookup:{[name:string]:IElement} = {};
    
    private static ARRAY_SUFFIX:string = "_asArray";
    
    constructor(xml:string) {
        
        var data:any = x2js.xml_str2json(xml, true);
        console.log(data);
        
        this.analyseChild(data, "Object");
        
        console.log(this.lookup);
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
            if (prop.replace(/[0-9]/g, "") == "" || prop == "__cnt")
            {
                continue;
            } else if (prop.charAt(0) == "_")
            {
                el.attributes.push(prop);    
            } else if (prop.indexOf(XMLDefGenerator.ARRAY_SUFFIX)==-1){
                this.analyseChild(data[prop], prop)
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