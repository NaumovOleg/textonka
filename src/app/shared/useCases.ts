import {
  invoiceService,
  subscriptionService,
  userService,
} from '@shared/services';
import {
  CreateInvoiceUseCase,
  CreateSubscriptionUseCase,
  CreateUserUseCase,
  FindSubscriptionUseCase,
  FindUserUseCase,
  UpdateInvoiceUseCase,
} from '@useCases';

export const createUserUC = new CreateUserUseCase(userService);
export const findUserUC = new FindUserUseCase(userService);
export const createSubscriptionUC = new CreateSubscriptionUseCase(
  subscriptionService,
);
export const findSubscriptionUC = new FindSubscriptionUseCase(
  subscriptionService,
);
export const createInvoiceUC = new CreateInvoiceUseCase(invoiceService);
export const updateInvoiceUC = new UpdateInvoiceUseCase(invoiceService);
