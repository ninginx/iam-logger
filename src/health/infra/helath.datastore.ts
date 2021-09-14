import { Body } from '../core/domain';

import { Datastore } from '@google-cloud/datastore';

export class HealthDatastore {
  private datastore = new Datastore()
  save = async (body: Body, created: string): Promise<void> => {
    return;
  };
  findLastWeightsFor = (weeks : number): Promise<Body[]>  => {
    return new Promise((resolve)=>resolve([new Body(61.0, 16.4)]))
  }
}
