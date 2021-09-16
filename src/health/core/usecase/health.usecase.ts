import { Body, Tattletale } from '../domain';
import { SNS, HealthStore } from '../repositry';

import * as moment from 'moment-timezone';
import { v4 as uuid } from 'uuid';

export class HealthUsecase {
  private readonly healthStore: HealthStore;
  private readonly sns: SNS;

  constructor(store: HealthStore, sns: SNS) {
    this.healthStore = store;
    this.sns = sns;
  }

  recordHealth = (bfp: number, weight: number): Promise<void> => {
    const date = moment.tz('Asia/Tokyo');
    return this.healthStore
      .save(uuid(), new Body(weight, bfp), date.format(), date.format('dddd'))
      .then(() => this.healthStore.filterBy('Thursday', 5))
      .then((bodies: Body[]): Promise<string> => {
        return new Promise((resolve) => {
          const tattletale = new Tattletale();
          bodies.forEach((body) => tattletale.setWeights(body));
          resolve(tattletale.reportDiff(new Body(weight, bfp)));
          return 0;
        });
      })
      .then((reportTxt: string) => {
        this.sns.post(reportTxt);
      })
      .catch((err: Error) => {
        throw err;
      });
  };
}
