import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/infrastructure/prisma.service';
import { AddSiteWebDetailDto } from './dto/create-section.dto';
import { UpdateSiteWebDetailDto } from './dto/update-section.dto';
import { BulkUpsertSectionDto } from './dto/bulk-upsert-section.dto';
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
    const existing = await this.prisma.siteWebDetail.findFirst({
      where: { section: data.section, contentType: data.contentType },
    });

    if (existing) {
      await this.prisma.siteWebDetail.update({
        where: { id: existing.id },
        data: { value: data.value, extra: data.extra || null },
      });
    } else {
      await this.prisma.siteWebDetail.create({
        data: {
          section: data.section,
          contentType: data.contentType,
          value: data.value,
          extra: data.extra || null,
        },
      });
    }

    return { message: 'Le detail du site web a ete mis a jour.' };
  }

  async bulkUpsert(data: BulkUpsertSectionDto) {
    for (const entry of data.entries) {
      const existing = await this.prisma.siteWebDetail.findFirst({
        where: { section: data.section, contentType: entry.contentType },
      });

      if (existing) {
        await this.prisma.siteWebDetail.update({
          where: { id: existing.id },
          data: { value: entry.value, extra: entry.extra || null },
        });
      } else {
        await this.prisma.siteWebDetail.create({
          data: {
            section: data.section,
            contentType: entry.contentType,
            value: entry.value,
            extra: entry.extra || null,
          },
        });
      }
    }

    return { message: 'Section mise a jour.' };
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
