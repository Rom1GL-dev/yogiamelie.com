import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { routesV1 } from '../../config/app.routes';
import { AuthGuard } from '../auth/auth.guard';
import { AuthenticatedRequest } from '../../types/auth-request';
import { LocationService } from './location.service';
import { AddLocationDto } from './dto/add-location.dto';
import { DeleteLocationDto } from './dto/delete-location.dto';

@Controller(routesV1.version)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @UseGuards(AuthGuard)
  @Get(routesV1.location.root)
  async getAll() {
    const locations = await this.locationService.getAll();
    return { locations: locations };
  }

  @UseGuards(AuthGuard)
  @Post(routesV1.location.root)
  async add(
    @Body() addLocation: AddLocationDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const location = await this.locationService.add(
      addLocation,
      request.session.user,
    );

    return { location: location };
  }

  @UseGuards(AuthGuard)
  @Delete(routesV1.location.root)
  async delete(
    @Body() deleteLocationDto: DeleteLocationDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const location = await this.locationService.delete(
      deleteLocationDto,
      request.session.user,
    );

    return { location: location };
  }
}
