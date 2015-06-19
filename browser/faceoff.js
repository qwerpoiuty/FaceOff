window.faceoff = new window.EventEmitter();

(function(){
	//somehow grab the answers
	var i = 0
	 window.onkeydown = function(e){
		var question = eval($('#question').text())
    	var key = e.which || e.keyCode;
    	if (key === 13) {
    		answer = parseInt($('#answer').val())
    		$('#answer').val('')
    		console.log(question,answer)
    		if (question === answer){
    			var temp = Math.floor(Math.random() * 50)
    			var temp2 = Math.floor(Math.random() * 50)
    			$('#question').text(temp + "+" + temp2)
    			$('#answer').val('')
    			faceoff.answer(socket.id,true)
    		}
	 	}
	 }

	 faceoff.answer = function(id,shouldBroadcast){

	 	if (shouldBroadcast){
	 		faceoff.emit('answer',id)
	 	}
	 }
	 faceoff.attack = function(){
	 	console.log("you've been attacked")
	 }

})()