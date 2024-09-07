import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';

describe('ReservationService', () => {
  let service: ReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationService],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
  });

  it('should initialize tables correctly', () => {
    expect(service.initializeTables(10)).toBe('Tables initialized successfully');
  });

  it('should throw error when reinitializing tables', () => {
    service.initializeTables(10);
    expect(() => service.initializeTables(10)).toThrow('Tables have already been initialized.');
  });

  it('should reserve tables for a group of customers', () => {
    service.initializeTables(10);
    const result = service.reserveTables(6);
    expect(result.reservedTables).toBe(2);
    expect(result.remainingTables).toBe(8);
  });

  it('should throw error if not enough tables available', () => {
    service.initializeTables(2);
    expect(() => service.reserveTables(10)).toThrow('Not enough tables available for the reservation.');
  });

  it('should cancel reservation correctly', () => {
    service.initializeTables(10);
    const { bookingId } = service.reserveTables(6);
    const result = service.cancelReservation(bookingId);
    expect(result.freedTables).toBe(2);
    expect(result.remainingTables).toBe(10);
  });

  it('should throw error for invalid booking ID', () => {
    service.initializeTables(10);
    expect(() => service.cancelReservation('invalidId')).toThrow('Booking ID not found.');
  });
});
