export class Body {
  private weight: number;
  private bfp: number;

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

  minus = (minuend: Body): Body => {
    return new Body(this.weight - minuend.weight, this.bfp - minuend.bfp);
  };

  myWeight = (): number => {
    return this.weight;
  };

  myBfp = (): number => {
    return this.bfp;
  };
}
