import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../shared/infrastructure/prisma.service';
import { CreateLogService } from '../logs/usecases/create-log/create-log.service';
import { AddLocationDto } from './dto/add-location.dto';
import { Session } from '../../types/session';
import { DeleteLocationDto } from './dto/delete-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly createLogService: CreateLogService,
  ) {}

  getAll() {
    return this.prisma.location.findMany();
  }

  async add(data: AddLocationDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException('Demande non autorisee. Veuillez vous connecter.');
    }

    const location = await this.prisma.location.create({ data });

    await this.createLogService.execute({
      type: 'AJOUT',
      message: `L'utilisateur ${user.name} a ajoute un lieu. ID: ${location.id}`,
      userId: user.id,
    });

    return { message: 'Le lieu a ete ajoute avec succes', location };
  }

  async update(data: UpdateLocationDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException('Demande non autorisee. Veuillez vous connecter.');
    }

    const location = await this.prisma.location.update({
      where: { id: data.id },
      data: {
        title: data.title,
        subtitle: data.subtitle,
        lieu: data.lieu ?? '',
        parking: data.parking ?? '',
        planning: data.planning ?? '',
        image: data.image,
        published: data.published,
        buttonText: data.buttonText ?? '',
        buttonLink: data.buttonLink ?? '',
      },
    });

    await this.createLogService.execute({
      type: 'MODIFICATION',
      message: `L'utilisateur ${user.name} a modifie un lieu. ID: ${location.id}`,
      userId: user.id,
    });

    return { message: 'Le lieu a ete modifie avec succes', location };
  }

  async delete(data: DeleteLocationDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException('Demande non autorisee. Veuillez vous connecter.');
    }

    const location = await this.prisma.location.delete({ where: { id: data.id } });

    await this.createLogService.execute({
      type: 'SUPPRESSION',
      message: `L'utilisateur ${user.name} a supprime un lieu. ID: ${location.id}`,
      userId: user.id,
    });

    return { message: 'Le lieu a ete supprime avec succes', location };
  }
}
