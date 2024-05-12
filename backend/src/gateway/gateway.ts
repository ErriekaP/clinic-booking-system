import { Body, OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3001'],
  },
})
export class MyGateway implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');
    });
  }

  async justEmitting() {
    try {
      const ongoingQueues = await this.prisma.queue.findMany({
        where: {
          status: 'ONGOING',
        },
      });

      this.server.emit('justEmitting', ongoingQueues);
    } catch (error) {
      console.error('Error fetching ongoing queues:', error);
    }
  }

  async EmittingOngoingQueues(patientID: number) {
    try {
      const ongoingQueues = await this.prisma.queue.findMany({
        where: {
          patientID: patientID,
          status: {
            in: ['PENDING', 'ONGOING'],
          },
        },
      });

      this.server.emit('justEmitting', ongoingQueues);
    } catch (error) {
      console.error('Error fetching ongoing queues:', error);
    }
  }
}
