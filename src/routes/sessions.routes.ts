import { Router } from 'express';

import AuthenticateUserService from '../services/Session/AuthenticateUser';
import CheckTokenService from '../services/Session/CheckToken';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

sessionsRouter.post('/checktoken', async (request, response) => {
  const { id, token } = request.body;

  const checkTokenService = new CheckTokenService();

  const res = await checkTokenService.execute({
    id,
    token: token
  });

  return response.json({ res });
});

export default sessionsRouter;
