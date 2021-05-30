import { getRepository } from 'typeorm';

import CompanyEmployee from '../../models/CompanyEmployee';

import AppError from '../../errors/AppError';

interface Request {
  id_company: string;
  id_employee: string;
}

class Delete {
  public async execute({ id_company, id_employee }: Request): Promise<void> {
    const companyEmployeeRepository = getRepository(CompanyEmployee);

    if (id_company == '') {
      throw new AppError('Id Company field is required field');
    }
    if (id_employee == '') {
      throw new AppError('Id Employee field is required field');
    }

    const companyEmployee = await companyEmployeeRepository.findOne({
      where: {
        id_company,
        id_employee
      }
    });

    if (!companyEmployee) {
      throw new AppError('This bond does not exist.');
    }

    await companyEmployeeRepository.delete({ id_company, id_employee });
  }
}

export default Delete;
