export interface Attachment {
    filename: string;
    path: string;
}


export interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[]
}