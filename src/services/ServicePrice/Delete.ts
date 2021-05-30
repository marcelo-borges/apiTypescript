import { getRepository } from 'typeorm';

import ServicePrice from '../../models/ServicePrice';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
}

class Delete {
  public async execute({ id }: Request): Promise<void> {
    const servicePriceRepository = getRepository(ServicePrice);

    const servicePrice = await servicePriceRepository.findOne(id);

    if (!servicePrice) {
      throw new AppError('This service price does not exist.', 401);
    }

    /*
    const companyEmployeeRepository = getRepository(CompanyEmployee);

    const checkcompanyEmployeeIDEmployeeExists = await companyEmployeeRepository.findOne({
      where: { id_company: id },
    });

    if (checkcompanyEmployeeIDEmployeeExists) {
      throw new AppError('Company linked to the employee. Delete the link before deleting the Company.');
    }
    */

    await servicePriceRepository.delete({ id: id });
  }
}

export default Delete;
