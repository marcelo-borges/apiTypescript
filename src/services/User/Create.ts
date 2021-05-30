import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../../models/User';

import AppError from '../../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  cell_phone: string;
  type: 'client' | 'employee' | 'administrator';
}

class Create {
  public async execute({ name, email, cell_phone, password, confirm_password, type }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    if(confirm_password != password){
      throw new AppError('The passwords entered are not the same.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      cell_phone,
      type
    });

    await usersRepository.save(user);

    delete user.password;

    return user;
  }
}

export default Create;
