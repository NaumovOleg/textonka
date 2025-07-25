/* eslint-disable max-len */
import { PostWizardEmoji, PostWizardSession } from './scene';

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

export const generatePostWizardPrompt = (input: PostWizardSession): string => {
  const { extra, language, type, mainIdea, goal, style, emotion, keyDetails } =
    mapData(input);
  const promptHeader =
    'You are an experienced copywriter who creates viral and engaging **social media captions** for user posts.Generate a **caption** (post text) for a social media post based on the following user-provided data:';

  const formattingReferences = [
    `- Use emojis: ${extra?.emoji ? 'yes' : 'no'}`,
    `- Add hashtags: ${extra?.hashtags ? 'yes' : 'no'}`,
    `- Include a call to action (CTA): ${extra?.cta ? 'yes' : 'no'}`,
  ];

  const promptData = [
    `- Language: ${language} (generate the caption in this language)`,
    `- Platform: (use your best guess based on style, tone, or attachment if not specified)`,
    `- Post type: ${type}`,
    `- Main idea: ${mainIdea}`,
    `- Goal: ${goal}`,
    `- Style: ${style}`,
    `- Emotion: ${emotion}`,
    `- Key details: ${keyDetails || '—'}`,
    `- Formatting preferences: ${formattingReferences.join(', ')}`,
  ];

  const instructions =
    'Instructions' +
    [
      `- It should read fluently and naturally as if written by a human, with **no spelling or grammar errors**`,
      `- The result must be a **well-formatted, grammatically correct`,
      `- Include relevant details in a **clear, concise, and scroll-stopping** format.`,
      `- Break long text into **short paragraphs or lines** to improve readability.`,
      `- Start with a strong hook to capture`,
      '- Expand on the main idea with the selected style',
      '- Include a CTA if requested and relevant to the goal.',
      '- Use emojis only if requested, and integrate them naturally.',
      '- Add **up to 5 related hashtags** at the end if hashtags are requested, each on a new line or space-separated.',
      '- Keep it engaging, and ready to post — no explanations, no extra commentary.',
      '- **Output only the final, polished caption text** — no explanation, no commentary, no formatting like code blocks.',
      '- The output should be ready for **copy-paste directly into a social media app** (Instagram, Facebook, Twitter/X, etc.).',
    ].join(' ');

  const readyPrompt =
    promptHeader +
    promptData +
    instructions +
    'Be concise, human, and bold — write like a real person trying to connect with an audience.';

  const data = mapData(input);

  return `You are a social media assistant.

You are given user input with the following structure:

{
  language: ${data.language}
  type: ${data.type}
  mainIdea: ${data.mainIdea}
  goal: ${data.goal}
  style: ${data.style}
  emotion: ${data.emotion}
  keyDetails: ${data.keyDetails}
  extra: ${data.extra}
}

**Your task is to generate a clean, engaging, and well-written post** for social media, based only on the specified language. 

    ### Important rules:
    - The user input might be written in Russian or another language, but if a ${language} is specified — generate the final post **strictly in that language**.
    - Do not generate multiple translations — only one final post in the specified language.
    - Fix grammar and spelling if necessary.
    - Follow the selected ${style}, ${emotion}, and ${goal} closely.
    - Format the text clearly and stylishly so the user can copy-paste it into social media without changes.
    - Use emoji only if requested.
    - Add a call to action (CTA) or hashtags if requested in extra.
    - If the input includes HTML tags (e.g. '<script>', '<b>', '<div>') — escape them properly using HTML entities (e.g. '<' → '&lt;', '>' → '&gt;', '&' → '&amp, especially links

    ### Output format:
    - Final post only.
    - No explanation or instructions.
    - Markdown formatting is allowed (e.g. **bold** or emojis).

    Now generate the post.`;
};
