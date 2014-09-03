/// <reference path="Constants.ts"/>

declare var x2js;

class Reader {
    
    private lookup:{[name:string]:IElement};
    
    constructor(xml:string, lookup:{[name:string]:IElement}) {
        
        this.lookup = lookup;
        
        var data:any = x2js.xml_str2json(xml, true);
        console.log(data);
        
        this.analyseChild(data, Constants.ROOT_NAME);
        
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
            
            var value:any = data[prop];
            
            if (prop == "0")
            {
                this.analyseChild(value, name);
            } else if (prop != "0" && prop.replace(/[0-9]/g, "") == "" || prop == Constants.COUNT_PROP)
            {
                continue;
            } else if (prop.charAt(0) == "_" || typeof value == "string" || (Constants.COUNT_PROP in value && value[Constants.COUNT_PROP] == 0))
            {
                el.attributes.push(prop);    
            } else if (prop.indexOf(Constants.ARRAY_SUFFIX)==-1){
                
                this.analyseChild(value, prop)
                el.children.push(prop);

                var arrayData:any[] = data[prop + Constants.ARRAY_SUFFIX];
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