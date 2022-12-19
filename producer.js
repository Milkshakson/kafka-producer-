import { Kafka } from "kafkajs";

import {randomUUID}  from 'node:crypto'
import 'dotenv/config';
async function bootstrap(){
    const kafka = new Kafka(
        {
            clientId: 'notifications',
            brokers: ['beloved-wallaby-8418-us1-kafka.upstash.io:9092'],
            sasl: {
              mechanism: 'scram-sha-256',             
              username: process.env.UPSTASH_USER || '',
              password: process.env.UPSTASH_PASSWORD || '',
            },
            ssl: true,
          },
    )

    const producer = kafka.producer()

    await producer.connect()

    await producer.send({
        topic:'notifications.send-notification',
        messages:[
            {
                value: JSON.stringify({
                    content:"Testando Kafka",
                    category:"social",
                    recipientId: randomUUID()
                })
            }
        ]
    })

    await producer.disconnect()
}

bootstrap()