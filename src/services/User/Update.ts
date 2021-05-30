import { getRepository, Not } from 'typeorm';

import User from '../../models/User';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
  name: string;
  email: string;
  cell_phone: string;
  active: boolean;
  type: string;
}

class Update {
  public async execute({ id, name, email, cell_phone, active, type }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserEmailExists = await usersRepository.findOne({
      where: { email, id: Not(id) },
    });

    if (checkUserEmailExists) {
      throw new AppError('This email is already being used.');
    }

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('This user does not exist.');
    }

    user.name = name;
    user.email = email;
    user.cell_phone = cell_phone;
    user.active = active;
    user.type = type;

    await usersRepository.save(user);

    delete user.password;

    return user;
  }
}

export default Update;
