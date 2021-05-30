import { Router } from 'express';
import { getRepository, ILike } from 'typeorm';

import Appointments from '../models/Appointments';

import CreateService from '../services/Appointments/Create';
import DeleteService from '../services/Appointments/Delete';
import UpdateActive from '../services/Appointments/UpdateActive';
import UpdateService from '../services/Appointments/Update';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.post('/', ensureAuthenticated, async (request, response) => {
  const {

  } = request.body;

  const createAppointments = new CreateService();

  const appointment = await createAppointments.execute({

  });

  return response.json(appointment);
});

appointmentsRouter.put('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const {

  } = request.body;

  const activeAppointments = new UpdateService();

  const appointment = await activeAppointments.execute({

  });

  return response.json(appointment);
});

appointmentsRouter.put('/active/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const { active } = request.body;

  const activeAppointments = new UpdateActive();

  const appointment = await activeAppointments.execute({
    id,
    active,
  });

  return response.json(appointment);
});

appointmentsRouter.delete('/delete/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;

  const deleteAppointments = new DeleteService();

  await deleteAppointments.execute({
    id,
  });

  return response.json({ message: 'Registration successfully deleted' });
});

appointmentsRouter.get('/all', ensureAuthenticated, async (request, response) => {
  const AppointmentsRepository = getRepository(Appointments);
  const appointments = await AppointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.get('/filter/name/:name', ensureAuthenticated, async (request, response) => {
  const { name } = request.params;
  const AppointmentsRepository = getRepository(Appointments);
  const appointments = await AppointmentsRepository.find({ name: ILike(`%${name}%`) });

  return response.json(appointments);
});

appointmentsRouter.get('/filter/code/:code', ensureAuthenticated, async (request, response) => {
  const { code } = request.params;
  const AppointmentsRepository = getRepository(Appointments);
  const appointments = await AppointmentsRepository.find({ code: ILike(`%${code}%`) });

  return response.json(appointments);
});

export default appointmentsRouter;
