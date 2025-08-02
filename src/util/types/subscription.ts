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

export const SMART_GENERATIONS = {
  [SMART_SUBSCRIPTION_BUTTONS.smart_15]: {
    id: SMART_SUBSCRIPTION_BUTTONS.smart_15,
    count: 15,
    price: 5000,
    type: GENERATIONS_TYPES.smartWizard,
    titleT: 'subscription.products.smart.title',
    descriptionT: 'subscription.products.smart.description',
    command: SMART_SUBSCRIPTION_BUTTONS.smart_15,
    currency: 'UAH',
    name: 'Smart',
  },
  [SMART_SUBSCRIPTION_BUTTONS.smart_50]: {
    id: SMART_SUBSCRIPTION_BUTTONS.smart_50,
    count: 50,
    price: 10000,
    type: GENERATIONS_TYPES.smartWizard,
    titleT: 'subscription.products.smart.title',
    descriptionT: 'subscription.products.smart.description',
    command: SMART_SUBSCRIPTION_BUTTONS.smart_50,
    currency: 'UAH',
    name: 'Smart',
  },
  [SMART_SUBSCRIPTION_BUTTONS.smart_120]: {
    id: SMART_SUBSCRIPTION_BUTTONS.smart_120,
    count: 120,
    price: 18000,
    type: GENERATIONS_TYPES.smartWizard,
    titleT: 'subscription.products.smart.title',
    descriptionT: 'subscription.products.smart.description',
    command: SMART_SUBSCRIPTION_BUTTONS.smart_120,
    currency: 'UAH',
    name: 'Smart',
  },
};

export const QUICK_GENERATIONS = {
  [QUICK_SUBSCRIPTION_BUTTONS.quick_30]: {
    id: QUICK_SUBSCRIPTION_BUTTONS.quick_30,
    count: 30,
    price: 3000,
    type: GENERATIONS_TYPES.quickWizard,
    titleT: 'subscription.products.smart.title',
    descriptionT: 'subscription.products.smart.description',
    command: QUICK_SUBSCRIPTION_BUTTONS.quick_30,
    currency: 'UAH',
    name: 'Quick',
  },
  [QUICK_SUBSCRIPTION_BUTTONS.quick_50]: {
    id: QUICK_SUBSCRIPTION_BUTTONS.quick_50,
    count: 50,
    price: 45000,
    type: GENERATIONS_TYPES.quickWizard,
    titleT: 'subscription.products.smart.title',
    descriptionT: 'subscription.products.smart.description',
    command: QUICK_SUBSCRIPTION_BUTTONS.quick_50,
    currency: 'UAH',
    name: 'Quick',
  },
  [QUICK_SUBSCRIPTION_BUTTONS.quick_100]: {
    id: QUICK_SUBSCRIPTION_BUTTONS.quick_100,
    count: 100,
    price: 80000,
    type: GENERATIONS_TYPES.quickWizard,
    titleT: 'subscription.products.smart.title',
    descriptionT: 'subscription.products.smart.description',
    command: QUICK_SUBSCRIPTION_BUTTONS.quick_100,
    currency: 'UAH',
    name: 'Quick',
  },
};

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
