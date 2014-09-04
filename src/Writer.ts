class Writer {
    
    private suffix:string;
    
    constructor(lookup:{[name:string]:IElement}, suffix:string = "El") {
        
        this.suffix = suffix;
        
        var output:string[] = [];
        for (name in lookup)
        {
            if (name == Constants.ROOT_NAME) continue;
            
            var el:IElement = lookup[name];
            
            output.push("interface " + this.makeInterfaceName(name));
            output.push("{");
            
            var prop:string = name;
            if (el.isArray) prop += Constants.ARRAY_SUFFIX;
            
            el.attributes.forEach((item, index, array)=>{
                output.push(this.indent(item + ":string;"));
            });
            
            el.children.forEach((item, index, array)=>{
                
                var child:IElement = lookup[item];
                var childName:string = item;
                var childValue:string = this.makeInterfaceName(item);
                if (child.isArray)
                {
                    childName += Constants.ARRAY_SUFFIX;
                    childValue += "[]";
                }
                output.push(this.indent(childName + ":" + childValue + ";"));
            });
            output.push("}");
        }
        console.log(output.join("\n"));
        
    }
    
    private indent(s:string):string {
        return "\t" + s;
    }
    
    private makeInterfaceName(s:string):string {
        return "I" + s + this.suffix;
    }
    
    
}