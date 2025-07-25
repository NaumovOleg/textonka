import Conf from '@conf';
import { PostWizardSession, generatePostWizardPrompt } from '@util';
import axios from 'axios';

export class AiService {
  async generatePostWizardText(input: PostWizardSession) {
    const prompt = generatePostWizardPrompt(input);

    console.log(prompt);
    const { choices } = await this.getCompletion(prompt);
    const resp = choices[0].message.content;
    console.log(resp);
    return resp;
  }

  async getCompletion(message: string) {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${Conf.AI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  }
}
