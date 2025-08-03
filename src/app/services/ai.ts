import Conf from '@conf';
import {
  generateQuickWizardPrompt,
  generateSmartWizardPrompt,
  Prompt,
  QuickWizardSession,
  SmartWizardSession,
  WizardType,
} from '@util';
import axios from 'axios';

type Session<T extends WizardType> = T extends WizardType.smart_wizard
  ? SmartWizardSession
  : T extends WizardType.quick_wizard
    ? QuickWizardSession
    : never;

export class AiService {
  private aiUrl = 'https://openrouter.ai/api/v1/chat/completions';
  private headers = {
    Authorization: `Bearer ${Conf.AI_API_KEY}`,
    'Content-Type': 'application/json',
  };
  private prompts = {
    [WizardType.smart_wizard]: generateSmartWizardPrompt,
    [WizardType.quick_wizard]: generateQuickWizardPrompt,
  };
  private models = {
    [WizardType.smart_wizard]: Conf.TEXT_AI_MODEL,
    [WizardType.quick_wizard]: Conf.IMAGE_AI_MODEL,
  };

  async getCompletion(messages: Prompt, model: string) {
    const response = await axios.post(
      this.aiUrl,
      { messages, model },
      { headers: this.headers },
    );

    return response.data;
  }

  async generateAiResponse<T extends WizardType>(type: T, data: Session<T>) {
    const prompt = this.prompts[type](data);
    console.log('Using prompt:', prompt);
    const { choices } = await this.getCompletion(prompt, this.models[type]);
    const resp = choices[0].message.content;
    console.log('Response:', resp);
    return resp;
  }
}
