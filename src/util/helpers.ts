import Config from '@conf';

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
