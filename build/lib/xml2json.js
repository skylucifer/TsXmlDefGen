/**
* @license Copyright 2011 Abdulla Abdurakhmanov
* Original sources are available at https://code.google.com/p/x2js/
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/*

JT:
changes to allow:
    stripping whitespace in XML parsing
    having single tags when there are no children

*/

function X2JS() {

    var ignoreEmptyText = false;
    var forceClosedTags = false;

    var VERSION = "1.0.8";
    var ARRAY_SUFFIX = "_asArray";

	var DOMNodeTypes = {
		ELEMENT_NODE 	   : 1,
		TEXT_NODE    	   : 3,
		CDATA_SECTION_NODE : 4,
		DOCUMENT_NODE 	   : 9
	}
	
	function getNodeLocalName( node ) {
		var nodeLocalName = node.localName;			
		if(nodeLocalName == null) // Yeah, this is IE!! 
			nodeLocalName = node.baseName;
		if(nodeLocalName == null || nodeLocalName=="") // =="" is IE too
			nodeLocalName = node.nodeName;
		return nodeLocalName;
	}
	
	function getNodePrefix(node) {
		return node.prefix;
	}

	function parseDOMChildren( node ) {
		if(node.nodeType == DOMNodeTypes.DOCUMENT_NODE) {
			var result = new Object;
			var child = node.firstChild; 
			var childName = getNodeLocalName(child);
			result[childName] = parseDOMChildren(child);
			return result;
		}
		else
		if(node.nodeType == DOMNodeTypes.ELEMENT_NODE) {
			var result = new Object;
			result.__cnt=0;
			
			var nodeChildren = node.childNodes;
			
			// Children nodes
			for(var cidx=0; cidx <nodeChildren.length; cidx++) {
				var child = nodeChildren.item(cidx); // nodeChildren[cidx];
				var childName = getNodeLocalName(child);

				if(result[childName] == null) {
				    
				    var value = parseDOMChildren(child);

				    if (childName == "#text" && ignoreEmptyText) {
				        var trimmedString = value.replace(/\s/g, '');
				        if (trimmedString == "") continue;
				    }
				    result[childName] = value

				    result[childName + ARRAY_SUFFIX] = new Array(1);
				    result[childName + ARRAY_SUFFIX][0] = result[childName];
				}
				else {
					if(result[childName] != null) {
						if( !(result[childName] instanceof Array)) {
							var tmpObj = result[childName];
							result[childName] = new Array();
							result[childName][0] = tmpObj;
							
							result[childName + ARRAY_SUFFIX] = result[childName];
						}
					}
					var aridx = 0;
					while(result[childName][aridx]!=null) aridx++;
					(result[childName])[aridx] = parseDOMChildren(child);
				}
				result.__cnt++;
			}
			
			// Attributes
			for(var aidx=0; aidx <node.attributes.length; aidx++) {
				var attr = node.attributes.item(aidx); // [aidx];
				result.__cnt++;
				result["_"+attr.name]=attr.value;
			}
			
			// Node namespace prefix
			var nodePrefix = getNodePrefix(node);
			if(nodePrefix!=null && nodePrefix!="") {
				result.__cnt++;
				result.__prefix=nodePrefix;
			}
			
			if( result.__cnt == 1 && result["#text"]!=null  ) {
				result = result["#text"];
			} 
			
			if (result["#text"] != null) {
			    
                		result.__text = result["#text"];
				delete result["#text"];
				delete result["#text" + ARRAY_SUFFIX];
			}
			if(result["#cdata-section"]!=null) {
				result.__cdata = result["#cdata-section"];
				delete result["#cdata-section"];
				delete result["#cdata-section" + ARRAY_SUFFIX];
			}
			
			if(result.__text!=null || result.__cdata!=null) {
				result.toString = function() {
					return (this.__text!=null? this.__text:'')+( this.__cdata!=null ? this.__cdata:'');
				}
			}
			return result;
		}
		else
		if(node.nodeType == DOMNodeTypes.TEXT_NODE || node.nodeType == DOMNodeTypes.CDATA_SECTION_NODE) {
			return node.nodeValue;
		}	
	}
	
	function startTag(jsonObj, element, attrList, closed) {
		var resultStr = "<"+ (jsonObj.__prefix!=null? (jsonObj.__prefix+":"):"") + element;
		if(attrList!=null) {
			for(var aidx = 0; aidx < attrList.length; aidx++) {
				var attrName = attrList[aidx];
				var attrVal = jsonObj[attrName];
				resultStr+=" "+attrName.substr(1)+"='"+attrVal+"'";
			}
		}
		if(!closed)
			resultStr+=">";
		else
			resultStr+="/>";
		return resultStr;
	}
	
	function endTag(jsonObj,elementName) {
		return "</"+ (jsonObj.__prefix!=null? (jsonObj.__prefix+":"):"")+elementName+">";
	}
	
	function endsWith(str, suffix) {
	    return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}
	
	function jsonXmlSpecialElem ( jsonObj, jsonObjField ) {
	    if (endsWith(jsonObjField.toString(), (ARRAY_SUFFIX))
				|| jsonObjField.toString().indexOf("_")==0 
				|| (jsonObj[jsonObjField] instanceof Function) )
			return true;
		else
			return false;
	}
	
	function jsonXmlElemCount ( jsonObj ) {
		var elementsCnt = 0;
		if(jsonObj instanceof Object ) {
			for( var it in jsonObj  ) {
				if(jsonXmlSpecialElem ( jsonObj, it) )
					continue;			
				elementsCnt++;
			}
		}
		return elementsCnt;
	}
	
	function parseJSONAttributes ( jsonObj ) {
		var attrList = [];
		for( var ait in jsonObj  ) {
			if(ait.toString().indexOf("__")== -1 && ait.toString().indexOf("_")==0) {
				attrList.push(ait);
			}
		}
		return attrList;
	}
	
	function parseJSONTextAttrs ( jsonTxtObj ) {
		var result ="";
		
		if(jsonTxtObj.__cdata!=null) {										
			result+="<![CDATA["+jsonTxtObj.__cdata+"]]>";					
		}
		
		if(jsonTxtObj.__text!=null) {
			result+=jsonTxtObj.__text;
		}
		return result
	}
	
	function parseJSONTextObject ( jsonTxtObj ) {
		var result ="";

		if( jsonTxtObj instanceof Object ) {
			result+=parseJSONTextAttrs ( jsonTxtObj )
		}
		else
			if(jsonTxtObj!=null)
				result+=jsonTxtObj;
		
		return result;
	}
	
	function parseJSONArray ( jsonArrRoot, jsonArrObj, attrList ) {
		var result = ""; 
		if(jsonArrRoot.length == 0) {
			result+=startTag(jsonArrRoot, jsonArrObj, attrList, true);
		}
		else {
		    for (var arIdx = 0; arIdx < jsonArrRoot.length; arIdx++) {
		        var text = parseJSONObject(jsonArrRoot[arIdx]);
		        var empty = text == "";
		        result += startTag(jsonArrRoot[arIdx], jsonArrObj, parseJSONAttributes(jsonArrRoot[arIdx]), empty);
		        if (!empty) {
		            result += text;
		            result += endTag(jsonArrRoot[arIdx], jsonArrObj);
		        }
			}
		}
		return result;
	}
	
	function parseJSONObject ( jsonObj ) {
		var result = "";	

		var elementsCnt = jsonXmlElemCount ( jsonObj );
		
		if(elementsCnt > 0) {
			for( var it in jsonObj ) {
				
				if(jsonXmlSpecialElem ( jsonObj, it) )
					continue;			
				
				var subObj = jsonObj[it];						
				
				var attrList = parseJSONAttributes( subObj )
				
				if(subObj instanceof Object) {
					
					if(subObj instanceof Array) {					
						result+=parseJSONArray( subObj, it, attrList )					
					}
					else {
					    var text = parseJSONObject(subObj);
					    var empty = text == "";
					    result += startTag(subObj, it, attrList, empty);
					    if (!empty) {
					        result += text;
					        result += endTag(subObj, it);
					    }
					}
				}
				else if (subObj!=null) {

				    var text = parseJSONTextObject(subObj);
				    var empty = text == "";

				    result += startTag(subObj, it, attrList, empty);
				    if (!empty) {
				        result += text
				        result += endTag(subObj, it);
				    }
				}
			}
		}
		result+=parseJSONTextObject(jsonObj);
		
		return result;
	}
	
	this.parseXmlString = function(xmlDocStr) {
		var xmlDoc;
		if (window.DOMParser) {
			var parser=new window.DOMParser();			
			xmlDoc = parser.parseFromString( xmlDocStr, "text/xml" );
		}
		else {
			// IE :(
			if(xmlDocStr.indexOf("<?")==0) {
				xmlDocStr = xmlDocStr.substr( xmlDocStr.indexOf("?>") + 2 );
			}
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async="false";
			xmlDoc.loadXML(xmlDocStr);
		}
		return xmlDoc;
	}

	function setIgnoreEmptyText(value) {
	    if (value == undefined) value = false;
	    ignoreEmptyText = value;
	}

	this.xml2json = function (xmlDoc, ignoreEmptyText) {
	    setIgnoreEmptyText(ignoreEmptyText);
		return parseDOMChildren ( xmlDoc );
	}
	
	this.xml_str2json = function (xmlDocStr, ignoreEmptyText) {
	    setIgnoreEmptyText(ignoreEmptyText);
		var xmlDoc = this.parseXmlString(xmlDocStr);	
		return this.xml2json(xmlDoc, ignoreEmptyText);
	}

	this.json2xml_str = function (jsonObj) {
		return parseJSONObject ( jsonObj );
	}

	this.json2xml = function (jsonObj) {
		var xmlDocStr = this.json2xml_str (jsonObj);
		return this.parseXmlString(xmlDocStr);
	}

	this.json_arr2xml_str = function (jsonArray, name) {
	    var attrList = parseJSONAttributes(jsonArray);
	    return parseJSONArray(jsonArray, name, attrList);
	}

    
}

var x2js = new X2JS();