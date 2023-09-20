import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CompositionsService } from './compositions.service';
import { CreateCompositionDto } from './dto/create-composition.dto';
import { UpdateCompositionDto } from './dto/update-composition.dto';
import { Jwt } from 'src/jwt/jwt.decorator';
import { AccessToken } from 'src/utility/types';

@Controller('api/compositions')
export class CompositionsController {
  constructor(private readonly compositionsService: CompositionsService) {}

  @Get()
  async findAll(@Query('page', ParseIntPipe) page: number) {
    const compositions = await this.compositionsService.findAll(page);
    return compositions;
  }

  @Get('hints')
  async getHints() {
    return await this.compositionsService.getHints();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Jwt() token: AccessToken,
  ) {
    const composition = await this.compositionsService.findOne(id, token?.id);
    return composition;
  }
}
