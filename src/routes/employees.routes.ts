import { Router } from 'express';
import multer from 'multer';
import { getRepository, ILike } from 'typeorm';
import uploadConfig from '../config/upload';

import Employee from '../models/Employees';

import CreateService from '../services/Employee/Create';
import DeleteService from '../services/Employee/Delete';
import UpdateActive from '../services/Employee/UpdateActive';
import UpdateAvatarService from '../services/Employee/UpdateAvatar';
import UpdateService from '../services/Employee/Update';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const employeesRouter = Router();
const upload = multer(uploadConfig);

employeesRouter.post('/', ensureAuthenticated, async (request, response) => {
  const {
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
    break_start,
    break_end
  } = request.body;

  const createEmployee = new CreateService();

  const employee = await createEmployee.execute({
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
    break_start,
    break_end
  });

  return response.json(employee);
});

employeesRouter.put('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const {
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
    break_start,
    break_end,
    active,
  } = request.body;

  const activeEmployee = new UpdateService();

  const employee = await activeEmployee.execute({
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
    break_start,
    break_end,
    active,
  });

  return response.json(employee);
});

employeesRouter.put('/active/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const { active } = request.body;

  const activeEmployee = new UpdateActive();

  const employee = await activeEmployee.execute({
    id,
    active,
  });

  return response.json(employee);
});

employeesRouter.put('/avatar/:id', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  const { id } = request.params;
  const UpdateEmployeeAvatar = new UpdateAvatarService();

  const employee = await UpdateEmployeeAvatar.execute({
    employee_id: id,
    avatarFilename: request.file.filename,
  });

  const employeeWithoutPassword = {

  };

  return response.json(employeeWithoutPassword);
},
);

employeesRouter.delete('/delete/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;

  const deleteEmployee = new DeleteService();

  const employee = await deleteEmployee.execute({
    id,
  });

  return response.json({ message: 'Registration successfully deleted' });
});

employeesRouter.get('/all', ensureAuthenticated, async (request, response) => {
  const employeesRepository = getRepository(Employee);
  const employees = await employeesRepository.find();

  return response.json(employees);
});

employeesRouter.get('/filter/name/:name', ensureAuthenticated, async (request, response) => {
  const { name } = request.params;
  const employeesRepository = getRepository(Employee);
  const employees = await employeesRepository.find({ name: ILike(`%${name}%`) });

  return response.json(employees);
});

employeesRouter.get('/filter/code/:code', ensureAuthenticated, async (request, response) => {
  const { code } = request.params;
  const employeeRepository = getRepository(Employee);
  const employee = await employeeRepository.find({ code: ILike(`%${code}%`) });

  return response.json(employee);
});

employeesRouter.get('/filter/email/:email', ensureAuthenticated, async (request, response) => {
  const { email } = request.params;
  const employeesRepository = getRepository(Employee);
  const employees = await employeesRepository.find({ email: ILike(`%${email}%`) });

  return response.json(employees);
});

employeesRouter.get('/filter/cell_phone/:cell_phone', ensureAuthenticated, async (request, response) => {
  const { cell_phone } = request.params;
  const employeesRepository = getRepository(Employee);
  const employees = await employeesRepository.find({ cell_phone: ILike(`%${cell_phone}%`) });

  return response.json(employees);
});

employeesRouter.get('/filter/registration_individuals/:registration_individuals', ensureAuthenticated, async (request, response) => {
  const { registration_individuals } = request.params;
  const employeesRepository = getRepository(Employee);
  const employees = await employeesRepository.find({ registration_individuals: ILike(`%${registration_individuals}%`) });

  return response.json(employees);
});

employeesRouter.get('/filter/identity_document/:identity_document', ensureAuthenticated, async (request, response) => {
  const { identity_document } = request.params;
  const employeesRepository = getRepository(Employee);
  const employees = await employeesRepository.find({ identity_document: ILike(`%${identity_document}%`) });

  return response.json(employees);
});

export default employeesRouter;
