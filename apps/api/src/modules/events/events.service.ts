import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../shared/infrastructure/prisma.service';
import { Session } from '../../types/session';
import { AddEventDto } from './dto/add-event.dto';
import { DeleteEventDto } from './dto/remove-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { LogsService } from '../logs/logs.service';

@Injectable()
export class EventsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logsService: LogsService,
  ) {}

  async getAllEvents() {
    return this.prisma.event.findMany();
  }

  async add(data: AddEventDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const event = await this.prisma.event.create({
      data,
    });

    await this.logsService.add({
      type: 'AJOUT',
      message: `L'utilisateur ${user.name} a ajouté un évènement. ID: ${event.id}`,
      userId: user.id,
    });

    return { message: 'Le nouvel évènement a été ajouté.' };
  }

  async delete(data: DeleteEventDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }
    const event = await this.prisma.event.delete({
      where: {
        id: data.id,
      },
    });

    await this.logsService.add({
      type: 'SUPPRESSION',
      message: `L'utilisateur ${user.name} a supprimé un évènement.`,
      userId: user.id,
    });

    if (!event) {
      return { message: "L'évènement n'a pas pu être supprimé." };
    }
    return { message: "L'évènement a bien été supprimé." };
  }

  async update(data: UpdateEventDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }
    const event = await this.prisma.event.update({
      where: {
        id: data.id,
      },
      data,
    });

    await this.logsService.add({
      type: 'MODIFICATION',
      message: `L'utilisateur ${user.name} a modifié un évènement. ID: ${event.id}`,
      userId: user.id,
    });

    if (!event) {
      return { message: "L'évènement n'a pas pu être modifié." };
    }
    return { message: "L'évènement a bien été modifié." };
  }
}
