import { Controller, Post, Body, Param } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // Initialize tables
  @Post('initialize')
  initializeTables(@Body('tableCount') tableCount: number) {
    return this.reservationService.initializeTables(tableCount);
  }

  // Reserve tables
  @Post('reserve')
  reserveTables(@Body('customerCount') customerCount: number) {
    return this.reservationService.reserveTables(customerCount);
  }

  // Cancel a reservation
  @Post('cancel/:bookingId')
  cancelReservation(@Param('bookingId') bookingId: string) {
    return this.reservationService.cancelReservation(bookingId);
  }
}
