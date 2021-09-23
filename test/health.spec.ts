/** todo
 * 前日の最終体重と体脂肪率を今回の計算結果と比較したい。
 * 基準になる曜日の最終データだけ抜き出したい。
 * 過去5週間の木曜日の最終体重をキューしていきたい
 * 過去7週間の木曜日の体重をいてらぶるに処理して当日体重とdiffをとって文言を作成したい
 * 5日間以上体重について報告していなかったら、警告してほしい(reportDitch)
 * datastore saveに例外処理を入れたい
 * datastore run queryに例外処理を入れたい
 * ログ処理を入れたい
 * ロールバックが機能しているかみたい
 * filterByの検索結果が0件だった時の処理をテストしたい
 * グラフ画像を添付してポストしたい
 */

import { HealthStore } from '../src/health/core/repositry';
import { HealthDatastore } from '../src/health/infra/helath.datastore';
import { Body, Tattletale } from '../src/health/core/domain';

describe('Body Domain', () => {
  beforeAll(async () => {
    try {
      const healthStore = new HealthDatastore();
      await healthStore.delete('3f29f0fa-c6cb-4731-9b9f-853c48866277');
      await healthStore.delete('fcca8746-1ae1-4632-8cb7-6713ce0a78ac');
      await healthStore.delete('69eae599-bba2-40f2-b14e-a45b05b57a71');
      await healthStore.delete('4243cc6a-e47b-4d3c-a169-54453df1012c');
    } catch (error) {
      console.error(error);
    }
  });
  it('test Body equality', () => {
    expect(new Body(1.0, -0.8).equlas(new Body(61.0, 17.0))).toBeFalsy();
  });

  it('test Body equality', () => {
    expect(new Body(1.0, -0.8).equlas(new Body(1.0, -0.8))).toBeTruthy();
  });

  it('test diff & return Subtraction Body Instance', () => {
    expect(
      new Body(-1, -0.8).equlas(
        new Body(60.0, 16.2).minus(new Body(61.0, 17.0)),
      ),
    ).toBeTruthy();
  });

  it('test diff text export', () => {
    const tattletale = new Tattletale();
    const previousBody = new Body(61.3, 16.7);
    previousBody.setDate('2021-09-02T21:46:09+09:00');
    tattletale.setWeights(previousBody);
    expect(tattletale.reportDiff(new Body(61.0, 16.4))).toBe(
      '61.0kg 16.4%\n09月02日:61.3kgから-0.3kg,16.7%から-0.3%',
    );
  });

  it('test diff text export if tattletale has multiple previous weights ', () => {
    const tattletale = new Tattletale();
    const previousBody1 = new Body(61.3, 16.7);
    previousBody1.setDate('2021-09-04T21:46:09+09:00');
    const previousBody2 = new Body(62.0, 17.5);
    previousBody2.setDate('2021-09-11T21:46:09+09:00');
    tattletale.setWeights(previousBody1);
    tattletale.setWeights(previousBody2);
    expect(tattletale.reportDiff(new Body(61.0, 16.4))).toBe(
      '61.0kg 16.4%\n09月04日:61.3kgから-0.3kg,16.7%から-0.3%\n09月11日:62.0kgから-1.0kg,17.5%から-1.1%',
    );
  });

  it('test diff text export if setWeights null', () => {
    const tattletale = new Tattletale();
    expect(tattletale.reportDiff(new Body(61.0, 16.4))).toBe('61.0kg 16.4%');
  });

  it('test datastore save', async () => {
    const healthStore: HealthStore = new HealthDatastore();
    try {
      await healthStore.save(
        '3f29f0fa-c6cb-4731-9b9f-853c48866277',
        new Body(61.0, 16.4),
        '2021-09-13T21:53:17+09:00',
        'Monday',
      );
      const health = await healthStore.filterBy('Monday', 1);
      expect(health[0].equlas(new Body(61.0, 16.4))).toBeTruthy();
    } catch (e) {
      console.error(e);
    }
  });

  it('test filter by order', () => {
    const healthStore: HealthStore = new HealthDatastore();

    healthStore
      .save(
        'fcca8746-1ae1-4632-8cb7-6713ce0a78ac',
        new Body(61.0, 16.8),
        '2021-09-10T21:53:17+09:00',
        'Sunday',
      )
      .then(() =>
        healthStore.save(
          '69eae599-bba2-40f2-b14e-a45b05b57a71',
          new Body(60.8, 16.0),
          '2021-09-03T21:53:17+09:00',
          'Sunday',
        ),
      )
      .then(() =>
        healthStore.save(
          '4243cc6a-e47b-4d3c-a169-54453df1012c',
          new Body(61.2, 17.2),
          '2021-09-19T21:53:17+09:00',
          'Sunday',
        ),
      )
      .then(() => healthStore.filterBy('Sunday', 3))
      .then((health) => {
        expect(health[0].equlas(new Body(61.2, 17.2))).toBeTruthy();
        expect(health[1].equlas(new Body(61.0, 16.8))).toBeTruthy();
        expect(health[2].equlas(new Body(60.8, 16.0))).toBeTruthy();
      })
      .catch((error) => console.error(error));
  });
});
