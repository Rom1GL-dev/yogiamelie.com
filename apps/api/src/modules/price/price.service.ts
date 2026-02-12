import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../shared/infrastructure/prisma.service';
import { CreateLogService } from '../logs/usecases/create-log/create-log.service';
import { AddPriceDto } from './dto/add-price.dto';
import { Session } from '../../types/session';
import { DeletePriceDto } from './dto/delete-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

@Injectable()
export class PriceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly createLogService: CreateLogService,
  ) {}

  getAll() {
    return this.prisma.price.findMany();
  }

  async add(data: AddPriceDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException('Demande non autorisee. Veuillez vous connecter.');
    }

    const price = await this.prisma.price.create({ data });

    await this.createLogService.execute({
      type: 'AJOUT',
      message: `L'utilisateur ${user.name} a ajoute un prix. ID: ${price.id}`,
      userId: user.id,
    });

    return { message: 'Le prix a ete ajoute avec succes', price };
  }

  async update(data: UpdatePriceDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException('Demande non autorisee. Veuillez vous connecter.');
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

    await this.createLogService.execute({
      type: 'MODIFICATION',
      message: `L'utilisateur ${user.name} a modifie un prix. ID: ${price.id}`,
      userId: user.id,
    });

    return { message: 'Le prix a ete modifie avec succes', price };
  }

  async delete(data: DeletePriceDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException('Demande non autorisee. Veuillez vous connecter.');
    }

    const price = await this.prisma.price.delete({ where: { id: data.id } });

    await this.createLogService.execute({
      type: 'SUPPRESSION',
      message: `L'utilisateur ${user.name} a supprime un prix. ID: ${price.id}`,
      userId: user.id,
    });

    return { message: 'Le prix a ete supprime avec succes', price };
  }
}
