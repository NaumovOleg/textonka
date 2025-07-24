export const PostWizardName = 'post-wizard';

export enum PostWizardType {
  personal = 'personal',
  productPromotion = 'productPromotion',
  announcement = 'announcement',
  opinion = 'opinion',
  educational = 'educational',
  caption = 'caption',
}

export enum PostWizardGoal {
  likeOrSave = 'likeOrSave',
  leaveComment = 'leaveComment',
  followLink = 'followLink',
  sendMessage = 'sendMessage',
  subscribe = 'subscribe',
  justRead = 'justRead',
}

export enum PostWizardStyle {
  friendly = 'friendly',
  confident = 'confident',
  heartfelt = 'heartfelt',
  analytical = 'analytical',
  bold = 'bold',
  humorous = 'humorous',
}

export enum PostWizardEmotion {
  emotional = 'emotional',
  inspirational = 'inspirational',
  wowEffect = 'wowEffect',
  thoughtful = 'thoughtful',
  provocative = 'provocative',
  smile = 'smile',
}

export type PostWizardEmoji = {
  emoji: boolean;
  hashtags: boolean;
  cta: boolean;
};

export type PostWizardSession = Partial<{
  language: string;
  attachmentUrl: string;
  type: PostWizardType;
  mainIdea: string;
  goal: PostWizardGoal;
  style: PostWizardStyle;
  emotion: PostWizardEmotion;
  keyDetails?: string;
  extra: Partial<PostWizardEmoji>;
  stepMessageId?: number;
  rootMessageId: number;
}>;

export enum PostWizardGeneralButtons {
  submit_extra = `${PostWizardName}_extra_submit`,
  previous_step = `${PostWizardName}_prev`,
  finish_wizard = `${PostWizardName}_finish_wizard`,
}

export const PostWizardButtons = {
  type: {
    [`${PostWizardName}_type_${PostWizardType.personal}`]:
      PostWizardType.personal,
    [`${PostWizardName}_type_${PostWizardType.productPromotion}`]:
      PostWizardType.productPromotion,
    [`${PostWizardName}_type_${PostWizardType.announcement}`]:
      PostWizardType.announcement,
    [`${PostWizardName}_type_${PostWizardType.opinion}`]:
      PostWizardType.opinion,
    [`${PostWizardName}_type_${PostWizardType.educational}`]:
      PostWizardType.educational,
    [`${PostWizardName}_type_${PostWizardType.caption}`]:
      PostWizardType.caption,
  },
  goal: {
    [`${PostWizardName}_goal_${PostWizardGoal.likeOrSave}`]:
      PostWizardGoal.likeOrSave,
    [`${PostWizardName}_goal_${PostWizardGoal.leaveComment}`]:
      PostWizardGoal.leaveComment,
    [`${PostWizardName}_goal_${PostWizardGoal.followLink}`]:
      PostWizardGoal.followLink,
    [`${PostWizardName}_goal_${PostWizardGoal.sendMessage}`]:
      PostWizardGoal.sendMessage,
    [`${PostWizardName}_goal_${PostWizardGoal.subscribe}`]:
      PostWizardGoal.subscribe,
    [`${PostWizardName}_goal_${PostWizardGoal.justRead}`]:
      PostWizardGoal.justRead,
  },
  style: {
    [`${PostWizardName}_style_${PostWizardStyle.friendly}`]:
      PostWizardStyle.friendly,
    [`${PostWizardName}_style_${PostWizardStyle.confident}`]:
      PostWizardStyle.confident,
    [`${PostWizardName}_style_${PostWizardStyle.heartfelt}`]:
      PostWizardStyle.heartfelt,
    [`${PostWizardName}_style_${PostWizardStyle.analytical}`]:
      PostWizardStyle.analytical,
    [`${PostWizardName}_style_${PostWizardStyle.bold}`]: PostWizardStyle.bold,
    [`${PostWizardName}_style_${PostWizardStyle.humorous}`]:
      PostWizardStyle.humorous,
  },
  emotion: {
    [`${PostWizardName}_emotion_${PostWizardEmotion.emotional}`]:
      PostWizardEmotion.emotional,
    [`${PostWizardName}_emotion_${PostWizardEmotion.inspirational}`]:
      PostWizardEmotion.inspirational,
    [`${PostWizardName}_emotion_${PostWizardEmotion.wowEffect}`]:
      PostWizardEmotion.wowEffect,
    [`${PostWizardName}_emotion_${PostWizardEmotion.thoughtful}`]:
      PostWizardEmotion.thoughtful,
    [`${PostWizardName}_emotion_${PostWizardEmotion.provocative}`]:
      PostWizardEmotion.provocative,
    [`${PostWizardName}_emotion_${PostWizardEmotion.smile}`]:
      PostWizardEmotion.smile,
  },
};
