import { Module } from '@nestjs/common';
import { CompositionsService } from './compositions.service';
import { CompositionsController } from './compositions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Composition } from './entities/composition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Composition])],
  controllers: [CompositionsController],
  providers: [CompositionsService],
})
export class CompositionsModule {}
