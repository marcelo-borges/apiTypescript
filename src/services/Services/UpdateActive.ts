import { getRepository } from 'typeorm';

import Services from '../../models/Services';
import AppError from '../../errors/AppError';

interface Request {
  id: string;
  active: boolean;
}

class UpdateActive {
  public async execute({ id, active }: Request): Promise<Services> {
    const serviceRepository = getRepository(Services);

    const service = await serviceRepository.findOne(id);

    if (!service) {
      throw new AppError('This Service does not exist.', 401);
    }

    if (service.active != active) {
      service.active = active;

      await serviceRepository.save(service);
    }

    return service;
  }
}

export default UpdateActive;
