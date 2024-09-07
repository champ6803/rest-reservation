import { Module } from '@nestjs/common';
import { ReservationService } from './reservation/reservation.service';
import { ReservationController } from './reservation/reservation.controller';

@Module({
  imports: [],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class AppModule {}
