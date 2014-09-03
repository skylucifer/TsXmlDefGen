/* 
zepto-1.0rc1.d.ts may be freely distributed under the MIT license.

Copyright (c) 2013 Josh Baldwin https://github.com/jbaldwin/underscore.d.ts

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation 
files (the "Software"), to deal in the Software without 
restriction, including without limitation the rights to use, 
copy, modify, merge, publish, distribute, sublicense, and/or sell 
copies of the Software, and to permit persons to whom the 
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be 
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR 
OTHER DEALINGS IN THE SOFTWARE.
*/

interface ZeptoStatic {

    os: {
        phone:boolean;
        tablet:boolean;
        ios:boolean;
        android:boolean;
        webos:boolean;
        blackberry:boolean;
        bb10:boolean;
        rimtabletos:boolean;
        iphone:boolean;
        ipad:boolean;
        touchpad:boolean;
        kindle:boolean;

        version: string;
    };

    browser: {
        chrome:boolean;
        firefox:boolean;
        silk:boolean;
        playbook:boolean;

        version: string;
    };

	/**
	 * Core
	 **/

	/**
	* Create a Zepto collection object by performing a CSS selector, wrapping DOM nodes, or creating elements from an HTML string.
	* @param selector
	* @param context
	* @return
	**/
	(selector: string, context?: any): ZeptoCollection;

	/**
	* @see ZeptoStatic();
	* @param collection
	**/
	(collection: ZeptoCollection): ZeptoCollection;

	/**
	* @see ZeptoStatic();
	* @param element
	**/
	(element: HTMLElement): ZeptoCollection;

	/**
	* @see ZeptoStatic();
	* @param htmlString
	**/
	(htmlString: string): ZeptoCollection;

	/**
	* @see ZeptoStatic();
	* @param attributes
	**/
	(htmlString: string, attributes: any): ZeptoCollection;

	/**
	* @see ZeptoStatic();
	* @param object
	**/
	(object: any): ZeptoCollection;		// window and document tests break without this

	/**
	* Turn a dasherized string into �camel case�. Doesn�t affect already camel-cased strings.
	* @param str
	* @return
	**/
	camelCase(str: string): string;

	/**
	* Check if the parent node contains the given DOM node. Returns false if both are the same node.
	* @param parent
	* @param node
	* @return
	**/
	contains(parent: HTMLElement, node: HTMLElement): boolean;

	/**
	* Iterate over array elements or object key-value pairs. Returning false from the iterator function stops the iteration.
	* @param collection
	* @param fn
	**/
	each(collection: any[], fn: (index: number, item: any) => boolean): void;

	/**
	* @see ZeptoStatic.each
	**/
	each(collection: any, fn: (key: string, value: any) => boolean): void;

	/**
	* Extend target object with properties from each of the source objects, overriding the properties on target.
	* By default, copying is shallow. An optional true for the first argument triggers deep (recursive) copying.
	* @param target
	* @param sources
	* @return
	**/
	extend(target: any, ...sources: any[]): any;

	/**
	* @see ZeptoStatic.extend
	* @param deep
	**/
	extend(deep: boolean, target: any, ...sources: any[]): any;

	/**
	* Zepto.fn is an object that holds all of the methods that are available on Zepto collections, such as addClass(), attr(), and other. Adding a function to this object makes that method available on every Zepto collection.
	**/
	fn: any;

	/**
	* Get a new array containing only the items for which the callback function returned true.
	* @param items
	* @param fn
	* @return
	**/
	grep(items: any[], fn: (item: any) => boolean): any[];

	/**
	* Get the position of element inside an array, or -1 if not found.
	* @param element
	* @param array
	* @param fromIndex
	* @return
	**/
	inArray(element: any, array: any[], fromIndex?: number): number;

	/**
	* True if the object is an array.
	* @param object
	* @return
	**/
	isArray(object: any): boolean;

	/**
	* True if the object is a function.
	* @param object
	* @return
	**/
	isFunction(object: any): boolean;

	/**
	* True if the object is a �plain� JavaScript object, which is only true for object literals and objects created with new Object.
	* @param object
	* @return
	**/
	isPlainObject(object: any): boolean;

	/**
	* True if the object is a window object. This is useful for iframes where each one has its own window, and where these objects fail the regular obj === window check.
	* @param object
	* @return
	**/
	isWindow(object: any): boolean;

	/**
	* Iterate through elements of collection and return all results of running the iterator function, with null and undefined values filtered out.
	* @param collection
	* @param fn
	* @return
	**/
	map(collection: any[], fn: (item: any, index: number) => any): any[];

	/**
	* Alias for the native JSON.parse method.
	* @param str
	* @retrun
	**/
	parseJSON(str: string): any;

	/**
	* Remove whitespace from beginning and end of a string; just like String.prototype.trim().
	* @param str
	* @return
	**/
	trim(str: string): string;

	/**
	* Get string type of an object. Possible types are: null undefined boolean number string function array date regexp object error.
	* For other objects it will simply report �object�. To find out if an object is a plain JavaScript object, use isPlainObject.
	* @param object
	* @return
	**/
	type(object: any): string;

	/**
	* Event
	**/

	/**
	* Create and initialize a DOM event of the specified type. If a properties object is given, use it to extend the new event object. The event is configured to bubble by default; this can be turned off by setting the bubbles property to false.
	* An event initialized with this function can be triggered with trigger.
	* @param type
	* @param properties
	* @return
	**/
	Event(type: string, properties: any): Event;

	/**
	* Get a function that ensures that the value of this in the original function refers to the context object. In the second form, the original function is read from the specific property of the context object.
	**/
	proxy(fn: Function, context: any): Function;

	/**
	* Ajax
	**/

	/**
	* Perform an Ajax request. It can be to a local resource, or cross-domain via HTTP access control support in browsers or JSONP.
	* Options:
	*	type (default: �GET�): HTTP request method (�GET�, �POST�, or other)
	*	url (default: current URL): URL to which the request is made
	*	data (default: none): data for the request; for GET requests it is shared.appended to query string of the URL. Non-string objects will get serialized with $.param
	*	processData (default: true): whether to automatically serialize data for non-GET requests to string
	*	contentType (default: �application/x-www-form-urlencoded�): the Content-Type of the data being posted to the server (this can also be set via headers). Pass false to skip setting the default value.
	*	dataType (default: none): response type to expect from the server (�json�, �jsonp�, �xml�, �html�, or �text�)
	*	timeout (default: 0): request timeout in milliseconds, 0 for no timeout
	*	headers: object of additional HTTP headers for the Ajax request
	*	async (default: true): set to false to issue a synchronous (blocking) request
	*	global (default: true): trigger global Ajax events on this request
	*	context (default: window): context to execute callbacks in
	*	traditional (default: false): activate traditional (shallow) serialization of data parameters with $.param
	*  If the URL contains =? or dataType is �jsonp�, the request is performed by injecting a <script> tag instead of using XMLHttpRequest (see JSONP). This has the limitation of contentType, dataType, headers, and async not being supported.
	* @param options
	* @return
	**/
	ajax(options: ZeptoAjaxSettings): XMLHttpRequest;

	/**
	* Perform a JSONP request to fetch data from another domain.
	* This method has no advantages over $.ajax and should not be used.
	* @param options Ajax settings to use with JSONP call.
	* @deprecated use $.ajax instead.
	**/
	ajaxJSONP(options: ZeptoAjaxSettings): XMLHttpRequest;

	/**
	* Object containing the default settings for Ajax requests. Most settings are described in $.ajax. The ones that are useful when set globally are:
	* @example
	*	timeout (default: 0): set to a non-zero value to specify a default timeout for Ajax requests in milliseconds
	*	global (default: true): set to false to prevent firing Ajax events
	*	xhr (default: XMLHttpRequest factory): set to a function that returns instances of XMLHttpRequest (or a compatible object)
	*	accepts: MIME types to request from the server for specific dataType values:
	*		script: �text/javascript, shared.application/javascript�
	*		json: �application/json�
	*		xml: �application/xml, text/xml�
	*		html: �text/html�
	*		text: �text/plain�
	**/
	ajaxSettings: ZeptoAjaxSettings;

	/**
	* Perform an Ajax GET request. This is a shortcut for the $.ajax method.
	* @param url URL to send the HTTP GET request to.
	* @param fn Callback function when the HTTP GET request is completed.
	* @return The XMLHttpRequest object.
	**/
	get(url: string, fn: (data: any, status?: string, xhr?: XMLHttpRequest) => void): XMLHttpRequest;

	/**
	* @see ZeptoStatic.get
	* @param data See ZeptoAjaxSettings.data
	**/
	get(url: string, data: any, fn: (data: any, status?: string, xhr?: XMLHttpRequest) => void): XMLHttpRequest;

	/**
	* Get JSON data via Ajax GET request. This is a shortcut for the $.ajax method.
	* @param url URL to send the HTTP GET request to.
	* @param fn Callback function when the HTTP GET request is completed.
	* @return The XMLHttpRequest object.
	**/
	getJSON(url: string, fn: (data: any, status: string, xhr: XMLHttpRequest) => void ): XMLHttpRequest;

	/**
	* @see ZeptoStatic.getJSON
	* @param data See ZeptoAjaxSettings.data
	**/
	getJSON(url: string, data: any, fn: (data: any, status: string, xhr: XMLHttpRequest) => void ): XMLHttpRequest;

	/**
	* Serialize an object to a URL-encoded string representation for use in Ajax request query strings and post data. If shallow is set, nested objects are not serialized and nested array values won�t use square brackets on their keys.
	* Also accepts an array in serializeArray format, where each item has �name� and �value� properties.
	* @param object Serialize this object to URL-encoded string representation.
	* @param shallow Only serialize the first level of `object`.
	* @return Seralized URL-encoded string representation of `object`.
	**/
	param(object: any, shallow?: boolean): string;

	/**
	* Perform an Ajax POST request. This is a shortcut for the $.ajax method.
	* @param url URL to send the HTTP POST request to.
	* @param fn Callback function when the HTTP POST request is completed.
	* @return The XMLHttpRequest object.
	**/
	post(url: string, fn: (data: any, status: string, xhr: XMLHttpRequest) => void , dataType?: string): XMLHttpRequest;

	/**
	* @see ZeptoStatic.post
	* @param data See ZeptoAjaxSettings.data
	**/
	post(url: string, data: any, fn: (data: any, status: string, xhr: XMLHttpRequest) => void , dataType?: string): XMLHttpRequest;

	/**
	* Effects
	**/

	/**
	* Global settings for animations.
	**/
	fx: ZeptoEffects;
}

interface ZeptoEffects {

	/**
	* (default false in browsers that support CSS transitions): set to true to disable all animate() transitions.
	**/
	off: boolean;

	/**
	* An object with duration settings for animations.
	* Change existing values or add new properties to affect animations that use a string for setting duration.
	**/
	speeds: ZeptoEffectsSpeeds;
}

interface ZeptoEffectsSpeeds {

	/**
	* Default = 400ms.
	**/
	_default: number;

	/**
	* Default = 200ms.
	**/
	fast: number;

	/**
	* Default = 600ms.
	**/
	slow: number;
}

interface ZeptoCollection {

	/**
	* Core
	**/

	/**
	* Modify the current collection by adding the results of performing the CSS selector on the whole document, or, if context is given, just inside context elements.
	* @param selector
	* @param context
	* @return
	**/
	add(selector: string, context?: any): ZeptoCollection;

	/**
	* Add class name to each of the elements in the collection. Multiple class names can be given in a space-separated string.
	* @param name
	* @return
	**/
	addClass(name: string): ZeptoCollection;

	/**
	* Add content to the DOM after each elements in the collection. The content can be an HTML string, a DOM node or an array of nodes.
	* @param content
	* @return
	**/
	after(content: string): ZeptoCollection;

	/*
	* @see ZeptoCollection.after
	**/
	after(content: HTMLElement): ZeptoCollection;

	/**
	* @see ZeptoCollection.after
	**/
	after(content: HTMLElement[]): ZeptoCollection;

	/**
	* shared.append content to the DOM inside each individual element in the collection. The content can be an HTML string, a DOM node or an array of nodes.
	* @param content
	* @return
	**/
	append(content: string): ZeptoCollection;

	/**
	* @see ZeptoCollection.append
	**/
	append(content: HTMLElement): ZeptoCollection;

	/**
	* @see ZeptoCollection.append
	**/
	append(content: HTMLElement[]): ZeptoCollection;

    append(content: ZeptoCollection): ZeptoCollection;


	/**
	* shared.append elements from the current collection to the target element. This is like shared.append, but with reversed operands.
	* @param target
	* @return
	**/
	appendTo(target: string): ZeptoCollection;

	/**
	* @see ZeptoCollection.appendTo
	**/
	appendTo(target: HTMLElement): ZeptoCollection;

	/**
	* @see ZeptoCollection.appendTo
	**/
	appendTo(target: HTMLElement[]): ZeptoCollection;

	/**
	* Read or set DOM attributes. When no value is given, reads specified attribute from the first element in the collection. When value is given, sets the attribute to that value on each element in the collection. When value is null, the attribute is removed (like with removeAttr). Multiple attributes can be set by passing an object with name-value pairs.
	* To read DOM properties such as checked or selected, use prop.
	* @param name
	* @return
	**/
	attr(name: string): string;

	/**
	* @see ZeptoCollection.attr
	* @param value
	**/
	attr(name: string, value: any): ZeptoCollection;

	/**
	* @see ZeptoCollection.attr
	* @param fn
	* @param oldValue
	**/
	attr(name: string, fn: (index: number, oldValue: any) => void ): ZeptoCollection;

	/**
	* @see ZeptoCollection.attr
	* @param object
	**/
	attr(object: any): ZeptoCollection;

	/**
	* Add content to the DOM before each element in the collection. The content can be an HTML string, a DOM node or an array of nodes.
	* @param content
	* @return
	**/
	before(content: string): ZeptoCollection;

	/**
	* @see ZeptoCollection.before
	**/
	before(content: HTMLElement): ZeptoCollection;

	/**
	* @see ZeptoCollection.before
	**/
	before(content: HTMLElement[]): ZeptoCollection;

	/**
	* Get immediate children of each element in the current collection. If selector is given, filter the results to only include ones matching the CSS selector.
	* @param selector
	* @return
	**/
	children(selector?: string): ZeptoCollection;

	/**
	* Duplicate all elements in the collection via deep clone.
	* (!) This method doesn't have an option for copying data and event handlers over to the new elements, as it has in jQuery.
	* @return
	**/
	clone(): ZeptoCollection;

	/**
	* Traverse upwards from the current element to find the first element that matches the selector. If context node is given, consider only elements that are its descendants. This method is similar to parents(selector), but it only returns the first ancestor matched.
	* If a Zepto collection or element is given, the resulting element will have to match one of the given elements instead of a selector.
	* @param selector
	* @param context
	* @return
	**/
	closest(selector: string, context?: any): ZeptoCollection;

	/**
	* Modify the collection by adding elements to it. If any of the arguments is an array, its elements are merged into the current collection.
	* (!) This is a Zepto-provided method that is not part of the jQuery API.
	* @param nodes
	* @return
	**/
	concat(...nodes: any[]): ZeptoCollection;

	/**
	* Get the children of each element in the collection, including text and comment nodes.
	* @return
	**/
	contents(): ZeptoCollection;

	/**
	* Read or set CSS properties on DOM elements. When no value is given, returns the CSS property from the first element in the collection. When a value is given, sets the property to that value on each element of the collection. Multiple properties can be set by passing an object to the method.
	* When a value for a property is blank (empty string, null, or undefined), that property is removed. When a unitless number value is given, �px� is shared.appended to it for properties that require units.
	* @param property
	* @return
	**/
	css(property: string): any;
	css(property: string, value: any): ZeptoCollection;
	css(properties: any): ZeptoCollection;
	data(name: string): any;
	data(name: string, value: any): ZeptoCollection;
	each(fn: (index: number, item: any) => boolean): ZeptoCollection;
	empty(): ZeptoCollection;
	eq(index: number): ZeptoCollection;
	filter(selector: string): ZeptoCollection;
	filter(fn: (index: number) => boolean): ZeptoCollection;
	find(selector: string): ZeptoCollection;
	first(): ZeptoCollection;
	forEach(fn: (item: any, index: number, array: any[]) => void ): ZeptoCollection;
	get(): HTMLElement[];
	get(index: number): HTMLElement;
	has(selector: string): ZeptoCollection;
	has(node: HTMLElement): ZeptoCollection;
	hasClass(name: string): boolean;
	height(): number;
	height(value: number): ZeptoCollection;
	height(fn: (index: number, oldHeight: number) => void ): ZeptoCollection;
	hide(): ZeptoCollection;
	html(): string;
	html(content: string): ZeptoCollection;
	html(content: HTMLElement): ZeptoCollection;
	html(content: HTMLElement[]): ZeptoCollection;
	html(fn: (index: number, oldHtml: string) => void ): ZeptoCollection;
	index(element?: string): number;
	index(element?: HTMLElement): number;
	index(element?: any): number; // not sure so leaving in for now
	indexOf(element?: string, fromIndex?: number): number;
	indexOf(element?: HTMLElement, fromIndex?: number): number;
	indexOf(element?: any, fromIndex?: number): number; // not sure so leaving in for now
	insertAfter(target: string): ZeptoCollection;
	insertAfter(target: HTMLElement): ZeptoCollection;
	insertBefore(target: string): ZeptoCollection;
	insertBefore(target: HTMLElement): ZeptoCollection;
	is(selector?: string): boolean;
	last(): ZeptoCollection;
	map(fn: (index: number, item: any) => any): ZeptoCollection;
	next(selector?: string): ZeptoCollection;
	not(selector: string): ZeptoCollection;
	not(collection: ZeptoCollection): ZeptoCollection;
	not(fn: (index: number) => boolean): ZeptoCollection;
	offset(): ZeptoCoordinates;
	offset(coordinates: ZeptoPosition): ZeptoCollection;
	//offset(position: ZeptoCoordinates): ZeptoCollection;
	offset(fn: (index: number, oldOffset: number) => void ): ZeptoCollection; // not sure how this works lol!
	offsetParent(): ZeptoCollection;
	parent(selector?: string): ZeptoCollection;
	parents(selector?: string): ZeptoCollection;
	pluck(property: string): string[];
	position(): ZeptoPosition;
	prepend(content: string): ZeptoCollection;
	prepend(content: HTMLElement): ZeptoCollection;
	prepend(content: HTMLElement[]): ZeptoCollection;
	prependTo(content: string): ZeptoCollection;
	prependTo(content: HTMLElement): ZeptoCollection;
	prependTo(content: HTMLElement[]): ZeptoCollection;
	prev(selector?: string): ZeptoCollection;
	prop(name: string): any;
	prop(name: string, value: any): ZeptoCollection;
	prop(name: string, fn: (index: number, oldValue: any) => void ): ZeptoCollection;
	push(...elements: any[]): ZeptoCollection;
	ready(fn: ($: ZeptoStatic) => void ): ZeptoCollection;
	reduce(fn: (memo: any, item: any, index: number, array: any[], initial?: any) => any): any;
	remove(): ZeptoCollection;
	removeAttr(name: string): ZeptoCollection;
	removeClass(name?: string): ZeptoCollection;
	removeClass(fn: (index: number, oldClassName: string) => void ): ZeptoCollection;
	replaceWith(content: string): ZeptoCollection;
	replaceWith(content: HTMLElement): ZeptoCollection;
	replaceWith(content: HTMLElement[]): ZeptoCollection;
	scrollTop(): number;
	show(): ZeptoCollection;
	siblings(selector?: string): ZeptoCollection;
	size(): number;
	slice(start?: number, end?: number): HTMLElement[];	// hah maybe
	text(): string;
	text(content: string): ZeptoCollection;
	toggle(setting?: boolean): ZeptoCollection;
	toggleClass(names: string, setting?: boolean): ZeptoCollection;	// names is a space delimited list
	unwrap(): ZeptoCollection;
	val(): string;
	val(value: any): ZeptoCollection;
	val(fn: (index: number, oldValue: any) => void): ZeptoCollection;
	width(): number;
	width(value: number): ZeptoCollection;
	width(fn: (index: number, oldWidth: number) => void ): ZeptoCollection;
	wrap(structure: string): ZeptoCollection;
	wrap(structure: HTMLElement): ZeptoCollection;
	wrap(fn: (index: number) => string): ZeptoCollection;
	wrapAll(structure: string): ZeptoCollection;
	wrapAll(structure: HTMLElement): ZeptoCollection;
	wrapInner(structure: string): ZeptoCollection;
	wrapInner(structure: HTMLElement): ZeptoCollection;
	wrapInner(fn: (index: number) => string): ZeptoCollection;

	/**
	* Event
	**/

	bind(type: string, fn: (e: Event) => void): ZeptoCollection;
	delegate(selector: string, type: string, fn: (e: Event) => void): ZeptoCollection;
	die(type: string, fn: (e: Event) => void): ZeptoCollection;
	live(type: string, fn: (e: Event) => void): ZeptoCollection;
	off(type: string, selector: string, fn: (e: Event) => boolean): ZeptoCollection;
	off(type: string, fn: (e: Event) => boolean): ZeptoCollection;
	off(type: string, selector?: string): ZeptoCollection;
	off(): ZeptoCollection;

	on(type: string, selector: string, fn: (e: Event) => boolean): ZeptoCollection;
	on(type: string, fn: (e: Event) => boolean): ZeptoCollection;
	/**
	todo: for typescript v0.9 constant overloads are available.
	on(type: 'ajaxStart', fn: ZeptoAjaxStartEvent): ZeptoCollection;
	on(type: 'ajaxBeforeSend', fn: ZeptoAjaxBeforeSendEvent): ZeptoCollection;
	on(type: 'ajaxSend', fn: ZeptoAjaxSendEvent): ZeptoCollection;
	on(type: 'ajaxSuccess', fn: ZeptoAjaxSuccessEvent): ZeptoCollection;
	on(type: 'ajaxError', fn: ZeptoAjaxErrorEvent): ZeptoCollection;
	on(type: 'ajaxComplete', fn: ZeptoAjaxCompleteEvent): ZeptoCollection;
	on(type: 'ajaxStop', fn: ZeptoAjaxStopEvent): ZeptoCollection;
	**/

	one(type: string, fn: (e: Event) => void ): ZeptoCollection;
	trigger(event: string, data: any[]): ZeptoCollection;
	triggerHandler(event: string, data: any[]): ZeptoCollection;
	unbind(type: string, fn: (e: Event) => boolean): ZeptoCollection;
	undelegate(selector: string, type: string, fn: (e: Event) => boolean): ZeptoCollection;

	/**
	* Ajax
	**/

	/**
	* Set the html contents of the current collection to the result of a GET Ajax call to the given URL. Optionally, a CSS selector can be specified in the URL, like so, to use only the HTML content matching the selector for updating the collection:
	* $('#some_element').load('/foo.html #bar')
	* If no CSS selector is given, the complete response text is used instead.
	* Note that any JavaScript blocks found are only executed in case no selector is given.
	* @param url URL to send the HTTP GET request to.
	* @param fn Callback function when the HTTP GET request is completed.
	* @return ZeptoCollection self object.
	* @example
	*	$('#some_element').load('/foo.html #bar')
	**/
	load(url: string, fn?: (data: any, status?: string, xhr?: XMLHttpRequest) => void ): ZeptoCollection;

	/**
	* Form
	**/

	/**
	* Serialize form values to an URL-encoded string for use in Ajax post requests.
	* @return Seralized form values in URL-encoded string.
	**/
	serialize(): string;

	/**
	* Serialize form into an array of objects with name and value properties. Disabled form controls, buttons, and unchecked radio buttons/checkboxes are skipped. The result doesn�t include data from file inputs.
	* @return Array with name value pairs from the Form.
	**/
	serializeArray(): Array<any>;

	/**
	* Trigger or attach a handler for the submit event. When no function given, trigger the �submit� event on the current form and have it perform its submit action unless preventDefault() was called for the event.
	* When a function is given, this simply attaches it as a handler for the �submit� event on current elements.
	**/
	submit(): ZeptoCollection;

	/**
	* @see ZeptoCollection.submit
	* @param fn Handler for the 'submit' event on current elements.
	**/
	submit(fn: (e: any) => void ): ZeptoCollection;

	/**
	* Effects
	**/

	/**
	* Smoothly transition CSS properties of elements in the current collection.
	* @properties object that holds CSS values to animate to; or CSS keyframe animation name.
	*	Zepto also supports the following CSS transform porperties:
	*		translate(X|Y|Z|3d)
	*		rotate(X|Y|Z|3d)
	*		scale(X|Y|Z)
	*		matrix(3d)
	*		perspective
	*		skew(X|Y)
	* @duration (default 400): duration in milliseconds, or a string:
	*		fast (200 ms)
	*		slow (600 ms)
	*		any custom property of $.fx.speeds
	* @easing (default linear): specifies the type of animation easing to use, one of:
	*		ease
	*		linear
	*		ease-in
	*		ease-out
	*		ease-in-out
	*		cubic-bezier(x1, y1, x2, y2)
	* @complete Callback function when the animation has completed.
	* @note If the duration is 0 or $.fx.off is true (default in a browser that doesn�t support CSS transitions), animations will not be executed; instead the target values will take effect instantly. Similarly, when the target CSS properties match the current state of the element, there will be no animation and the complete function won�t be called.
	*	If the first argument is a string instead of object, it is taken as a CSS keyframe animation name.
	* @note Zepto exclusively uses CSS transitions for effects and animation. jQuery easings are not supported. jQuery's syntax for relative changes ("=+10px") is not supported. See the spec for a list of animatable properties (http://www.w3.org/TR/css3-transitions/#animatable-properties-). Browser support may vary, so be sure to test in all browsers you want to support.
	**/
	animate(properties: any, duration?: number, easing?: string, complete?: () => void ): ZeptoCollection;

	/**
	* @see ZeptoCollection.animate
	**/
	animate(properties: any, options: ZeptoAnimateSettings): ZeptoCollection;
}

interface ZeptoAjaxSettings {
	type?: string;
	url?: string;
	data?: any;
	processData?: boolean;
	contentType?: string;
	dataType?: string;
	timeout?: number;
	headers?: string;
	async?: boolean;
	global?: boolean;
	context?: any;
	traditional?: boolean;
	beforeSend?: (xhr: XMLHttpRequest, settings: ZeptoAjaxSettings) => boolean;
	success?: (data: any, status: string, xhr: XMLHttpRequest) => void;
	error?: (xhr: XMLHttpRequest, errorType: string, error: Error) => void;
	complete?: (xhr: XMLHttpRequest, status: string) => void;
}

// Fired if no other ajax requests are currently active
// event name: ajaxStart
interface ZeptoAjaxStartEvent {
	(): void;
}

// Before sending the request, can be cancelled
// event name: ajaxBeforeSend
interface ZeptoAjaxBeforeSendEvent {
	(xhr: XMLHttpRequest, options: ZeptoAjaxSettings): void;
}

// Like ajaxBeforeSend, but not cancellable
// event name: ajaxSend
interface ZeptoAjaxSendEvent {
	(xhr: XMLHttpRequest, options: ZeptoAjaxSettings): void;
}

// When the response is success
// event name: ajaxSuccess
interface ZeptoAjaxSuccessEvent {
	(xhr: XMLHttpRequest, options: ZeptoAjaxSettings, data: any): void;
}

// When there was an error
// event name: ajaxError
interface ZeptoAjaxErrorEvent {
	(xhr: XMLHttpRequest, options: ZeptoAjaxSettings, error: Error): void;
}

// After request has completed, regardless of error or success
// event name: ajaxComplete
interface ZeptoAjaxCompleteEvent {
	(xhr: XMLHttpRequest, options: ZeptoAjaxSettings): void;
}

// Fired if this was the last active Ajax request.
// event name: ajaxStop
interface ZeptoAjaxStopEvent {
	(): void;
}

interface ZeptoAnimateSettings {
	duration?: number;
	easing?: string;
	complete?: () => void;
}

interface ZeptoPosition {
	top: number;
	left: number;
}

interface ZeptoCoordinates extends ZeptoPosition {
	width: number;
	height: number;
}

declare var Zepto: (fn: ($: ZeptoStatic) => void) => void;
declare var $: ZeptoStatic;