import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FcmService } from './fcm/fcm.service';
import { FcmController } from './fcm/fcm.controller';
import { FcmModule } from './fcm/fcm.module';

@Module({
  imports: [FcmModule],
  controllers: [AppController, FcmController],
  providers: [AppService, FcmService],
})
export class AppModule {}
