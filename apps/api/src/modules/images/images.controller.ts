import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, Multer } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import { Response as ExpressResponse } from 'express';
import { routesV1 } from '../../config/app.routes';

@Controller(routesV1.version)
export class ImagesController {
  private basePath = 'apps/yogiamelie.com/images';

  @Post(routesV1.image.upload)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const category = req.params.category;
          const uploadPath = path.join('apps/yogiamelie.com/images', category);
          fs.mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          if (!file) {
            return cb(new Error('No file provided'), null);
          }
          cb(null, file.originalname);
        },
      }),
    }),
  )
  uploadImage(
    @UploadedFile() file: Multer.File,
    @Param('category') category: string,
    @Body() body: any,
  ) {
    if (!file) {
      return { message: 'No file uploaded.' };
    }

    const title = body.title;
    if (!title) {
      return { message: 'TitleCours is required.' };
    }

    const imagePath = path.join(this.basePath, category, file.filename);
    return {
      message: 'Image uploaded successfully',
      path: imagePath,
    };
  }

  @Get(routesV1.image.getImage)
  getImage(
    @Param('category') category: string,
    @Param('imageName') imageName: string,
    @Res() res: ExpressResponse,
  ) {
    const imagePath = path.join(this.basePath, category, imageName);

    if (fs.existsSync(imagePath)) {
      return res.sendFile(imagePath);
    } else {
      return res.status(404).json({ message: 'Image not found' });
    }
  }
}
