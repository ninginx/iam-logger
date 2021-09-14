import { Body, Tattletale } from '../domain';
import { Chatter, HealthStore } from '../repositry';

import * as moment from 'moment-timezone';

export class HealthUsecase {
  private readonly healthStore: HealthStore;
  private readonly chatter: Chatter;

  constructor(store: HealthStore, sns: Chatter) {
    this.healthStore = store;
    this.chatter = sns;
  }

  recordHealth = (bfp: number, weight: number): Promise<void> => {
    return this.healthStore
      .save(new Body(weight, bfp), moment.tz('Asia/Tokyo').format())
      .then(() => this.healthStore.findLastWeightsFor(5))
      .then((bodies: Body[]): Promise<string> => {
        return new Promise((resolve) => {
          const tattletale = new Tattletale();
          bodies.forEach((body) => tattletale.setWeights(body));
          resolve(tattletale.reportDiff(new Body(weight, bfp)));
          return 0;
        });
      })
      .then((reportTxt: string) => {
        this.chatter.publish(reportTxt);
      })
      .catch((err: Error) => {
        throw err;
      });
  };
}
