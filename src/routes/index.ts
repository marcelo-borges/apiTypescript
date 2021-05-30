import { Router } from 'express';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import employeeRouter from './employees.routes';
import companiesRouter from './companies.routes';
import companyemployeeRouter from './companyemployee.routes';
import serviceRouter from './services.routes';
import servicePriceRouter from './serviceprice.routes';
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/api/users', usersRouter);
routes.use('/api/sessions', sessionsRouter);
routes.use('/api/employees', employeeRouter);
routes.use('/api/companies', companiesRouter);
routes.use('/api/companyemployee', companyemployeeRouter);
routes.use('/api/services', serviceRouter);
routes.use('/api/serviceprice', servicePriceRouter);
routes.use('/api/appointments', appointmentsRouter);

export default routes;
