import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../shared/infrastructure/prisma.service';
import { Session } from '../../types/session';
import { AddLinkDto } from './dto/add-link.dto';
import { LogsService } from '../logs/logs.service';

@Injectable()
export class LinksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logsService: LogsService,
  ) {}

  async getAllLinks() {
    return this.prisma.link.findMany();
  }

  async updateOrInsert(data: AddLinkDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const existingLink = await this.prisma.link.findFirst();

    let link;
    if (existingLink) {
      link = await this.prisma.link.update({
        where: { id: existingLink.id },
        data,
      });
    } else {
      link = await this.prisma.link.create({
        data,
      });
    }

    await this.logsService.add({
      type: 'MODIFICATION/AJOUT',
      message: `L'utilisateur ${user.name} a mis à jour ou inséré un lien. ID: ${link.id}`,
      userId: user.id,
    });

    return { message: 'Le lien a été mis à jour ou inséré avec succès.' };
  }
}
