import {
  AppDataSource,
  SessionEntity,
  UserEntity,
  UserRepositoryImpl,
} from '@infrastructure';

const userRepositoryImpl = new UserRepositoryImpl(AppDataSource, UserEntity);

const typeormSession = () => {
  return {
    async get(key: string) {
      const repo = AppDataSource.getMongoRepository(SessionEntity);
      const found = await repo.findOne({ where: { key } });
      return found?.data || {};
    },

    async set(key: string, value: object) {
      const repo = AppDataSource.getMongoRepository(SessionEntity);
      const existing = await repo.findOne({ where: { key } });

      if (existing) {
        existing.data = value;
        await repo.save(existing);
      } else {
        const session = repo.create({ key, data: value });
        await repo.save(session);
      }
    },

    async delete(key: string) {
      const repo = AppDataSource.getMongoRepository(SessionEntity);
      await repo.deleteOne({ key });
    },
  };
};

export { AppDataSource, typeormSession, userRepositoryImpl };
