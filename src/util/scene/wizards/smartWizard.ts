export const SmartWizardName = 'smart-wizard';
export const SMART_WIZARD_STEPS_COUNT = 8;
export enum SMART_WIZARD_LANGUAGES {
  ru = 'ru',
  en = 'en',
  uk = 'uk',
  pl = 'pl',
}

export enum SmartWizardType {
  personal = 'personal',
  productPromotion = 'productPromotion',
  announcement = 'announcement',
  opinion = 'opinion',
  educational = 'educational',
  caption = 'caption',
}

export enum SmartWizardGoal {
  likeOrSave = 'likeOrSave',
  leaveComment = 'leaveComment',
  followLink = 'followLink',
  sendMessage = 'sendMessage',
  subscribe = 'subscribe',
  justRead = 'justRead',
}

export enum SmartWizardStyle {
  friendly = 'friendly',
  confident = 'confident',
  heartfelt = 'heartfelt',
  analytical = 'analytical',
  bold = 'bold',
  humorous = 'humorous',
}

export enum SmartWizardEmotion {
  emotional = 'emotional',
  inspirational = 'inspirational',
  wowEffect = 'wowEffect',
  thoughtful = 'thoughtful',
  provocative = 'provocative',
  smile = 'smile',
}

export type SmartWizardEmoji = {
  emoji: boolean;
  hashtags: boolean;
  cta: boolean;
};

export type SmartWizardSession = Partial<{
  language: 'uk' | 'ru' | 'pl' | 'en';
  attachmentUrl: string;
  type: SmartWizardType;
  mainIdea: string;
  goal: SmartWizardGoal;
  style: SmartWizardStyle;
  emotion: SmartWizardEmotion;
  keyDetails?: string;
  extra: Partial<SmartWizardEmoji>;
}>;

export enum SmartWizardGeneralButtons {
  submit_extra = `${SmartWizardName}_extra_submit`,
  previous_step = `${SmartWizardName}_prev`,
  finish_wizard = `${SmartWizardName}_finish_wizard`,
}

export type SmartWizardSceneState = {
  stepMessageId?: number;
  rootMessageId: number;
};

export const SmartWizardButtons = {
  type: {
    [`${SmartWizardName}_type_${SmartWizardType.personal}`]:
      SmartWizardType.personal,
    [`${SmartWizardName}_type_${SmartWizardType.productPromotion}`]:
      SmartWizardType.productPromotion,
    [`${SmartWizardName}_type_${SmartWizardType.announcement}`]:
      SmartWizardType.announcement,
    [`${SmartWizardName}_type_${SmartWizardType.opinion}`]:
      SmartWizardType.opinion,
    [`${SmartWizardName}_type_${SmartWizardType.educational}`]:
      SmartWizardType.educational,
    [`${SmartWizardName}_type_${SmartWizardType.caption}`]:
      SmartWizardType.caption,
  },
  goal: {
    [`${SmartWizardName}_goal_${SmartWizardGoal.likeOrSave}`]:
      SmartWizardGoal.likeOrSave,
    [`${SmartWizardName}_goal_${SmartWizardGoal.leaveComment}`]:
      SmartWizardGoal.leaveComment,
    [`${SmartWizardName}_goal_${SmartWizardGoal.followLink}`]:
      SmartWizardGoal.followLink,
    [`${SmartWizardName}_goal_${SmartWizardGoal.sendMessage}`]:
      SmartWizardGoal.sendMessage,
    [`${SmartWizardName}_goal_${SmartWizardGoal.subscribe}`]:
      SmartWizardGoal.subscribe,
    [`${SmartWizardName}_goal_${SmartWizardGoal.justRead}`]:
      SmartWizardGoal.justRead,
  },
  style: {
    [`${SmartWizardName}_style_${SmartWizardStyle.friendly}`]:
      SmartWizardStyle.friendly,
    [`${SmartWizardName}_style_${SmartWizardStyle.confident}`]:
      SmartWizardStyle.confident,
    [`${SmartWizardName}_style_${SmartWizardStyle.heartfelt}`]:
      SmartWizardStyle.heartfelt,
    [`${SmartWizardName}_style_${SmartWizardStyle.analytical}`]:
      SmartWizardStyle.analytical,
    [`${SmartWizardName}_style_${SmartWizardStyle.bold}`]:
      SmartWizardStyle.bold,
    [`${SmartWizardName}_style_${SmartWizardStyle.humorous}`]:
      SmartWizardStyle.humorous,
  },
  emotion: {
    [`${SmartWizardName}_emotion_${SmartWizardEmotion.emotional}`]:
      SmartWizardEmotion.emotional,
    [`${SmartWizardName}_emotion_${SmartWizardEmotion.inspirational}`]:
      SmartWizardEmotion.inspirational,
    [`${SmartWizardName}_emotion_${SmartWizardEmotion.wowEffect}`]:
      SmartWizardEmotion.wowEffect,
    [`${SmartWizardName}_emotion_${SmartWizardEmotion.thoughtful}`]:
      SmartWizardEmotion.thoughtful,
    [`${SmartWizardName}_emotion_${SmartWizardEmotion.provocative}`]:
      SmartWizardEmotion.provocative,
    [`${SmartWizardName}_emotion_${SmartWizardEmotion.smile}`]:
      SmartWizardEmotion.smile,
  },
  language: {
    [`${SmartWizardName}_language_${SMART_WIZARD_LANGUAGES.en}`]:
      SMART_WIZARD_LANGUAGES.en,
    [`${SmartWizardName}_language_${SMART_WIZARD_LANGUAGES.ru}`]:
      SMART_WIZARD_LANGUAGES.ru,
    [`${SmartWizardName}_language_${SMART_WIZARD_LANGUAGES.uk}`]:
      SMART_WIZARD_LANGUAGES.uk,
    [`${SmartWizardName}_language_${SMART_WIZARD_LANGUAGES.pl}`]:
      SMART_WIZARD_LANGUAGES.pl,
  },
};
