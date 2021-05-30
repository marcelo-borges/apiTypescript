import { getRepository, Not } from 'typeorm';

import Employees from '../../models/Employees';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
  code: string;
  name: string;
  birth_date: Date;
  sex: 'male' | 'female';
  identity_document: string;
  registration_individuals: string;
  postal_code: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  cell_phone: string;
  phone: string;
  email: string;
  office: string;
  admission_date: Date;
  resignation_date: Date;
  note: string;
  interval: number;
  start_time: string;
  end_time: string;
  break_start: string;
  break_end: string;
  active: boolean;
}

class Update {
  public async execute({
    id,
    code,
    name,
    birth_date,
    sex,
    identity_document,
    registration_individuals,
    postal_code,
    street,
    number,
    complement,
    district,
    city,
    state,
    cell_phone,
    phone,
    email,
    office,
    admission_date,
    resignation_date,
    note,
    interval,
    start_time,
    end_time,
    active,
    break_start,
    break_end
  }: Request): Promise<Employees> {
    const employeeRepository = getRepository(Employees);

    if (code == '') {
      throw new AppError('Code field is required field');
    }

    const checkEmployeeCodeExists = await employeeRepository.findOne({
      where: { code, id: Not(id) },
    });

    if (checkEmployeeCodeExists) {
      throw new AppError('Code already used.');
    }

    const employee = await employeeRepository.findOne(id);

    if (!employee) {
      throw new AppError('This employee does not exist.');
    }

    if (name == '') {
      throw new AppError('Name field is required field');
    }
    if (!birth_date) {
      throw new AppError('Birth Date field is required field');
    }
    if (!sex) {
      throw new AppError('Sex field is required field');
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
    if (!admission_date) {
      throw new AppError('Admission Date field is required field');
    }

    if (interval == 0) {
      throw new AppError('Interval field has to be greater than zero.');
    }
    if (!start_time) {
      throw new AppError('Start Time field is required field.');
    }
    if (!end_time) {
      throw new AppError('End Time field is required field.');
    }
    if (!break_start) {
      throw new AppError('Break Start field is required field.');
    }
    if (!break_end) {
      throw new AppError('Break End field is required field.');
    }

    employee.code = code;
    employee.name = name;
    employee.birth_date = new Date(birth_date);
    employee.sex = sex;
    employee.identity_document = identity_document;
    employee.registration_individuals = registration_individuals;
    employee.postal_code = postal_code;
    employee.street = street;
    employee.number = number;
    employee.complement = complement;
    employee.district = district;
    employee.city = city;
    employee.state = state;
    employee.cell_phone = cell_phone;
    employee.phone = phone;
    employee.email = email;
    employee.office = office;
    employee.admission_date = new Date(admission_date);
    employee.resignation_date = resignation_date ? new Date(resignation_date) : null;
    employee.note = note;
    employee.interval = interval;
    employee.start_time = start_time;
    employee.end_time = end_time;
    employee.break_start = break_start;
    employee.break_end = break_end;
    employee.active = active;

    await employeeRepository.save(employee);

    return employee;
  }
}

export default Update;
