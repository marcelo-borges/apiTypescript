import { getRepository } from 'typeorm';

import Services from '../../models/Services';

import AppError from '../../errors/AppError';

interface Request {
  code: string;
  description: string;
  note: string;
}

class Create {
  public async execute({
    code,
    description,
    note
  }: Request): Promise<Services> {
    const servicesRepository = getRepository(Services);

    if (code == '') {
      throw new AppError('Code field is required field');
    }

    const checkServiceCodeExists = await servicesRepository.findOne({
      where: { code },
    });

    if (checkServiceCodeExists) {
      throw new AppError('Code already used.');
    }

    if (description == '') {
      throw new AppError('Description field is required field');
    }
    const services = servicesRepository.create({
      code,
      description,
      note
    });

    await servicesRepository.save(services);

    return services;
  }
}

export default Create;
