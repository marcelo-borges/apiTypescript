import { getRepository, Not } from 'typeorm';

import ServicePrice from '../../models/ServicePrice';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
  id_company: string;
  start_date: Date;
  end_date: Date;
  value: number;
  active: boolean;
}

class Update {
  public async execute({
    id,
    id_company,
    start_date,
    end_date,
    value,
    active
  }: Request): Promise<ServicePrice> {
    const servicePriceRepository = getRepository(ServicePrice);

    if (id_company == '') {
      throw new AppError('ID Company field is required field');
    }

    const servicePrice = await servicePriceRepository.findOne(id);

    if (!servicePrice) {
      throw new AppError('This service price does not exist.');
    }

    if (!start_date) {
      throw new AppError('Start Date field is required field');
    }
    if (!end_date) {
      throw new AppError('End Date field is required field');
    }
    if ((!value) && (value > 0)) {
      throw new AppError('Value must be non-null and greater than zero');
    }

    servicePrice.id_company = id_company;
    servicePrice.start_date = start_date;
    servicePrice.end_date = end_date;
    servicePrice.value = value;
    servicePrice.active = active;

    await servicePriceRepository.save(servicePrice);

    return servicePrice;
  }
}

export default Update;
