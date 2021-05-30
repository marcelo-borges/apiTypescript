import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../../config/upload';

import User from '../../models/User';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
}

class Delete {
  public async execute({ id }: Request): Promise<void> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('This user does not exist.', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    await usersRepository.delete({ id: id });
  }
}

export default Delete;
