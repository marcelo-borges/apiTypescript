import { getRepository } from 'typeorm';

import ServicePrice from '../../models/ServicePrice';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
  active: boolean;
}

class UpdateActive {
  public async execute({ id, active }: Request): Promise<ServicePrice> {
    const servicePriceRepository = getRepository(ServicePrice);

    const servicePrice = await servicePriceRepository.findOne(id);

    if (!servicePrice) {
      throw new AppError('This Service Price does not exist.', 401);
    }

    if (servicePrice.active != active) {
      servicePrice.active = active;

      await servicePriceRepository.save(servicePrice);
    }

    return servicePrice;
  }
}

export default UpdateActive;
