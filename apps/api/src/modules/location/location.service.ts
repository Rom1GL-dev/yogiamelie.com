import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../shared/infrastructure/prisma.service';
import { LogsService } from '../logs/logs.service';
import { AddLocationDto } from './dto/add-location.dto';
import { Session } from '../../types/session';
import { DeleteLocationDto } from './dto/delete-location.dto';

@Injectable()
export class LocationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logsService: LogsService,
  ) {}

  getAll() {
    return this.prisma.location.findMany();
  }

  async add(data: AddLocationDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const location = await this.prisma.location.create({
      data,
    });

    await this.logsService.add({
      type: 'AJOUT',
      message: `L'utilisateur ${user.name} a ajouté un lieu. ID: ${location.id}`,
      userId: user.id,
    });

    return { message: 'Le lieu a été ajouté avec succès', location };
  }

  async delete(data: DeleteLocationDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const location = await this.prisma.location.delete({
      where: { title: data.title },
    });

    await this.logsService.add({
      type: 'SUPPRESSION',
      message: `L'utilisateur ${user.name} a supprimé un lieu. ID: ${location.id}`,
      userId: user.id,
    });

    return { message: 'Le lieu a été supprimé avec succès', location };
  }
}
