import { getRepository, Not } from 'typeorm';

import Services from '../../models/Services';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
  code: string;
  description: string;
  note: string;
  active: boolean;
}

class Update {
  public async execute({
    id,
    code,
    description,
    note,
    active,
  }: Request): Promise<Services> {
    const serviceRepository = getRepository(Services);

    if (code == '') {
      throw new AppError('Code field is required field');
    }

    const checkServiceCodeExists = await serviceRepository.findOne({
      where: { code, id: Not(id) },
    });

    if (checkServiceCodeExists) {
      throw new AppError('Code already used.');
    }

    const service = await serviceRepository.findOne(id);

    if (!service) {
      throw new AppError('This service does not exist.');
    }

    if (description == '') {
      throw new AppError('Description field is required field');
    }

    service.code = code;
    service.description = description;
    service.note = note;
    service.active = active;

    await serviceRepository.save(service);

    return service;
  }
}

export default Update;
