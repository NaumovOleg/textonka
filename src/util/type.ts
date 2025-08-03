export * from './types';

export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type Prompt = { role: 'user' | 'system'; content: string | object }[];
