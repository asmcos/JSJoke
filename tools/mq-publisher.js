var mq = require('amqplib').connect('amqp://localhost');

var q = 'tasks'

// connect success
mq.then(function(conn){
	return conn.createChannel();

}).then(function(ch){

  // create Channel success
  return ch.assertQueue(q).then(function(ok){

		return ch.sendToQueue(q,new Buffer('something to .....'))

  })


})


