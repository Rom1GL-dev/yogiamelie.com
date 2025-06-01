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
import { AddSiteWebDetailDto } from './dto/create-section.dto';
import { SiteWebService } from './site-web.service';
import { UpdateSiteWebDetailDto } from './dto/update-section.dto';
import { AuthGuard } from '../auth/auth.guard';

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
  async add(@Body() AddSiteWebDetailDto: AddSiteWebDetailDto) {
    const siteWebDetail = await this.siteWebService.add(AddSiteWebDetailDto);

    return { siteWebDetail: siteWebDetail };
  }

  @UseGuards(AuthGuard)
  @Put(routesV1.siteWeb.root)
  async update(@Body() updateDto: UpdateSiteWebDetailDto) {
    const updated = await this.siteWebService.update(updateDto);
    return { updated };
  }
}
