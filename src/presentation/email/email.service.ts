import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { Attachment, SendEmailOptions } from '../interfaces/send-emails-options.interface';

export class EmailService {
    private transporter: nodemailer.Transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    })

    async sendEmail(options: SendEmailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            })

            return true
        } catch (error) {
            return false
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]): Promise<boolean> {
        const subject = 'Log del servidor';
        const htmlBody = `
        <h1>Log de sistema NOC de Node</h1>
        <p>Prueba ejecutada por Darwin Ruiz</p>
        <a href="https://github.com/DarwinRuiz">Ir a GitHub</a>
        `;
        const attachments: Attachment[] = [
            {
                filename: 'logs-all.log',
                path: './logs/logs-all.log'
            },
            {
                filename: 'logs-high.log',
                path: './logs/logs-high.log'
            },
            {
                filename: 'logs-medium.log',
                path: './logs/logs-medium.log'
            }
        ]
        return this.sendEmail({ to, subject, htmlBody, attachments })
    }
}