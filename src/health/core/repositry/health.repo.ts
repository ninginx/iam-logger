// RDBMSか、流行るのKVSか？それともローカルのCSVか？
import { Body } from '../domain';

export type dayOfWeek =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

export interface HealthStore {
  save(
    uuid: string,
    body: Body,
    created: string,
    dayOfTheWeek: string,
  ): Promise<void>;
  filterBy(dayOfWeek: dayOfWeek, limit: number): Promise<Body[]>;
  delete(uuid: string): Promise<void>;
}
