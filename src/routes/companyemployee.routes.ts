import { Router } from 'express';
import { getRepository, ILike } from 'typeorm';

import CompanyEmployee from '../models/CompanyEmployee';

import CreateService from '../services/CompaniesEmployees/Create';
import DeleteService from '../services/CompaniesEmployees/Delete';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const companyEmployeeRouter = Router();

companyEmployeeRouter.post('/', ensureAuthenticated, async (request, response) => {
  const {
    id_company,
    id_employee
  } = request.body;

  const createCompanyEmployee = new CreateService();

  const companyEmployee = await createCompanyEmployee.execute({
    id_company,
    id_employee
  });

  return response.json(companyEmployee);
});

companyEmployeeRouter.delete('/delete', ensureAuthenticated, async (request, response) => {
  const {
    id_company,
    id_employee
  } = request.body;

  const deleteCompanyEmployee = new DeleteService();

  await deleteCompanyEmployee.execute({
    id_company,
    id_employee
  });

  return response.json({ message: 'Registration successfully deleted' });
});

companyEmployeeRouter.get('/all', ensureAuthenticated, async (request, response) => {

  const companyEmployeeRepository = getRepository(CompanyEmployee);
  const companyEmployee = await companyEmployeeRepository.find();

  return response.json(companyEmployee);
});

companyEmployeeRouter.get('/filter/id_company/:id_company/id_employee/:id_employee', ensureAuthenticated, async (request, response) => {
  const { id_company, id_employee } = request.params;
  const companyEmployeeRepository = getRepository(CompanyEmployee);
  const companyEmployee = await companyEmployeeRepository.find({
    where: {
      id_company,
      id_employee
    }
  });

  return response.json(companyEmployee);
});

export default companyEmployeeRouter;
