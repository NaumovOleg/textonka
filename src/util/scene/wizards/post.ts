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
  clean: boolean;
};

export type PostWizardSession = Partial<{
  type: PostWizardType;
  mainIdea: string;
  goal: PostWizardGoal;
  style: PostWizardStyle;
  emotion: PostWizardEmotion;
  keyDetails?: string;
  extra: Partial<PostWizardEmoji>;
}>;

export const PostWizardButtons = {
  type: {
    [PostWizardType.personal]: `${PostWizardName}_type_${PostWizardType.personal}`,
    [PostWizardType.productPromotion]: `${PostWizardName}_type_${PostWizardType.productPromotion}`,
    [PostWizardType.announcement]: `${PostWizardName}_type_${PostWizardType.announcement}`,
    [PostWizardType.opinion]: `${PostWizardName}_type_${PostWizardType.opinion}`,
    [PostWizardType.educational]: `${PostWizardName}_type_${PostWizardType.educational}`,
    [PostWizardType.caption]: `${PostWizardName}_type_${PostWizardType.caption}`,
  },
};
