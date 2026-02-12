import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly apiUrl = 'https://api.brevo.com/v3/smtp/email';

  constructor(private readonly configService: ConfigService) {}

  async sendEmail(
    name: string,
    email: string,
    object: string,
    message: string,
  ) {
    const emailData = {
      sender: { email: 'hello@yogiamelie.be', name },
      to: [{ email: 'hello@yogiamelie.be', name: 'Kesharini Yoga' }],
      templateId: 1,
      params: { name, email, object, message },
    };

    console.log(emailData);
    try {
      await axios.post(this.apiUrl, emailData, {
        headers: {
          accept: 'application/json',
          'api-key': this.configService.get('BREVO_API_KEY'),
          'content-type': 'application/json',
        },
      });
      return { message: 'Email envoyé avec succès!' };
    } catch (error) {
      console.error('Brevo error:', error.response?.data || error.message);
      throw new InternalServerErrorException(
        "Erreur lors de l'envoi de l'email",
      );
    }
  }
}
