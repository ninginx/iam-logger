// RDBMSか、流行るのKVSか？それともローカルのCSVか？
import { Body } from '../domain';

export interface HealthStore {
  save(body: Body, created: string): Promise<void>;
  findLastWeightsFor(weeks: number): Promise<Body[]>;
}
