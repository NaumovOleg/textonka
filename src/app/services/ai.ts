import Conf from '@conf';
import { generateSmartWizardPrompt, Prompt, SmartWizardSession } from '@util';
import axios from 'axios';

export class AiService {
  async generatePostWizardText(input: SmartWizardSession) {
    const prompt = generateSmartWizardPrompt(input);

    console.log('Using prompt:', prompt);
    const { choices } = await this.getCompletion(prompt);
    const resp = choices[0].message.content;
    console.log('Response:', resp);
    return resp;
  }

  async getCompletion(messages: Prompt) {
    const headers = {
      Authorization: `Bearer ${Conf.AI_API_KEY}`,
      'Content-Type': 'application/json',
    };
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      { messages, model: Conf.AI_MODEL },
      { headers },
    );

    return response.data;
  }
}
