import { Body } from '../core/domain';
import { HealthStore, dayOfWeek } from '../core/repositry';

import { Datastore } from '@google-cloud/datastore';
import { Logger } from '@nestjs/common';

export class HealthDatastore implements HealthStore {
  private datastore = new Datastore();

  save = async (
    uuid: string,
    body: Body,
    created: string,
    dayOfTheWeek: string,
  ): Promise<void> => {
    const kind = 'Health';
    const healthKey = this.datastore.key([kind, uuid]);

    const health = {
      key: healthKey,
      data: {
        weight: body.myWeight(),
        bfp: body.myBfp(),
        created: created,
        dayofweek: dayOfTheWeek,
      },
    };

    const transaction = this.datastore.transaction();

    try {
      await transaction.run();
      await transaction.save(health);
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
    //new Logger(`${health.key.id}`);
    return;
  };

  delete = async (uuid: string): Promise<void> => {
    const transaction = this.datastore.transaction();
    try {
      await transaction.delete(this.datastore.key(['Health', uuid]));
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  };

  filterBy = async (
    dayOfTheWeek: dayOfWeek,
    limit: number,
  ): Promise<Body[]> => {
    const query = this.datastore
      .createQuery('Health')
      .filter('dayofweek', dayOfTheWeek)
      .order('created', { descending: true })
      .limit(limit);
    const [healths] = await this.datastore.runQuery(query);
    // todo: healthsに型チェックを入れたい
    const bodies: Body[] = healths.map(
      (health) => new Body(health.weight, health.bfp),
    );
    return new Promise((resolve) => resolve(bodies));
  };
}
