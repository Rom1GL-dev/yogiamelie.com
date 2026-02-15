import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage, Multer } from 'multer';
import { Response as ExpressResponse } from 'express';
import { randomUUID } from 'crypto';
import { routesV1 } from '../../config/app.routes';
import { MinioService } from '../../shared/infrastructure/minio.service';

@Controller(routesV1.version)
export class ImagesController {
  constructor(private readonly minioService: MinioService) {}

  @Post(routesV1.image.upload)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  async uploadImage(
    @UploadedFile() file: Multer.File,
    @Param('category') category: string,
  ) {
    if (!file) {
      return { message: 'No file uploaded.' };
    }

    const ext = file.originalname.includes('.')
      ? file.originalname.substring(file.originalname.lastIndexOf('.'))
      : '';
    const uniqueName = `${randomUUID()}${ext}`;

    const url = await this.minioService.upload(
      category,
      uniqueName,
      file.buffer,
      file.mimetype,
    );

    return {
      url,
      fileName: uniqueName,
    };
  }

  @Get(routesV1.image.getImage)
  async getImage(
    @Param('category') category: string,
    @Param('imageName') imageName: string,
    @Res() res: ExpressResponse,
  ) {
    try {
      const { stream, contentType } = await this.minioService.getObject(
        category,
        imageName,
      );
      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      (stream as NodeJS.ReadableStream).pipe(res);
    } catch {
      res.status(404).json({ message: 'Image not found' });
    }
  }
}
