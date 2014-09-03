/// <reference path="../lib/zepto.d.ts"/>
/// <reference path="Reader.ts"/>
/// <reference path="Writer.ts"/>
/// <reference path="TextLoader.ts"/>

declare var x2js;

class Main {
    
    static start():void {
        
        var lookup:{[name:string]:IElement} = {};
        
        var path = "xml/responses/";
        
        new TextLoader(path + "init_response.xml", (xml:string)=> {
            new Reader(xml, lookup);
            new TextLoader(path + "spin_wild_response.xml", (xml:string)=> {
                new Reader(xml, lookup);
                
                new Writer(lookup);
            });
        });
    }
    
}