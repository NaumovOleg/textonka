/* eslint-disable max-len */
import { PostWizardEmoji, PostWizardSession } from './scene';
import { Prompt } from './type';

export type PostWizardPrompt = {
  extra: PostWizardEmoji;
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

const mapData = (input: PostWizardSession) => ({
  language: languageMap[input?.language ?? 'uk'] ?? 'Ukrainian',
  type: typeMap[input.type ?? 'personal'] ?? 'Personal',
  mainIdea: input.mainIdea,
  goal: goalMap[input.goal ?? 'likeOrSave'] ?? 'Like or save',
  style: styleMap[input.style ?? 'friendly'] ?? 'Friendly',
  emotion: emotionMap[input.emotion ?? 'emotional'] ?? 'Emotional',
  keyDetails: input.keyDetails,
  extra: input.extra,
});

const postWizardSystemPrompt = `You are a social media assistant that generates clear, expressive, and publish-ready social media post text.
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

export const generatePostWizardPrompt = (input: PostWizardSession): Prompt => {
  return [
    { role: 'system', content: postWizardSystemPrompt },
    { role: 'user', content: JSON.stringify(mapData(input)) },
  ];
};
