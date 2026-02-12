import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../config/app.routes';
import { AuthGuard } from '../../shared/applications/guards/auth.guard';
import { LinksService } from './links.service';
import { AddLinkDto } from './dto/add-link.dto';
import { AuthenticatedRequest } from '../../types/auth-request';

@Controller(routesV1.version)
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Get(routesV1.links.root)
  async getAllLinks() {
    const links = await this.linksService.getAllLinks();
    return { links };
  }

  @UseGuards(AuthGuard)
  @Post(routesV1.links.root)
  async updateOrInsert(
    @Body() addLinkDto: AddLinkDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const links = await this.linksService.updateOrInsert(addLinkDto, request.session.user);
    return { links };
  }
}
