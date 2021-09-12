import { Body } from './';

type reportType =
  `9月2日:${string}kgから${string}kg,${string}%から${string}% ${string}`;

export class Tattletale {
  private bodies: Body[] | undefined;
  setWeights = (bodies: Body[]): void => {
    1 + 1;
  };

  report = (todaysBody: Body): reportType => {
    const previousBody = new Body(61.3, 16.7);
    const diff = todaysBody.minus(previousBody);
    return `9月2日:${previousBody.myWeight().toFixed(1)}kgから${diff
      .myWeight()
      .toFixed(1)}kg,${previousBody.myBfp().toFixed(1)}%から${diff
      .myBfp()
      .toFixed(1)}% ${todaysBody.myWeight().toFixed(1)}kg ${todaysBody
      .myBfp()
      .toFixed(1)}%`;
  };
}
