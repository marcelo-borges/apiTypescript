import { getRepository } from 'typeorm';

import User from '../../models/User';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
  active: boolean;
}

class UpdateActive {
  public async execute({ id, active }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('This user does not exist.', 401);
    }

    if (user.active != active) {
      user.active = active;

      await usersRepository.save(user);
    }

    delete user.password;

    return user;
  }
}

export default UpdateActive;
