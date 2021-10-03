// twitter?FB?or Line?
export interface SNS {
  post(text: string): Promise<void>;
}
