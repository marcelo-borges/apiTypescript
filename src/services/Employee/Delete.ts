import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../../config/upload';

import Employee from '../../models/Employees';
import CompanyEmployee from '../../models/CompanyEmployee';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
}

class Delete {
  public async execute({ id }: Request): Promise<void> {
    const employeesRepository = getRepository(Employee);

    const employee = await employeesRepository.findOne(id);

    if (!employee) {
      throw new AppError('This employee does not exist.', 401);
    }

    const companyEmployeeRepository = getRepository(CompanyEmployee);

    const checkcompanyEmployeeIDEmployeeExists = await companyEmployeeRepository.findOne({
      where: { id_employee: id },
    });

    if (checkcompanyEmployeeIDEmployeeExists) {
      throw new AppError('Employee linked to the company. Delete the link before deleting the Employee.');
    }

    if (employee.avatar) {
      const employeeAvatarFilePath = path.join(uploadConfig.directory, employee.avatar);

      const employeeAvatarFileExists = await fs.promises.stat(employeeAvatarFilePath);

      if (employeeAvatarFileExists) {
        await fs.promises.unlink(employeeAvatarFilePath);
      }
    }

    await employeesRepository.delete({ id: id });
  }
}

export default Delete;
