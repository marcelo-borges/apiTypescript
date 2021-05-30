import { getRepository, Not } from 'typeorm';

import Company from '../../models/Companies';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
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
  active: boolean;
}

class Update {
  public async execute({
    id,
    code,
    company_name,
    name,
    identity_document,
    registration_individuals,
    postal_code,
    site,
    email,
    cell_phone,
    phone,
    street,
    number,
    complement,
    district,
    city,
    state,
    note,
    active,
  }: Request): Promise<Company> {
    const companyRepository = getRepository(Company);

    if (code == '') {
      throw new AppError('Code field is required field');
    }

    const checkCompanyCodeExists = await companyRepository.findOne({
      where: { code, id: Not(id) },
    });

    if (checkCompanyCodeExists) {
      throw new AppError('Code already used.');
    }

    const company = await companyRepository.findOne(id);

    if (!company) {
      throw new AppError('This company does not exist.');
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

    company.code = code;
    company.company_name = company_name;
    company.name = name;
    company.registration_individuals = registration_individuals;
    company.identity_document = identity_document;
    company.site = site;
    company.email = email;
    company.cell_phone = cell_phone;
    company.phone = phone;
    company.postal_code = postal_code;
    company.street = street;
    company.number = number;
    company.complement = complement;
    company.district = district;
    company.city = city;
    company.state = state;
    company.note = note;
    company.active = active;

    await companyRepository.save(company);

    return company;
  }
}

export default Update;
