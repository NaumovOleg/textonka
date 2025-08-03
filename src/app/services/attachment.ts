import axios from 'axios';

export class AttachmentService {
  async prepareFileBase64(url: string) {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
    });
    return Buffer.from(response.data).toString('base64');
  }
}
