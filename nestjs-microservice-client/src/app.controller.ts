import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Message } from './message.event';

@Controller()
export class AppController {
  /**
   * ClientProxy는 Lazy 하므로 즉시 연결을 하지 않는다.
   *
   */
  constructor(@Inject('HELLO_SERVICE') private readonly client: ClientProxy) {}

  async onApplicationBoostrap() {
    await this.client.connect();
  }

  @Get()
  getHello(): string {
    // 이벤트를 보내려면 ClientProxy의 emit() 메서드 사용
    // emit메서드는 메시지 브로커에 이벤트를 게시
    this.client.emit<any>('message_printed', new Message('Hello world'));

    return 'Hello World Printed';
  }
}
