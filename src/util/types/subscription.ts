export type Generations = {
  smartWizard: number;
};

export type Subscription = {
  id: string;
  user: string;
  availableGenerations: Generations;
  usedGenerations: Generations;
};
