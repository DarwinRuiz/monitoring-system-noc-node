import nodemailer from 'nodemailer';

import { EmailService } from '../../../../src/presentation/email/email.service';
import { SendEmailOptions } from '../../../../src/presentation/interfaces/send-emails-options.interface';


describe('Tests for email.service.ts file', () => {

    const mockSendMail = jest.fn();

    nodemailer.createTransport = jest.fn().mockReturnValue({ sendMail: mockSendMail });

    const emailService = new EmailService();

    test('should send email', async () => {


        const options: SendEmailOptions = {
            to: 'darwinruiz@github.com',
            subject: 'Test Jest',
            htmlBody: '<h1>Test Jest</h1>'
        };

        await emailService.sendEmail(options);

        expect(mockSendMail).toHaveBeenCalledWith(
            {
                "attachments": expect.any(Array),
                "html": "<h1>Test Jest</h1>",
                "subject": "Test Jest",
                "to": "darwinruiz@github.com",
            }
        )

    });

    test('should send email with attachements', async () => {

        const email = 'darwinruiz@github.com';
        await emailService.sendEmailWithFileSystemLogs(email);

        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: 'Log del servidor',
            html: expect.any(String),
            attachments: [
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
        })

    });

});