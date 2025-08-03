import {
  AiService,
  AttachmentService,
  InvoiceService,
  SubscriptionService,
  UserService,
} from '@services';
import {
  invoiceRepository,
  subscriptionRepository,
  userRepository,
} from '@shared/repositories';

export const userService = new UserService(userRepository);
export const subscriptionService = new SubscriptionService(
  subscriptionRepository,
);
export const aiService = new AiService();
export const attachmentService = new AttachmentService();
export const invoiceService = new InvoiceService(invoiceRepository);
