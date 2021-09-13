// おしゃべりやろう。twitterか？FBか？それともおかんにチクるのか？
export interface Chatter {
  publish(text: string): Promise<void>;
}
