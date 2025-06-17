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
import { AuthGuard } from '../auth/auth.guard';
import { AuthenticatedRequest } from '../../types/auth-request';
import { PriceService } from './price.service';
import { AddPriceDto } from './dto/add-price.dto';
import { DeletePriceDto } from './dto/delete-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

@Controller(routesV1.version)
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get(routesV1.price.root)
  async getAll() {
    const prices = await this.priceService.getAll();
    return { prices: prices };
  }

  @UseGuards(AuthGuard)
  @Post(routesV1.price.root)
  async add(
    @Body() addPriceDto: AddPriceDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const price = await this.priceService.add(
      addPriceDto,
      request.session.user,
    );

    return { price: price };
  }

  @UseGuards(AuthGuard)
  @Delete(routesV1.price.root)
  async delete(
    @Body() deletePriceDto: DeletePriceDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const price = await this.priceService.delete(
      deletePriceDto,
      request.session.user,
    );

    return { price: price };
  }

  @UseGuards(AuthGuard)
  @Put(routesV1.price.root)
  async update(
    @Body() updatePriceDto: UpdatePriceDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const price = await this.priceService.update(
      updatePriceDto,
      request.session.user,
    );

    return { price: price };
  }
}
