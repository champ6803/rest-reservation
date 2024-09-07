import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ReservationService {
  private tables: number[] = [];
  private initialized = false;
  private reservations: Map<string, number[]> = new Map();

  // Initialize tables (can only be called once)
  initializeTables(tableCount: number): string {
    if (this.initialized) {
      throw new BadRequestException('Tables have already been initialized.');
    }
    this.tables = Array(tableCount).fill(null);
    this.initialized = true;
    return 'Tables initialized successfully';
  }

  // Reserve tables for a group of customers
  reserveTables(customerCount: number): { bookingId: string, reservedTables: number, remainingTables: number } {
    if (!this.initialized) {
      throw new BadRequestException('Tables must be initialized first.');
    }

    const requiredTables = Math.ceil(customerCount / 4);
    const availableTables = this.tables.filter(t => t === null).length;

    if (availableTables < requiredTables) {
      throw new BadRequestException('Not enough tables available for the reservation.');
    }

    // generate uniq id
    const bookingId = this.generateBookingId();
    // count reverved table
    const reservedTableIndexes: number[] = [];
    let customerRemaining: number = customerCount;

    for (let i = 0; i < this.tables.length && reservedTableIndexes.length < requiredTables; i++) {
      // check available tables
      if (this.tables[i] === null) {
        // count people sitting at reserved table
        let restCount = customerRemaining > 4 ? 4 : customerRemaining;
        this.tables[i] = restCount;  // Reserve table
        reservedTableIndexes.push(i);
        // remove seated customers
        customerRemaining = customerRemaining - 4;
      }
    }
    this.reservations.set(bookingId, reservedTableIndexes);
    return {
      bookingId,
      reservedTables: reservedTableIndexes.length,
      remainingTables: this.tables.filter(t => t === null).length,
    };
  }

  // Cancel a reservation
  cancelReservation(bookingId: string): { freedTables: number, remainingTables: number } {
    if (!this.initialized) {
      throw new BadRequestException('Tables must be initialized first.');
    }

    // get indexes of reservation
    const reservedTableIndexes = this.reservations.get(bookingId);

    if (!reservedTableIndexes) {
      throw new BadRequestException('Booking ID not found.');
    }

    // loop freed tables
    reservedTableIndexes.forEach(index => {
      this.tables[index] = null;  // Free the table
    });

    this.reservations.delete(bookingId);

    return {
      freedTables: reservedTableIndexes.length,
      remainingTables: this.tables.filter(t => t === null).length,
    };
  }

  // Generate a unique Booking ID
  private generateBookingId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
