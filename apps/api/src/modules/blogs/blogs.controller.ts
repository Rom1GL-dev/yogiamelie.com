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
import { BlogsService } from './blogs.service';
import { AddBlogDto } from './dto/add-blog.dto';
import { DeleteBlogDto } from './dto/remove-blog.dto';
import { AuthenticatedRequest } from '../../types/auth-request';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller(routesV1.version)
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get(routesV1.blogs.root)
  async getAllBlogs() {
    const blogs = await this.blogsService.getAllBlogs();
    return { blogs: blogs };
  }

  @UseGuards(AuthGuard)
  @Post(routesV1.blogs.root)
  async add(
    @Body() addBlogDto: AddBlogDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const blogs = await this.blogsService.add(addBlogDto, request.session.user);
    return { blogs: blogs };
  }

  @UseGuards(AuthGuard)
  @Delete(routesV1.blogs.root)
  async delete(
    @Body() deleteBlogDto: DeleteBlogDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const blogs = await this.blogsService.delete(
      deleteBlogDto,
      request.session.user,
    );

    return { blogs: blogs };
  }

  @UseGuards(AuthGuard)
  @Put(routesV1.blogs.root)
  async update(
    @Body() updateEventDto: UpdateBlogDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const blogs = await this.blogsService.update(
      updateEventDto,
      request.session.user,
    );

    return { blogs: blogs };
  }
}
