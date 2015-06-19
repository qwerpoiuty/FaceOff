var socket = io(window.location.origin);

socket.on('connect',function(){
	console.log('connected...')
})
faceoff.on('answer', function(id){
    socket.emit("answer",id)
	console.log('emitting',id)
})
socket.on('answer',function(id){
   faceoff.emit
})
socket.on('attack',function(){
	console.log('attacking')
	faceoff.attack()
})
socket.on("disconnect", function(){
    console.log(':(')
})
