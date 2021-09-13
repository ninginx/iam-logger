import { Body } from './body';
import * as moment from 'moment-timezone';

// type reportDiffType =
//   `${string}:${string}kgから${string}kg,${string}%から${string}% ${string}`;

export class Tattletale {
  private previousBodies = new Array<Body>(5);

  setWeights = (previousBody: Body): void => {
    this.previousBodies.push(previousBody);
  };

  reportDiff = (todaysBody: Body): string => {
    return this.previousBodies.reduce(
      (buildReport: string, pastBody: Body): string => {
        return `${buildReport + '\n'}${moment
          .tz(pastBody.myDate(), 'Asia/Tokyo')
          .format('MM月DD日')}:${pastBody
          .myWeight()
          .toFixed(1)}kgから${todaysBody
          .minus(pastBody)
          .myWeight()
          .toFixed(1)}kg,${pastBody.myBfp().toFixed(1)}%から${todaysBody
          .minus(pastBody)
          .myBfp()
          .toFixed(1)}%`;
      },
      `${todaysBody.myWeight().toFixed(1)}kg ${todaysBody.myBfp().toFixed(1)}%`,
    );
  };
}
