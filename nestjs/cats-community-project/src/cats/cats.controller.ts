import { CurrentUser } from './../common/decorators/user.decorator';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatDto } from './dto/cats.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { LoginResponseDto } from 'src/auth/dto/login.response.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(
    private readonly service: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat: LoginResponseDto) {
    return cat;
  }

  @ApiResponse({
    status: 200,
    description: 'Success',
    type: CatDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error',
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() catDto: CatDto) {
    return await this.service.signUp(catDto);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  async logIn(@Body() dto: LoginRequestDto) {
    return this.authService.jwtLogin(dto);
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  async logOut() {
    return 'log out';
  }

  @ApiOperation({ summary: '이미지 업로드' })
  @Post('upload/cats')
  uploadCatImg() {
    return 'upload image';
  }
}
