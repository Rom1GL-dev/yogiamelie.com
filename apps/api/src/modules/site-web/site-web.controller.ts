import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { routesV1 } from '../../config/app.routes';
import { AuthGuard } from '../../shared/applications/guards/auth.guard';
import { SiteWebService } from './site-web.service';
import { AddSiteWebDetailDto } from './dto/create-section.dto';
import { UpdateSiteWebDetailDto } from './dto/update-section.dto';
import { BulkUpsertSectionDto } from './dto/bulk-upsert-section.dto';

@Controller(routesV1.version)
export class SiteWebController {
  constructor(private readonly siteWebService: SiteWebService) {}

  @Get(routesV1.siteWeb.bySection)
  async getAllBySection(@Param('section') section: string) {
    const details = await this.siteWebService.getAllBySection(section);
    return { section, details };
  }

  @UseGuards(AuthGuard)
  @Post(routesV1.siteWeb.root)
  async add(@Body() addSiteWebDetailDto: AddSiteWebDetailDto) {
    const siteWebDetail = await this.siteWebService.add(addSiteWebDetailDto);
    return { siteWebDetail };
  }

  @UseGuards(AuthGuard)
  @Put(routesV1.siteWeb.root)
  async bulkUpsert(@Body() dto: BulkUpsertSectionDto) {
    return this.siteWebService.bulkUpsert(dto);
  }
}
