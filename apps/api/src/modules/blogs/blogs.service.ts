import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../shared/infrastructure/prisma.service';
import { Session } from '../../types/session';
import { AddBlogDto } from './dto/add-blog.dto';
import { DeleteBlogDto } from './dto/remove-blog.dto';
import { LogsService } from '../logs/logs.service';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logsService: LogsService,
  ) {}

  async getAllBlogs() {
    return this.prisma.blog.findMany();
  }

  async add(data: AddBlogDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const blog = await this.prisma.blog.create({
      data,
    });

    await this.logsService.add({
      type: 'AJOUT',
      message: `L'utilisateur ${user.name} a ajouté un blog. ID: ${blog.id}`,
      userId: user.id,
    });

    return { message: 'Le nouveau blog a été ajouté.' };
  }

  async delete(data: DeleteBlogDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }
    const blog = await this.prisma.blog.delete({
      where: {
        id: data.id,
      },
    });

    await this.logsService.add({
      type: 'SUPPRESSION',
      message: `L'utilisateur ${user.name} a supprimé un blog.`,
      userId: user.id,
    });

    if (!blog) {
      return { message: "Le blog n'a pas pu être supprimé." };
    }
    return { message: 'Le blog a bien été supprimé.' };
  }

  async update(data: UpdateBlogDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }
    const blog = await this.prisma.blog.update({
      where: {
        id: data.id,
      },
      data,
    });

    await this.logsService.add({
      type: 'MODIFICATION',
      message: `L'utilisateur ${user.name} a modifié un blog. ID: ${blog.id}`,
      userId: user.id,
    });

    if (!blog) {
      return { message: "Le blog n'a pas pu être modifié." };
    }
    return { message: 'Le blog a bien été modifié.' };
  }
}
