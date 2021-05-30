import { Router } from 'express';
import { getRepository, Raw } from 'typeorm';

import ServicePrice from '../models/ServicePrice';

import CreateService from '../services/ServicePrice/Create';
import DeleteService from '../services/ServicePrice/Delete';
import UpdateActive from '../services/ServicePrice/UpdateActive';
import UpdateService from '../services/ServicePrice/Update';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const servicePriceRouter = Router();

servicePriceRouter.post('/', ensureAuthenticated, async (request, response) => {
  const {
    id_company,
    start_date,
    end_date,
    value
  } = request.body;

  const createServicePrice = new CreateService();

  const servicePrice = await createServicePrice.execute({
    id_company,
    start_date: new Date(start_date),
    end_date: new Date(end_date),
    value: Number(value),
  });

  return response.json(servicePrice);
});

servicePriceRouter.put('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const {
    id_company,
    start_date,
    end_date,
    value,
    active
  } = request.body;

  const activeServicePrice = new UpdateService();

  const servicePrice = await activeServicePrice.execute({
    id,
    id_company,
    start_date: new Date(start_date),
    end_date: new Date(end_date),
    value: Number(value),
    active
  });

  return response.json(servicePrice);
});

servicePriceRouter.put('/active/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const { active } = request.body;

  const activeServicePrice = new UpdateActive();

  const servicePrice = await activeServicePrice.execute({
    id,
    active,
  });

  return response.json(servicePrice);
});

servicePriceRouter.delete('/delete/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;

  const deleteServicePrice = new DeleteService();

  await deleteServicePrice.execute({
    id,
  });

  return response.json({ message: 'Registration successfully deleted' });
});

servicePriceRouter.get('/all', ensureAuthenticated, async (request, response) => {
  const ServicePriceRepository = getRepository(ServicePrice);
  const servicePrice = await ServicePriceRepository.find({
    order: {
      start_date: "DESC"
    }
  });

  return response.json(servicePrice);
});

servicePriceRouter.get('/filter/start_date', ensureAuthenticated, async (request, response) => {
  const { start_date } = request.body;
  const ServicePriceRepository = getRepository(ServicePrice);
  const dateSearch = new Date(start_date);
  const servicePrice = await ServicePriceRepository.find({
    where: {
      start_date: Raw(alias => `${alias} >= '${dateSearch.toLocaleDateString()}'`),
    },
    order: {
      start_date: "DESC"
    }
  });

  return response.json(servicePrice);
});

export default servicePriceRouter;
