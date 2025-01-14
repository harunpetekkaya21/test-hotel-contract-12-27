import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriceCalculationService {
  private convertToNumber(value: any): number {
    const num = parseFloat(value?.toString().replace(',', '.') ?? '0');
    return isNaN(num) ? 0 : num;
  }

  calculatePrice(currentPrice: number, multiplier: number): number {
   let price= this.convertToNumber(currentPrice);
    return parseFloat((price * multiplier).toFixed(2));
  }
}
