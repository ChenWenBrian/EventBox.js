EventBox.js
============

EventBox.js is a events based object which provides register/trigger events for self or client object. 

EventBox.js is the solution to register varies of client objects with event handler and 
then trigger these event handlers in a single place or trigger event on a specified client, 
or simply bind global event handler and trigger it. You may implement this class to have your own
class.

### Basic Code Sample:
------------------

Create object:

```js
var box = new EventBox();
```

Bind a global event handler on self:

```js
box.on('onShow', function(evt){
  alert('This is a global on show event');
});
```

Register a client object with 'onShow' handler:

```js
box.register('child1', {
  onShow: function(evt){
    alert('this is child 1');
  }
});

box.register('child', {
  onShow: function(evt){
    alert('this is child 2');
  }
});
```

Trigger this with 'onShow' event:

```js
box.trigger(box, 'onShow');
```

Trigger a client object with 'onShow' event:

```js
box.trigger('child1', 'onShow');
```

Trigger all clients object with 'onShow' event:

```js
box.trigger(null, 'onShow');
```

### Implementation with EventBox:
------------------

Sample:

```js
var TabSwitcher = function() {
    // Call the parent constructor
    EventBox.call(this);
    
    //your custom code here...
};

// inherit from EventBox
TabSwitcher.prototype = new EventBox();
TabSwitcher.prototype.constructor = TabSwitcher;
```

