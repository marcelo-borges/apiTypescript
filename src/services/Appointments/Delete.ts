import { getRepository } from 'typeorm';

import Company from '../../models/Companies';
import CompanyEmployee from '../../models/CompanyEmployee';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
}

class Delete {
  public async execute({ id }: Request): Promise<void> {
    const companiesRepository = getRepository(Company);

    const company = await companiesRepository.findOne(id);

    if (!company) {
      throw new AppError('This company does not exist.', 401);
    }

    const companyEmployeeRepository = getRepository(CompanyEmployee);

    const checkcompanyEmployeeIDEmployeeExists = await companyEmployeeRepository.findOne({
      where: { id_company: id },
    });

    if (checkcompanyEmployeeIDEmployeeExists) {
      throw new AppError('Company linked to the employee. Delete the link before deleting the Company.');
    }

    await companiesRepository.delete({ id: id });
  }
}

export default Delete;
