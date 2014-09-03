class TextLoader {
    
    constructor(url:string, onLoaded:(xml:string)=>void) {
        $.ajax({
            type: "GET",
            url: url,
            timeout: 30000,
            dataType : "text",
            success: (xmlData: string) => {
                onLoaded(xmlData);
            }, 
            error: (xhr: XMLHttpRequest, errorType: string, error: Error) => {
                console.log("TextLoader ajax XML load failed. url:" + url);
            }
        });
    }
    
    
    
    
}