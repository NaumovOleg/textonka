import axios from 'axios';

export class AttachmentService {
  async prepareFileBuffer(url: string) {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
    });
    return Buffer.from(response.data);
  }
}
