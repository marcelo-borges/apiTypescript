import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../../config/upload';
import Employee from '../../models/Employees';

import AppError from '../../errors/AppError';

interface Request {
  employee_id: string;
  avatarFilename: string;
}

class UpdateAvatar {
  public async execute({ employee_id, avatarFilename }: Request): Promise<Employee> {
    const employeeRepository = getRepository(Employee);

    const employee = await employeeRepository.findOne(employee_id);

    if (!employee) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (employee.avatar) {
      const employeeAvatarFilePath = path.join(uploadConfig.directory, employee.avatar);

      const employeeAvatarFileExists = await fs.promises.stat(employeeAvatarFilePath);

      if (employeeAvatarFileExists) {
        await fs.promises.unlink(employeeAvatarFilePath);
      }
    }

    employee.avatar = avatarFilename;

    await employeeRepository.save(employee);

    return employee;
  }
}

export default UpdateAvatar;
