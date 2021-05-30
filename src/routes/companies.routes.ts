import { Router } from 'express';
import { getRepository, ILike } from 'typeorm';

import Companies from '../models/Companies';

import CreateService from '../services/Companies/Create';
import DeleteService from '../services/Companies/Delete';
import UpdateActive from '../services/Companies/UpdateActive';
import UpdateService from '../services/Companies/Update';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const companiesRouter = Router();

companiesRouter.post('/', ensureAuthenticated, async (request, response) => {
  const {
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
  } = request.body;

  const createCompanies = new CreateService();

  const company = await createCompanies.execute({
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
  });

  return response.json(company);
});

companiesRouter.put('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const {
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
    active
  } = request.body;

  const activeCompanies = new UpdateService();

  const company = await activeCompanies.execute({
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
    active
  });

  return response.json(company);
});

companiesRouter.put('/active/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const { active } = request.body;

  const activeCompanies = new UpdateActive();

  const company = await activeCompanies.execute({
    id,
    active,
  });

  return response.json(company);
});

companiesRouter.delete('/delete/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;

  const deleteCompanies = new DeleteService();

  await deleteCompanies.execute({
    id,
  });

  return response.json({ message: 'Registration successfully deleted' });
});

companiesRouter.get('/all', ensureAuthenticated, async (request, response) => {
  const CompaniesRepository = getRepository(Companies);
  const companies = await CompaniesRepository.find();

  return response.json(companies);
});

companiesRouter.get('/filter/name/:name', ensureAuthenticated, async (request, response) => {
  const { name } = request.params;
  const CompaniesRepository = getRepository(Companies);
  const companies = await CompaniesRepository.find({ name: ILike(`%${name}%`) });

  return response.json(companies);
});

companiesRouter.get('/filter/code/:code', ensureAuthenticated, async (request, response) => {
  const { code } = request.params;
  const CompaniesRepository = getRepository(Companies);
  const companies = await CompaniesRepository.find({ code: ILike(`%${code}%`) });

  return response.json(companies);
});

export default companiesRouter;
