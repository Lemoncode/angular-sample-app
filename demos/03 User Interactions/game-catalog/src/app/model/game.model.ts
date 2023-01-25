import { Seller } from './seller.model';

export class Game {
  name: string;
  dateRelease: Date;
  imageUrl?: string;
  sellers?: Seller[];

  constructor(
    name: string,
    dateRelease: string = '',
    imageUrl?: string,
    sellers?: Seller[]
  ) {
    this.name = name;
    this.dateRelease = new Date(dateRelease);
    this.imageUrl = imageUrl;
    this.sellers = sellers;
  }

  getYearsFromRelease(): number {
    const milliseconds = Date.now() - this.dateRelease.getTime();
    return this.convertToYears(new Date(milliseconds));
  }

  private convertToYears = (date: Date): number =>
    Math.abs(date.getUTCFullYear() - 1970);
}
