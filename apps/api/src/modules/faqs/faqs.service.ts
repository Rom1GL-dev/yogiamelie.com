import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../shared/infrastructure/prisma.service';
import { Session } from '../../types/session';
import { AddFaqDto } from './dto/add-faq.dto';
import { DeleteFaqDto } from './dto/remove-faq.dto';
import { CreateLogService } from '../logs/usecases/create-log/create-log.service';
import { UpdateFaqDto } from './dto/update-faq.dto';

@Injectable()
export class FaqsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly createLogService: CreateLogService,
  ) {}

  async getAllFaqs() {
    return this.prisma.faq.findMany();
  }

  async add(data: AddFaqDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const faq = await this.prisma.faq.create({ data });

    await this.createLogService.execute({
      type: 'AJOUT',
      message: `L'utilisateur ${user.name} a ajouté une FAQ. ID: ${faq.id}`,
      userId: user.id,
    });

    return { message: 'La nouvelle FAQ a été ajoutée.' };
  }

  async delete(data: DeleteFaqDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    await this.prisma.faq.delete({ where: { id: data.id } });

    await this.createLogService.execute({
      type: 'SUPPRESSION',
      message: `L'utilisateur ${user.name} a supprimé une FAQ.`,
      userId: user.id,
    });

    return { message: 'La FAQ a bien été supprimée.' };
  }

  async update(data: UpdateFaqDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const faq = await this.prisma.faq.update({
      where: { id: data.id },
      data,
    });

    await this.createLogService.execute({
      type: 'MODIFICATION',
      message: `L'utilisateur ${user.name} a modifié une FAQ. ID: ${faq.id}`,
      userId: user.id,
    });

    return { message: 'La FAQ a bien été modifiée.' };
  }
}
