import { getRepository } from 'typeorm';

import Company from '../../models/Companies';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
  active: boolean;
}

class UpdateActive {
  public async execute({ id, active }: Request): Promise<Company> {
    const companyRepository = getRepository(Company);

    const company = await companyRepository.findOne(id);
    console.log(`teste ${company}`);
    if (!company) {
      throw new AppError('This Company does not exist.', 401);
    }

    if (company.active != active) {
      company.active = active;

      await companyRepository.save(company);
    }

    return company;
  }
}

export default UpdateActive;
