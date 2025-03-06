/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import * as path from 'path';

type UploadedFile = Express.Multer.File;

@Injectable()
export class R2Service {
  private s3Client: S3Client;

  constructor() {
    if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
      throw new Error('R2 credentials are not configured');
    }

    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: process.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
      forcePathStyle: true,
      maxAttempts: 3,
      retryMode: 'standard'
    });
  }

  async uploadFile(
    file: UploadedFile | undefined,
    folder: string,
    metadata?: Record<string, string>
  ): Promise<string> {
    if (!file || !file.originalname) {
      throw new Error('No file provided');
    }

    try {
      const fileExt = path.extname(file.originalname);
      const key = `${folder}/${Date.now()}${fileExt}`;

      // Debug logging
      console.log('File details:', {
        name: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        buffer: file.buffer ? 'Present' : 'Missing',
        bufferSize: file.buffer?.length || 0
      });

      if (!file.buffer || file.buffer.length === 0) {
        throw new Error('File buffer is empty');
      }

      const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME || '',
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ContentLength: file.buffer.length,
      });

      await this.s3Client.send(command);
      return `${process.env.S3_API}/${key}`;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }

  async uploadFileWithCustomName(
    file: UploadedFile,
    customPath: string,
    metadata?: Record<string, string>
  ): Promise<string> {
    await this.s3Client.send(new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME || '',
      Key: customPath,
      Body: file.buffer,
      ContentType: file.mimetype,
      Metadata: metadata,
    }));

    return `${process.env.S3_API}/${customPath}`;
  }

  async uploadFileOptional(
    file: UploadedFile | undefined,
    folder: string,
    defaultValue: string,
    metadata?: Record<string, string>
  ): Promise<string> {
    if (!file || !file.originalname) {
      return defaultValue;
    }

    return this.uploadFile(file, folder, metadata);
  }
} 