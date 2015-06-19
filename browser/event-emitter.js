window.EventEmitter = function(){
	this.subscribers = {}
};

(function(EE){
	EE.prototype.on = function(eventName, EventListener){
		if(!this.subscribers[eventName]) this.subscribers[eventName] = [];
		
		this.subscribers[eventName].push(EventListener);
	}

	EE.prototype.emit = function(eventName){
		if (!this.subscribers[eventName]) return;

		var remainingArgs = [].slice.call(arguments,1);

		this.subscribers[eventName].forEach(function(listener){
			listener.apply(null,remainingArgs)
		})
	}

})(window.EventEmitter);