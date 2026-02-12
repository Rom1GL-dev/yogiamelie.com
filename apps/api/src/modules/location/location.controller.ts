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
import { AuthenticatedRequest } from '../../types/auth-request';
import { LocationService } from './location.service';
import { AddLocationDto } from './dto/add-location.dto';
import { DeleteLocationDto } from './dto/delete-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Controller(routesV1.version)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get(routesV1.location.root)
  async getAll() {
    const locations = await this.locationService.getAll();
    return { locations };
  }

  @UseGuards(AuthGuard)
  @Post(routesV1.location.root)
  async add(
    @Body() addLocation: AddLocationDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const location = await this.locationService.add(addLocation, request.session.user);
    return { location };
  }

  @UseGuards(AuthGuard)
  @Delete(routesV1.location.root)
  async delete(
    @Body() deleteLocationDto: DeleteLocationDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const location = await this.locationService.delete(deleteLocationDto, request.session.user);
    return { location };
  }

  @UseGuards(AuthGuard)
  @Put(routesV1.location.root)
  async update(
    @Body() updateLocationDto: UpdateLocationDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const location = await this.locationService.update(updateLocationDto, request.session.user);
    return { location };
  }
}
