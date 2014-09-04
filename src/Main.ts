/// <reference path="../lib/zepto.d.ts"/>
/// <reference path="Reader.ts"/>
/// <reference path="Writer.ts"/>
/// <reference path="TextLoader.ts"/>

declare var x2js;

class Main {
    
    static start():void {
        
        var lookup:{[name:string]:IElement} = {};
        
        var path = "xml/responses/";
        
        var files:string[] = [
            "cash_prize_bonus_reponse.xml",    
            "close_response.xml",    
            "init_response.xml",    
            "spin_response.xml",    
            "spin_wild_response.xml",    
            "win_spin_close_response.xml",    
            "win_spin_leave_response.xml",    
            "win_spin_response.xml",    
            "win_spin_take_response.xml"
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
                    new Writer(lookup);
                }
            });
        }
        loadNext();
    }
    
}