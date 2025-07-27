import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { SendFcmDto } from './dto/send-fcm.dto';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import * as serviceAccount from '../../service-account.json';

@Injectable()
export class FcmService {
  private readonly logger = new Logger(FcmService.name);

  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(
          serviceAccount as admin.ServiceAccount,
        ),
      });
    }
  }

  async sendNotification(dto: SendFcmDto): Promise<string> {
    const message: admin.messaging.Message = {
      notification: {
        title: dto.title,
        body: dto.body,
      },
      token: dto.token,
    };

    try {
      const response = await admin.messaging().send(message);
      this.logger.log(`✅ Gửi thành công: ${response}`);
      return response;
    } catch (error) {
      this.logger.error('❌ Gửi thất bại:', error);
      throw error;
    }
  }
}
