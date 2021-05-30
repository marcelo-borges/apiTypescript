import { getRepository } from 'typeorm';

import CompanyEmployee from '../../models/CompanyEmployee';

import AppError from '../../errors/AppError';

interface Request {
  id_company: string;
  id_employee: string;
}

class Create {
  public async execute({
    id_company,
    id_employee
  }: Request): Promise<CompanyEmployee> {
    const companyEmployeeRepository = getRepository(CompanyEmployee);

    if (id_company == '') {
      throw new AppError('Id Company field is required field');
    }
    if (id_employee == '') {
      throw new AppError('Id Employee field is required field');
    }

    const checkcompanyEmployeeIDEmployeeExists = await companyEmployeeRepository.findOne({
      where: { id_employee },
    });

    if (checkcompanyEmployeeIDEmployeeExists) {
      throw new AppError('This Employee is already linked.');
    }

    const companyEmployee = companyEmployeeRepository.create({
      id_company,
      id_employee
    });

    await companyEmployeeRepository.save(companyEmployee);

    return companyEmployee;
  }
}

export default Create;
