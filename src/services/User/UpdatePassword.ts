import { getRepository, Not } from 'typeorm';
import { hash, compare } from 'bcryptjs';

import User from '../../models/User';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
  oldPassword: string;
  password: string;
  comparePassword: string;
}

class UpdatePassword {
  public async execute({
    id,
    oldPassword,
    password,
    comparePassword,
  }: Request): Promise<User | null> {
    const usersRepository = getRepository(User);

    if (password.localeCompare(comparePassword) != 0) {
      throw new AppError('Passwords entered are not the same.');
    }

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('This user does not exist.');
    }

    const res = await compare(oldPassword, user.password);

    if (!res) {
      throw new AppError(
        'The old password does not match the registered one. Check!',
      );
    }

    if (password.localeCompare(oldPassword) != 0) {
      user.password = await hash(password, 8);

      await usersRepository.save(user);
    }

    delete user.password;

    return user;
  }
}

export default UpdatePassword;
