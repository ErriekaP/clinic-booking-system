// prisma.module.ts
import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaClient} from '@prisma/client';

@Global()
@Module({
  providers: [PrismaService, PrismaClient],
  exports: [PrismaService],
})
export class PrismaModule {}

