export const SUBSCRIPTION_COMMANDS = {
  subscription: 'subscription',
  smart_prices: 'smart-prices',
  quick_prices: 'quick-prices',
  price_list: /^(smart|quick)-prices$/,
  invoice: /^(smart|quick)_\d+$/,
};

export const COMMON_COMMANDS = {
  start: 'start',
  quit: 'quit',
  samples: 'samples',
  help: 'help',
  info: 'info',
};

export const QUICK_WIZARD_START_ROUTES = [
  'Quick генерация',
  'Quick генерація',
  'Quick wizard',
];
export const SMART_WIZARD_START_ROUTES = [
  'Smart генерация',
  'Smart генерація',
  'Smart wizard',
];

export const WIZARD_COMMANDS = {
  smartwizard: 'smartwizard',
  quickwizard: 'quickwizard',
};
