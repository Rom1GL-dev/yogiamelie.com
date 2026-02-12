import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { routesV1 } from '../../config/app.routes';
import { AuthGuard } from '../../shared/applications/guards/auth.guard';
import { FaqsService } from './faqs.service';
import { AddFaqDto } from './dto/add-faq.dto';
import { DeleteFaqDto } from './dto/remove-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { AuthenticatedRequest } from '../../types/auth-request';

@Controller(routesV1.version)
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @Get(routesV1.faqs.root)
  async getAllFaqs() {
    const faqs = await this.faqsService.getAllFaqs();
    return { faqs };
  }

  @UseGuards(AuthGuard)
  @Post(routesV1.faqs.root)
  async add(
    @Body() addFaqDto: AddFaqDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.faqsService.add(addFaqDto, request.session.user);
  }

  @UseGuards(AuthGuard)
  @Delete(routesV1.faqs.root)
  async delete(
    @Body() deleteFaqDto: DeleteFaqDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.faqsService.delete(deleteFaqDto, request.session.user);
  }

  @UseGuards(AuthGuard)
  @Put(routesV1.faqs.root)
  async update(
    @Body() updateFaqDto: UpdateFaqDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.faqsService.update(updateFaqDto, request.session.user);
  }
}
