export class Body {
  private weight: number;
  private bfp: number;
  private date: string | undefined;

  constructor(weight: number, bfp: number) {
    this.weight = weight;
    this.bfp = bfp;
  }

  equlas = (health: Body): boolean => {
    return (
      health.bfp.toFixed(1) === this.bfp.toFixed(1) &&
      health.weight.toFixed(1) === this.weight.toFixed(1)
    );
  };

  setDate = (date: string) => {
    this.date = date;
  };

  minus = (minuend: Body): Body => {
    return new Body(this.weight - minuend.weight, this.bfp - minuend.bfp);
  };

  myWeight = (): number => {
    return this.weight;
  };

  myBfp = (): number => {
    return this.bfp;
  };

  myDate = (): string | undefined => {
    return this.date;
  };
}
