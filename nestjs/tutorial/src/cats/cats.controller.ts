import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCat() {
    return 'all cat';
  }

  @Get(':id')
  getOneCat() {
    return 'one cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }

  @Patch(':id')
  updatePartialCat() {
    return 'partial cat';
  }

  @Delete(':id')
  deleteCat() {
    return 'delete cat';
  }
}
