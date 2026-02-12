import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../shared/infrastructure/prisma.service';
import { Session } from '../../types/session';
import { AddLinkDto } from './dto/add-link.dto';
import { CreateLogService } from '../logs/usecases/create-log/create-log.service';

@Injectable()
export class LinksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly createLogService: CreateLogService,
  ) {}

  async getAllLinks() {
    return this.prisma.link.findMany();
  }

  async updateOrInsert(data: AddLinkDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException('Demande non autorisee. Veuillez vous connecter.');
    }

    const existingLink = await this.prisma.link.findFirst();

    let link;
    if (existingLink) {
      link = await this.prisma.link.update({
        where: { id: existingLink.id },
        data,
      });
    } else {
      link = await this.prisma.link.create({ data });
    }

    await this.createLogService.execute({
      type: 'MODIFICATION/AJOUT',
      message: `L'utilisateur ${user.name} a mis a jour ou insere un lien. ID: ${link.id}`,
      userId: user.id,
    });

    return { message: 'Le lien a ete mis a jour ou insere avec succes.' };
  }
}
