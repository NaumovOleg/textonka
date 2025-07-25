import Config from '@conf';
import { ObjectId } from 'mongodb';

export const getMongoUrl = () => {
  let mongoUrl = Config.DATABASE_URL.replace('<user>', Config.DATABASE_USER);
  mongoUrl = mongoUrl.replace('<password>', Config.DATABASE_PASSWORD);
  mongoUrl = mongoUrl.replace('<database>', Config.DATABASE_NAME);
  return mongoUrl;
};

export const splitByChunks = <T>(arr: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

export const isValidObjectId = (str: string) => {
  return ObjectId.isValid(str) && String(new ObjectId(str)) === str;
};

export const deepParseObjectId = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map((item) => deepParseObjectId(item));
  }
  if (typeof data === 'object' && data !== null) {
    for (const key in data) {
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(key)) {
        data[key] = deepParseObjectId(data[key]);
      }
    }
    return data;
  }

  if (typeof data === 'string' && isValidObjectId(data)) {
    return new ObjectId(data);
  }

  return data;
};
