import { Animation, PhotoSize, Video } from 'telegraf/types';
import { WIZARD_LANGUAGES } from '../common';
export const QuickWizardName = 'quick-wizard';

export type QuickWizardSession = Partial<{
  language: 'uk' | 'ru' | 'pl' | 'en';
  attachmentUrl: string;
}>;

export enum QuickWizardGeneralButtons {
  finish_wizard = `${QuickWizardName}_finish_wizard`,
}

export const QuickWizardButtons = {
  language: {
    [`${QuickWizardName}_language_${WIZARD_LANGUAGES.en}`]: WIZARD_LANGUAGES.en,
    [`${QuickWizardName}_language_${WIZARD_LANGUAGES.ru}`]: WIZARD_LANGUAGES.ru,
    [`${QuickWizardName}_language_${WIZARD_LANGUAGES.uk}`]: WIZARD_LANGUAGES.uk,
    [`${QuickWizardName}_language_${WIZARD_LANGUAGES.pl}`]: WIZARD_LANGUAGES.pl,
  },
};

export type Attachment = {
  fileId: string;
  type: 'photo' | 'video' | 'animation';
  file: Animation | PhotoSize | Video;
  error?: string;
};
