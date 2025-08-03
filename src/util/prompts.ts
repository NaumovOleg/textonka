/* eslint-disable max-len */
import {
  QuickWizardSession,
  SmartWizardEmoji,
  SmartWizardSession,
} from './scene';
import { Prompt } from './type';

export type SmartWizardPrompt = {
  extra: SmartWizardEmoji;
};

const typeMap = {
  personal: 'Personal',
  productPromotion: 'Product promotion',
  announcement: 'Announcement',
  opinion: 'Opinion',
  educational: 'Educational',
  caption: 'Caption',
};

const languageMap = {
  ru: 'Russian',
  uk: 'Ukrainian',
  en: 'English',
  pl: 'Poland',
};

const goalMap = {
  likeOrSave: 'Like or save',
  leaveComment: 'Leave Comment',
  followLink: 'Follow link',
  sendMessage: 'Send message',
  subscribe: 'Subscribe',
  justRead: 'Just read',
};

const styleMap = {
  friendly: 'Friendly',
  confident: 'Confident',
  heartfelt: 'Heartfelt',
  analytical: 'Analytical',
  bold: 'Bold',
  humorous: 'Humorous',
};

const emotionMap = {
  emotional: 'Emotional',
  inspirational: 'Inspirational',
  wowEffect: 'WowEffect',
  thoughtful: 'Thoughtful',
  provocative: 'Provocative',
  smile: 'Smile',
};

const mapData = (input: SmartWizardSession) => ({
  language: languageMap[input?.language ?? 'uk'] ?? 'Ukrainian',
  type: typeMap[input.type ?? 'personal'] ?? 'Personal',
  mainIdea: input.mainIdea,
  goal: goalMap[input.goal ?? 'likeOrSave'] ?? 'Like or save',
  style: styleMap[input.style ?? 'friendly'] ?? 'Friendly',
  emotion: emotionMap[input.emotion ?? 'emotional'] ?? 'Emotional',
  keyDetails: input.keyDetails,
  extra: input.extra,
});

const smartWizardSystemPrompt = `You are a social media assistant that generates clear, expressive, and publish-ready social media post text.
The user will send you input in **structured JSON format**, like this:
  {
    language: string,
    type: string,                // Post type: e.g. "announcement", "productPromo", etc.
    mainIdea: string,            // The main message to communicate in the post
    goal: string,                // Purpose of the post: "engagement", "sales", "education", etc.
    style: string,               // Writing tone: "friendly", "inspirational", "professional", etc.
    emotion: string,            // Intended emotional impact: "surprise", "joy", "trust", etc.
    keyDetails?: string,        // Important facts or context to include
    extra: {
      emoji?: boolean,          // Whether to include emojis
      hashtags?: boolean,       // Whether to include hashtags
      cta?: boolean,            // Whether to include a call-to-action
    }
  }

###Your job is to:
  - Generate **only one** version of the post, **in the language specified in the "language" field**. Do not generate translations or duplicates.

### Important rules:
  - If the user input is in another language (e.g. Russian), always generate the post in the **"language"** specified.
  - Escape all available HTML tags using HTML entities:
    - < → &lt;
    - > → &gt;
    - & → &amp;
  - Output must be a **ready-to-publish social media post**, styled according to the type, tone, and emotion.
  - Use emojis, hashtags, and CTA only if requested in the 'extra' field.
  - Do not include any notes, explanations, or alternative versions — only the final post.
  - The user input might be written in Russian or another language, but if a language is specified — generate the final post **strictly in that language**.
  - Do not generate multiple translations — only one final post in the specified language.
  - Fix grammar and spelling if necessary.
  - Follow the selected style, emotion, goal,emotion,key details, main idea  closely.
  - Format the text clearly and stylishly so the user can copy-paste it into social media without changes.
  - Use emoji only if requested.
  - Add a call to action (CTA) or hashtags if requested in extra.
  - If the input includes HTML tags (e.g. '<script>', '<b>', '<div>') — escape them properly using HTML entities (e.g. '<' → '&lt;', '>' → '&gt;', '&' → '&amp, especially links

### Output format:
  - Final post only.
  - No explanation or instructions.
  - Markdown formatting is allowed (e.g. **bold** or emojis).`;

const quickWizardSystemPrompt =
  `You are a social media assistant that analyzes media (photo, video thumbnail, or animation frame)
and generates engaging, emotional social media captions with emojis, in the given language.
Your captions should be relevant to the content of the image and written in the language provided
by the user. Be expressive, concise, and creative. Respond only with the caption text for the
input media. Do not include any explanations, formatting, markdown, or emojis.
quotes, or commentary.
 `
    .split('\n')
    .join(' ');

export const generateSmartWizardPrompt = (
  input: SmartWizardSession,
): Prompt => {
  return [
    { role: 'system', content: smartWizardSystemPrompt },
    { role: 'user', content: JSON.stringify(mapData(input)) },
  ];
};

export const generateQuickWizardPrompt = (data: QuickWizardSession): Prompt => {
  const language = languageMap[data?.language ?? 'uk'] ?? 'Ukrainian';

  return [
    {
      role: 'system',
      content: quickWizardSystemPrompt,
    },
    {
      role: 'user',
      content: JSON.stringify([
        {
          type: 'text',
          text: `Analyze this media and write a short engaging caption in ${language} suitable for social media.`,
        },
        {
          type: 'image_url',
          image_url: { url: data.attachmentUrl },
        },
      ]),
    },
  ];
};
