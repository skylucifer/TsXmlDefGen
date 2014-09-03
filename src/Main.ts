/// <reference path="../lib/zepto.d.ts"/>
/// <reference path="XMLDefGenerator.ts"/>

declare var x2js;

class Main {
    
    static start():void {
        
        //var url = "init_response.xml";
        var url = "spin_wild_response.xml";
        
        
        $.ajax({
                type: "GET",
                url: url,
                timeout: 30000,
                dataType : "text",
                success: (xmlData: string) => {
                    //console.log(x2js.xml_str2json(xmlData, true));
                    new XMLDefGenerator(xmlData);
                }, 
                error: (xhr: XMLHttpRequest, errorType: string, error: Error) => {
                    console.log("ajax XML load failed");
                }
            });
        
        /*var type = "POST";
            var data;
            var url: string;
            if (this.proxyUrl) {
                data = { 'url': this.serviceUrl, 'obj': xml };
                url = this.proxyUrl;
            } else {
                data = xml;
                url = this.serviceUrl;
            };

            $.ajax({
                type: type,
                url: url + "?r=" + (new Date()).getTime(),
                timeout: 30000,//10000
                data: data,
                dataType: this.responseDataType,
                success: (xmlData: string) => {
                    this.handleReponse(xmlData, successCallback);
                },
                error: (retData, type) => {
                    console.log("ws -> call -> failureCallback. " + type + " : " + retData.status + " - " + retData.statusText)
                    this.onFailure.dispatch();
                }
            });
        */
        
    }
    
}