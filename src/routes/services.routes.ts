import { Router } from 'express';
import { getRepository, ILike } from 'typeorm';

import Services from '../models/Services';

import CreateService from '../services/Services/Create';
import DeleteService from '../services/Services/Delete';
import UpdateActive from '../services/Services/UpdateActive';
import UpdateService from '../services/Services/Update';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const servicesRouter = Router();

servicesRouter.post('/', ensureAuthenticated, async (request, response) => {
  const {
    code,
    description,
    note
  } = request.body;

  const createServices = new CreateService();

  const service = await createServices.execute({
    code,
    description,
    note
  });

  return response.json(service);
});

servicesRouter.put('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const {
    code,
    description,
    note,
    active
  } = request.body;

  const activeServices = new UpdateService();

  const service = await activeServices.execute({
    id,
    code,
    description,
    note,
    active
  });

  return response.json(service);
});

servicesRouter.put('/active/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const { active } = request.body;

  const activeServices = new UpdateActive();

  const service = await activeServices.execute({
    id,
    active,
  });

  return response.json(service);
});

servicesRouter.delete('/delete/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;

  const deleteServices = new DeleteService();

  await deleteServices.execute({
    id,
  });

  return response.json({ message: 'Registration successfully deleted' });
});

servicesRouter.get('/all', ensureAuthenticated, async (request, response) => {
  const ServicesRepository = getRepository(Services);
  const services = await ServicesRepository.find();

  return response.json(services);
});

servicesRouter.get('/filter/description/:description', ensureAuthenticated, async (request, response) => {
  const { description } = request.params;
  const ServicesRepository = getRepository(Services);
  const services = await ServicesRepository.find({ description: ILike(`%${description}%`) });

  return response.json(services);
});

servicesRouter.get('/filter/code/:code', ensureAuthenticated, async (request, response) => {
  const { code } = request.params;
  const ServicesRepository = getRepository(Services);
  const services = await ServicesRepository.find({ code: ILike(`%${code}%`) });

  return response.json(services);
});

export default servicesRouter;
