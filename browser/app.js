var socket = io(window.location.origin);

socket.on('connect',function(){
	console.log('connected...')
})
faceoff.on('answer', function(xlocation){
    socket.emit("answer",xlocation)
})

faceoff.on('location',function(xlocation){
	socket.emit("location",xlocation)
})
socket.on('enemylocated',function(xlocation){
	faceoff.enemy(xlocation)
})

socket.on('getAttack',function(xlocation){
	faceoff.getAttacked(xlocation)
})
socket.on("disconnect", function(){
    console.log(':(')
})
