var mq = require('amqplib').connect('amqp://localhost');

var q = 'tasks'

mq.then(function(conn){
	return conn.createChannel();

}).then(function(ch){

  // create Channel success
  return ch.assertQueue(q).then(function(ok){
		return ch.consume(q, function(msg){
			console.log(msg.content.toString())
			ch.ack(msg)
		})
  })

})


