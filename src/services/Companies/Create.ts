import { getRepository } from 'typeorm';

import Company from '../../models/Companies';

import AppError from '../../errors/AppError';

interface Request {
  code: string;
  company_name: string;
  name: string;
  registration_individuals: string;
  identity_document: string;
  site: string;
  email: string;
  cell_phone: string;
  phone: string;
  postal_code: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  note: string;
}

class Create {
  public async execute({
    code,
    company_name,
    name,
    registration_individuals,
    identity_document,
    site,
    email,
    cell_phone,
    phone,
    postal_code,
    street,
    number,
    complement,
    district,
    city,
    state,
    note
  }: Request): Promise<Company> {
    const companiesRepository = getRepository(Company);

    if (code == '') {
      throw new AppError('Code field is required field');
    }

    const checkCompanyCodeExists = await companiesRepository.findOne({
      where: { code },
    });

    if (checkCompanyCodeExists) {
      throw new AppError('Code already used.');
    }

    if (name == '') {
      throw new AppError('Name field is required field');
    }
    if (company_name == '') {
      throw new AppError('Company Name field is required field');
    }
    if (postal_code == '') {
      throw new AppError('Postal code field is required field');
    }
    if (street == '') {
      throw new AppError('Street field is required field');
    }
    if (district == '') {
      throw new AppError('District field is required field');
    }
    if (city == '') {
      throw new AppError('City field is required field');
    }
    if (state == '') {
      throw new AppError('State field is required field');
    }


    const company = companiesRepository.create({
      code,
      company_name,
      name,
      identity_document,
      registration_individuals,
      site,
      email,
      cell_phone,
      phone,
      postal_code,
      street,
      number,
      complement,
      district,
      city,
      state,
      note
    });

    await companiesRepository.save(company);

    return company;
  }
}

export default Create;
