export class Game {
  name: string;
  dateRelease: Date;
  imageUrl?: string;

  constructor(name: string, dateRelease: string = "", imageUrl? : string) {
    this.name = name;
    this.dateRelease = new Date(dateRelease);
    this.imageUrl = imageUrl;
  }

  getYearsFromRelease(): number {
    const milliseconds = Date.now() - this.dateRelease.getTime();
    return this.convertToYears(new Date(milliseconds));
  }

  private convertToYears = (date: Date): number =>
    Math.abs(date.getUTCFullYear() - 1970);
}
