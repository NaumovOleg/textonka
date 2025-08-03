export enum SMART_SUBSCRIPTION_BUTTONS {
  smart_15 = 'smart_15',
  smart_50 = 'smart_50',
  smart_120 = 'smart_120',
}

export enum QUICK_SUBSCRIPTION_BUTTONS {
  quick_30 = 'quick_30',
  quick_50 = 'quick_50',
  quick_100 = 'quick_100',
}

export type PAYMENT_PAYLOAD = {
  user: string;
  product: SMART_SUBSCRIPTION_BUTTONS | QUICK_SUBSCRIPTION_BUTTONS;
  invoice: string;
};

export enum GENERATIONS_TYPES {
  smartWizard = 'smartWizard',
  quickWizard = 'quickWizard',
}

export type Generations = {
  smartWizard: number;
  quickWizard: number;
};

export type Subscription = {
  id: string;
  user: string;
  availableGenerations: Generations;
  usedGenerations: Generations;
};
