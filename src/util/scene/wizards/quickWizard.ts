export const QuickWizardName = 'quick-wizard';

export type QuickWizardSession = Partial<{
  language: 'uk' | 'ru' | 'pl' | 'en';
  attachmentUrl: string;
}>;

export enum QuickWizardGeneralButtons {
  finish_wizard = `${QuickWizardName}_finish_wizard`,
}
