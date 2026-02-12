import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../shared/infrastructure/prisma.service';
import { Session } from '../../types/session';
import { AddEventDto } from './dto/add-event.dto';
import { DeleteEventDto } from './dto/remove-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CreateLogService } from '../logs/usecases/create-log/create-log.service';

@Injectable()
export class EventsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly createLogService: CreateLogService,
  ) {}

  async getAllEvents() {
    return this.prisma.event.findMany();
  }

  async add(data: AddEventDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException('Demande non autorisee. Veuillez vous connecter.');
    }

    const event = await this.prisma.event.create({ data });

    await this.createLogService.execute({
      type: 'AJOUT',
      message: `L'utilisateur ${user.name} a ajoute un evenement. ID: ${event.id}`,
      userId: user.id,
    });

    return { message: 'Le nouvel evenement a ete ajoute.' };
  }

  async delete(data: DeleteEventDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException('Demande non autorisee. Veuillez vous connecter.');
    }

    const event = await this.prisma.event.delete({ where: { id: data.id } });

    await this.createLogService.execute({
      type: 'SUPPRESSION',
      message: `L'utilisateur ${user.name} a supprime un evenement.`,
      userId: user.id,
    });

    if (!event) {
      return { message: "L'evenement n'a pas pu etre supprime." };
    }
    return { message: "L'evenement a bien ete supprime." };
  }

  async update(data: UpdateEventDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException('Demande non autorisee. Veuillez vous connecter.');
    }

    const event = await this.prisma.event.update({ where: { id: data.id }, data });

    await this.createLogService.execute({
      type: 'MODIFICATION',
      message: `L'utilisateur ${user.name} a modifie un evenement. ID: ${event.id}`,
      userId: user.id,
    });

    if (!event) {
      return { message: "L'evenement n'a pas pu etre modifie." };
    }
    return { message: "L'evenement a bien ete modifie." };
  }
}
