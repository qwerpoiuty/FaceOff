window.faceoff = new window.EventEmitter();

(function() {
    window.onload = function(e) {

        //somehow grab the answers
        var i = 0
        window.onkeydown = function(e) {
            var question = eval($('#question').text())
            var key = e.which || e.keyCode;
            if (key === 13) {
                answer = parseInt($('#answer').val())
                $('#answer').val('')
                console.log(question, answer)
                if (question === answer) {
                    var temp = Math.floor(Math.random() * 10)
                    var temp2 = Math.floor(Math.random() * 10)
                    $('#question').text(temp + "+" + temp2)
                    $('#answer').val('')
                    faceoff.answer(player, true)
                }
            }
        }



        var video = $('#video');
        console.log()
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");

        // var context = canvas.getContext('2d');
        var tracker = new tracking.ObjectTracker('face');
        console.log(tracking)
        tracker.setInitialScale(4);
        tracker.setStepSize(2);
        tracker.setEdgesDensity(0.1);

        tracking.track('#video', tracker, {
            camera: true
        });
        var bullets = []
        var incoming = []
        var bullet = {
            color: "blue",
            width: 20,
            height: 20,
            x: 0,
            y: 300,
            friendly: true,
            draw: function(x, y) {
                this.y = y
                if (this.x === 0) this.x = x
                context.fillStyle = this.color
                context.fillRect(this.x, this.y, this.width, this.height)
            },
            move: function() {
                if (this.friendly) {
                    this.y = this.y - 10
                    context.fillStyle = this.color
                    context.fillRect(this.x, this.y, this.width, this.height)
                } else {
                    this.y = this.y + 10
                    context.fillstyle = "red"
                    context.fillRect(this.x, this.y, this.width, this.height)
                }
            }

        }
        var player = {
            color: "green",
            x: 0,
            y: 500,
            width: 50,
            height: 50,
            draw: function(x) {
                this.x = x
                context.fillStyle = this.color
                context.fillRect(this.x, this.y, this.width, this.height)
            },
            attack: function(x) {
                var fire = Object.create(bullet)
                fire.draw(x, 500)
                bullets.push(fire)
            }
        }
        var enemy = {
            color: "black",
            x: 0,
            y: 0,
            width: 50,
            height: 50,
            draw: function() {
                context.fillStyle = this.color
                context.fillRect(this.x, this.y, this.width, this.height)
            },
            attack: function(x) {
                var fire = Object.create(bullet)
                console.log('attacking')
                fire.draw(x, 500)
                bullets.push(fire)
            }
        }
        tracker.on('track', function(event) {
            event.data.forEach(function(rect) {
                context.clearRect(0, 0, 1000, 1000)
                player.draw(1000 - rect.x * 5)
                bullets.forEach(function(e) {
                    e.move()
                    if (e.y < 30 && Math.abs(e.x - enemy.x) < 15) {
                        $("#score").text('You win')
                    }
                    if (e.y < 0) {
                        bullets.shift()
                    }
                })
                incoming.forEach(function(e) {
                    e.move()
                    if (e.y > 970 && Math.abs(e.x - player.x) < 15) {
                        $("#score").text('You Lose')
                    }
                    if (e.y > 1000) {
                        incoming.shift()
                    }
                })
                faceoff.location(player.x, bullets, true)
                enemy.draw()
            });
        });

        faceoff.location = function(xlocation, shouldBroadcast) {
            if (shouldBroadcast) {
                faceoff.emit('location', xlocation)
            }
        }

        faceoff.answer = function(player, shouldBroadcast) {
            if (shouldBroadcast) {
                player.attack(player.x)
                faceoff.emit('answer', player)

            }
        }

        faceoff.getAttacked = function(xlocation) {
            var fire = Object.create(bullet)
            fire.friendly = false
            console.log('enemy sighted!', bullet)
            fire.color = "red"
            fire.x = xlocation.x
            fire.y = 0
            fire.draw()
            incoming.push(bullet)
        }
        faceoff.enemy = function(opponent) {
            enemy.x = opponent
        }

    }
})()