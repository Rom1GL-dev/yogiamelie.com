import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../shared/infrastructure/prisma.service';
import { hashPassword } from '../../shared/utils/hashPassword';
import { AddUserDto } from './dto/add-user.dto';
import { LogsService } from '../logs/logs.service';
import { Session } from '../../types/session';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logsService: LogsService,
  ) {}

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async add(data: AddUserDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException("L'utilisateur existe déjà");
    }

    const hashedPassword = await hashPassword(data.password);
    const newUser = await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        role: data.role,
      },
    });

    await this.logsService.add({
      type: 'AJOUT',
      message: `L'utilisateur ${data.name} a ajouté un utilisateur. Email: ${data.email}`,
      userId: user.id,
    });

    return { user: newUser };
  }

  async update(data: UpdateUserDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { id: data.id },
    });

    if (!existingUser) {
      throw new ConflictException("L'utilisateur n'existe pas");
    }

    const updateData: any = {
      email: data.email,
      name: data.name,
      role: data.role,
    };

    if (
      data.password &&
      !(await this.comparePasswords(data.password, existingUser.password))
    ) {
      updateData.password = await hashPassword(data.password);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: data.id },
      data: updateData,
    });

    await this.logsService.add({
      type: 'MODIFICATION',
      message: `L'utilisateur ${user.name} a modifié l'utilisateur. Email: ${data.email}`,
      userId: user.id,
    });

    return { user: updatedUser };
  }

  async delete(data: DeleteUserDto, user: Session['user']) {
    if (!user) {
      throw new UnauthorizedException(
        'Demande non autorisée. Veuillez vous connecter.',
      );
    }
    const event = await this.prisma.user.delete({
      where: {
        id: data.id,
      },
    });

    await this.logsService.add({
      type: 'SUPPRESSION',
      message: `L'utilisateur ${user.name} a supprimé un utilisateur.`,
      userId: user.id,
    });

    if (!event) {
      return { message: "L'utilisateur n'a pas pu être supprimé." };
    }
    return { message: "L'utilisateur a bien été supprimé." };
  }

  private comparePasswords(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
