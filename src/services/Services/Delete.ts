import { getRepository } from 'typeorm';

import Services from '../../models/Services';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
}

class Delete {
  public async execute({ id }: Request): Promise<void> {
    const servicesRepository = getRepository(Services);

    const service = await servicesRepository.findOne(id);

    if (!service) {
      throw new AppError('This service does not exist.', 401);
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

    await servicesRepository.delete({ id: id });
  }
}

export default Delete;
