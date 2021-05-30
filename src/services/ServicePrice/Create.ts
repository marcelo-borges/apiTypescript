import { getRepository } from 'typeorm';

import ServicePrice from '../../models/ServicePrice';
import Companies from '../../models/Companies';

import AppError from '../../errors/AppError';

interface Request {
  id_company: string;
  start_date: Date;
  end_date: Date;
  value: number;
}

class Create {
  public async execute({
    id_company,
    start_date,
    end_date,
    value
  }: Request): Promise<ServicePrice> {
    const servicePriceRepository = getRepository(ServicePrice);
    const companiesRepository = getRepository(Companies);

    if (id_company == '') {
      throw new AppError('ID Company field is required field');
    }

    const checkCompanyExists = await companiesRepository.findOne({
      where: { id: id_company },
    });

    if (!checkCompanyExists) {
      throw new AppError('This ID company does not exist.');
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

    const serviceprice = servicePriceRepository.create({
      id_company,
      start_date,
      end_date,
      value
    });

    await servicePriceRepository.save(serviceprice);

    return serviceprice;
  }
}

export default Create;
