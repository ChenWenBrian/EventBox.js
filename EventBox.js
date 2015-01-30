/************************************************************************************************************************** 
* EventBox Class
* Inherit from this class,  it provides register clients and trigger event on each clients' related function.
* @constructor
* @this {EventBox}
* @author Brian Chen
*/
function EventBox() {
    this.clients = {};
    this.events = {};
}

/**
* trigger a event on a client or all clients or @this
* @this {EventBox}
* @param {string|null|this} a client name, or null to specify all clients, or this object to trigger on self events.  
* @param {string} event name
* @param {...*} aditional event arguments
* @return {*} client event result
*/
EventBox.prototype.trigger = function (clientName, eventName) {
    if (!eventName || typeof eventName !== 'string') throw 'Invalid eventName!';
    var args = Array.prototype.slice.call(arguments, 2);
    if (clientName === this) {
        var handlers = this.events[eventName];
        if (handlers && handlers.length) {
            for (var i = 0; i < handlers.length; i++) {
                handlers[i].apply(this, args);
            }
        }
        return true;
    } else if (clientName === null) {
        for (var key in this.clients) {
            var target = this.clients.hasOwnProperty(key) && this.clients[key],
                fn = target && target[eventName];
            if (typeof fn === 'function') fn.apply(target, args);
        }
        return true;
    } else if (typeof clientName === 'string'){
        var client = this.clients[clientName],
            event = client && client[eventName];
        if (typeof event === 'function') return event.apply(client, args);
        return false;
    } else {
		throw 'Invalid clientName!';
	}
};

/**
* register client
* @param {string} clientName
* @param {object} client object with event receivers
*/
EventBox.prototype.register = function (clientName, client) {
    if (!clientName || typeof clientName !== 'string') throw 'Invalid clientName!';
    this.clients[clientName] = client;
};

/**
* bind event receiver on @this
* @this {EventBox}
* @param {string} eventName
* @param {function} event receiver
*/
EventBox.prototype.on = function (eventName, callback) {
    if (!eventName || typeof eventName !== 'string') throw 'Invalid eventName!';
    if (typeof callback !== 'function') throw 'Invalid callback function!';
    if (!this.events[eventName]) this.events[eventName] = [callback];
    else this.events[eventName].push(callback);
};
