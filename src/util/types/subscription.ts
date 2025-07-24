export type Generations = {
  postWizard: number;
};

export type Subscription = {
  id: string;
  user: string;
  availableGenerations: Generations;
};
