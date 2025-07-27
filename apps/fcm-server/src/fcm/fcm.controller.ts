import { Body, Controller, Post } from '@nestjs/common';
import { FcmService } from './fcm.service';
import { SendFcmDto } from './dto/send-fcm.dto';

@Controller('fcm')
export class FcmController {
  constructor(private readonly fcmService: FcmService) {}

  @Post('send-notification')
  sendNotification(@Body() dto: SendFcmDto) {
    return this.fcmService.sendNotification(dto);
  }
}
