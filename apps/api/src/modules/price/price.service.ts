import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../shared/infrastructure/prisma.service';
import { LogsService } from '../logs/logs.service';
import { AddPriceDto } from './dto/add-price.dto';
import { Session } from '../../types/session';
import { DeletePriceDto } from './dto/delete-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

@Injectable()
export class PriceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logsService: LogsService,
  ) {}

  getAll() {
    return this.prisma.price.findMany();
  }

  async add(data: AddPriceDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const price = await this.prisma.price.create({
      data,
    });

    await this.logsService.add({
      type: 'AJOUT',
      message: `L'utilisateur ${user.name} a ajouté un prix. ID: ${price.id}`,
      userId: user.id,
    });

    return { message: 'Le prix a été ajouté avec succès', price };
  }

  async update(data: UpdatePriceDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const price = await this.prisma.price.update({
      where: { id: data.id },
      data: {
        label: data.label,
        number: data.number,
        extra: data.extra ?? '',
        price: data.price,
        info: data.info ?? '',
      },
    });

    await this.logsService.add({
      type: 'MODIFICATION',
      message: `L'utilisateur ${user.name} a modifié un prix. ID: ${price.id}`,
      userId: user.id,
    });

    return { message: 'Le prix a été modifié avec succès', price };
  }

  async delete(data: DeletePriceDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const location = await this.prisma.price.delete({
      where: { id: data.id },
    });

    await this.logsService.add({
      type: 'SUPPRESSION',
      message: `L'utilisateur ${user.name} a supprimé un prix. ID: ${location.id}`,
      userId: user.id,
    });

    return { message: 'Le prix a été supprimé avec succès', location };
  }
}
