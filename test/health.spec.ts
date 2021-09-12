/** todo
 * 前日の最終体重と体脂肪率を今回の計算結果と比較したい。
 * 過去7週間の木曜日の体重と比較する
 * 一個前の体重、体脂肪率と減算して比較結果を返す
 */
import { Body, Tattletale } from '../src/health/core/domain';

describe('Body Domain', () => {
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
    const bodies: Body[] = [];
    bodies.push(new Body(61.3, 16.7));
    tattletale.setWeights(bodies);
    expect(tattletale.report(new Body(61.0, 16.4))).toBe(
      '9月2日:61.3kgから-0.3kg,16.7%から-0.3% 61.0kg 16.4%',
    );
  });
});
