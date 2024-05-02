const amqp = require('amqplib/callback_api')
const url = process.env['url']

amqp.connect(url, function(error0, connection){
  if(error0){
    throw error0
  }

  connection.createChannel(function(error1, channel){
    if(error1){
      throw error1
    }

    var queue = 'task_queue'

    channel.assertQueue(queue, {durable : true})
    channel.prefetch(1)
    console.log('Esperando pelas mensagens da fila: ' + queue)
    channel.consume(queue, function(msg){
      console.log('[X] Mensagem recebida: ', msg.content.toString())

      setTimeout(function(){
        console.log('Terminado')
        channel.ack(msg)
      }, 500)
    }, {noAck : false})
  })
})