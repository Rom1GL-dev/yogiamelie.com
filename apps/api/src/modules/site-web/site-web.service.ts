import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/infrastructure/prisma.service';
import { AddSiteWebDetailDto } from './dto/create-section.dto';
import { UpdateSiteWebDetailDto } from './dto/update-section.dto';
import { SiteWebDetail } from './types/site-web.type';

@Injectable()
export class SiteWebService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllBySection(section: string): Promise<Record<string, any>> {
    const details = await this.prisma.siteWebDetail.findMany({
      where: { section },
    });

    const mappedDetails = details.reduce(
      (acc, item) => {
        acc[item.contentType] = item.value;
        return acc;
      },
      {} as Record<string, any>,
    );

    return mappedDetails;
  }

  async add(data: AddSiteWebDetailDto) {
    await this.prisma.siteWebDetail.create({
      data: {
        section: data.section,
        contentType: data.contentType,
        value: data.value,
        extra: data.extra || null,
      },
    });

    return { message: 'Le détail du site web a été ajouté.' };
  }

  async update(data: UpdateSiteWebDetailDto): Promise<SiteWebDetail> {
    const updatedDetail = await this.prisma.siteWebDetail.update({
      where: { id: data.id },
      data: {
        section: data.section,
        contentType: data.contentType,
        value: data.value,
        extra: data.extra !== undefined ? data.extra : undefined,
      },
    });

    return updatedDetail;
  }
}
