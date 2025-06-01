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
import { EventsService } from './events.service';
import { AddEventDto } from './dto/add-event.dto';
import { DeleteEventDto } from './dto/remove-event.dto';
import { AuthenticatedRequest } from '../../types/auth-request';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller(routesV1.version)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get(routesV1.events.root)
  async getAllEvents() {
    const events = await this.eventsService.getAllEvents();
    return { events: events };
  }

  @UseGuards(AuthGuard)
  @Post(routesV1.events.root)
  async add(
    @Body() addEventDto: AddEventDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const events = await this.eventsService.add(
      addEventDto,
      request.session.user,
    );
    return { events: events };
  }

  @UseGuards(AuthGuard)
  @Delete(routesV1.events.root)
  async delete(
    @Body() deleteEventDto: DeleteEventDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const events = await this.eventsService.delete(
      deleteEventDto,
      request.session.user,
    );

    return { events: events };
  }

  @UseGuards(AuthGuard)
  @Put(routesV1.events.root)
  async update(
    @Body() updateEventDto: UpdateEventDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const data = await this.eventsService.update(
      updateEventDto,
      request.session.user,
    );

    return { data: data };
  }
}
