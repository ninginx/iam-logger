import { SNS } from '../core/repositry';
import { OAuth } from 'oauth';

export class Twitter implements SNS {
  post = async (status: string): Promise<void> => {
    // if (!this.oauth || !this.credentials) {
    //   throw Error('Unable to make request. Authentication has not been established');
    // }

    const oauth = new OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      process.env.TW_API_KEY!,
      process.env.TW_API_SECRET!,
      '1.0A',
      null,
      'HMAC-SHA1',
    );

    return new Promise((resolve, reject) => {
      const formattedStatus = encodeURIComponent(status);
      oauth.post(
        `https://api.twitter.com/1.1/statuses/update.json?status=${formattedStatus}`,
        process.env.TW_TOKEN!,
        process.env.TW_TOKEN_SECRET!,
        '{}',
        '{application/json}',
        (err: { statusCode: number; data?: any }, body?: string | Buffer) => {
          if (err) {
            reject(err);
            return;
          }
          console.log(body);
        },
      );
    });
  };
}
