import { getRepository } from 'typeorm';

import Employee from '../../models/Employees';

import AppError from '../../errors/AppError';

interface Request {
  id: string;
  active: boolean;
}

class UpdateActive {
  public async execute({ id, active }: Request): Promise<Employee> {
    const employeeRepository = getRepository(Employee);

    const employee = await employeeRepository.findOne(id);

    if (!employee) {
      throw new AppError('This Employee does not exist.', 401);
    }

    if (employee.active != active) {
      employee.active = active;

      await employeeRepository.save(employee);
    }

    return employee;
  }
}

export default UpdateActive;
