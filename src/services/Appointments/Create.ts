import { getRepository } from 'typeorm';

import Appointments from '../../models/Appointments';

import AppError from '../../errors/AppError';

interface Request {
  id_company: string;
  id_employee: string;
  id_serviceprice: string;
  id_user: string;
  date: Date;
  hour: Date;
  value: number;
  amount_charged: number;
}

class Create {
  public async execute({
    id_company,
    id_employee,
    id_serviceprice,
    id_user,
    date,
    hour,
    value,
    amount_charged
  }: Request): Promise<Appointments> {
    const appointmentsRepository = getRepository(Appointments);

    if (id_company == '') {
      throw new AppError('ID Company field is required field');
    }
    if (id_employee == '') {
      throw new AppError('ID Employee field is required field');
    }
    if (id_serviceprice == '') {
      throw new AppError('ID Service Price field is required field');
    }
    if (!date) {
      throw new AppError('Date field is required field');
    }
    if (!hour) {
      throw new AppError('Hour field is required field');
    }
    if (value > 0) {
      throw new AppError('Value field is required field');
    }


    const appointments = appointmentsRepository.create({
      id_company,
      id_employee,
      id_serviceprice,
      id_user,
      date: new Date(date),
      hour,
      value,
      amount_charged
    });

    await appointmentsRepository.save(appointments);

    return appointments;
  }
}

export default Create;
