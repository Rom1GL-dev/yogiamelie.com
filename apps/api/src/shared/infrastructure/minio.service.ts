import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Injectable()
export class MinioService implements OnModuleInit {
  private readonly client: Minio.Client;
  private readonly bucket: string;
  private readonly publicUrl: string;
  private readonly logger = new Logger(MinioService.name);

  constructor(private readonly configService: ConfigService) {
    this.client = new Minio.Client({
      endPoint: this.configService.get<string>('MINIO_ENDPOINT', 'localhost'),
      port: this.configService.get<number>('MINIO_PORT', 9000),
      useSSL: this.configService.get<string>('MINIO_USE_SSL', 'false') === 'true',
      accessKey: this.configService.get<string>('MINIO_ACCESS_KEY', 'minioadmin'),
      secretKey: this.configService.get<string>('MINIO_SECRET_KEY', 'minioadmin'),
    });
    this.bucket = this.configService.get<string>('MINIO_BUCKET', 'images');
    this.publicUrl = this.configService.get<string>('MINIO_PUBLIC_URL', 'http://localhost:9000');
  }

  async onModuleInit() {
    try {
      const exists = await this.client.bucketExists(this.bucket);
      if (!exists) {
        await this.client.makeBucket(this.bucket);
        this.logger.log(`Bucket "${this.bucket}" created.`);
      }

      const policy = JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: { AWS: ['*'] },
            Action: ['s3:GetObject'],
            Resource: [`arn:aws:s3:::${this.bucket}/*`],
          },
        ],
      });
      await this.client.setBucketPolicy(this.bucket, policy);
      this.logger.log(`Bucket "${this.bucket}" ready with public read policy.`);
    } catch (error) {
      this.logger.error('Failed to initialize MinIO bucket', error);
    }
  }

  async upload(
    category: string,
    fileName: string,
    buffer: Buffer,
    mimeType: string,
  ): Promise<string> {
    const objectName = `${category}/${fileName}`;
    await this.client.putObject(this.bucket, objectName, buffer, buffer.length, {
      'Content-Type': mimeType,
    });
    return this.getPublicUrl(category, fileName);
  }

  getPublicUrl(category: string, fileName: string): string {
    return `${this.publicUrl}/${this.bucket}/${category}/${fileName}`;
  }

  async getObject(
    category: string,
    fileName: string,
  ): Promise<{ stream: NodeJS.ReadableStream; contentType: string }> {
    const objectName = `${category}/${fileName}`;
    const stat = await this.client.statObject(this.bucket, objectName);
    const stream = await this.client.getObject(this.bucket, objectName);
    return {
      stream,
      contentType: stat.metaData['content-type'] || 'application/octet-stream',
    };
  }

  async delete(category: string, fileName: string): Promise<void> {
    const objectName = `${category}/${fileName}`;
    await this.client.removeObject(this.bucket, objectName);
  }
}
