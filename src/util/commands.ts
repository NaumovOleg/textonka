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
};

export const WIZARD_COMMANDS = {
  smartwizard: 'smartwizard',
  quickwizard: 'quickwizard',
};
