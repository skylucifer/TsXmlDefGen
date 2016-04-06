/// <reference path="../lib/zepto.d.ts"/>
/// <reference path="Reader.ts"/>
/// <reference path="Writer.ts"/>
/// <reference path="TextLoader.ts"/>

declare var x2js;

class Main {
    
    static start():void {
        
        var lookup:{[name:string]:IElement} = {};
        
        var path = "./";
        
        var files:string[] = [
            "sample.xml"
        ];
        
        
        var loadNext = ()=> {
            var nextFile:string = path + files.shift();
            console.log("loading " + nextFile);
            new TextLoader(nextFile, (xml:string)=> {
                new Reader(xml, lookup);
                
                if (files.length > 0)
                {
                    loadNext();
                } else {
                    new Writer(lookup, "_RespEl");
                }
            });
        }
        loadNext();
    }
    
}