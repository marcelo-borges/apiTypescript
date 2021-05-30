import { Router } from 'express';
import multer from 'multer';
import { getRepository, ILike } from 'typeorm';
import uploadConfig from '../config/upload';

import User from '../models/User';

import CreateService from '../services/User/Create';
import DeleteService from '../services/User/Delete';
import UpdateActive from '../services/User/UpdateActive';
import UpdateAvatarService from '../services/User/UpdateAvatar';
import UpdatePasswordService from '../services/User/UpdatePassword';
import UpdateService from '../services/User/Update';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/all', async (request, response) => {
  const usersRepository = getRepository(User);
  const users = await usersRepository.find();

  users.map(function (item) {
    delete item.password;
    return item;
  });

  return response.json(users);
});

usersRouter.get('/filter/name/:name', ensureAuthenticated, async (request, response) => {
  const { name } = request.params;
  const usersRepository = getRepository(User);
  const users = await usersRepository.find({ name: ILike(`%${name}%`) });

  users.map(function (item) {
    delete item.password;
    return item;
  });

  return response.json(users);
});

usersRouter.get('/filter/email/:email', ensureAuthenticated, async (request, response) => {
  const { email } = request.params;
  const usersRepository = getRepository(User);
  const users = await usersRepository.find({ email: ILike(`%${email}%`) });

  users.map(function (item) {
    delete item.password;
    return item;
  });

  return response.json(users);
});

usersRouter.get('/filter/cell_phone/:cell_phone', ensureAuthenticated, async (request, response) => {
  const { cell_phone } = request.params;
  const usersRepository = getRepository(User);
  const users = await usersRepository.find({ cell_phone: ILike(`%${cell_phone}%`) });

  users.map(function (item) {
    delete item.password;
    return item;
  });

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { name, email, cell_phone, password, confirm_password, type } = request.body;

  const createUser = new CreateService();
console.log('aqui')
  const user = await createUser.execute({
    name,
    email,
    cell_phone,
    password,
    confirm_password,
    type,
  });

  return response.json(user);
});

usersRouter.delete('/delete/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;

  const deleteUser = new DeleteService();

  const user = await deleteUser.execute({
    id,
  });

  return response.json({ message: 'Registration successfully deleted' });
});

usersRouter.put('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const { name, email, cell_phone, active, type } = request.body;

  const activeUser = new UpdateService();

  const user = await activeUser.execute({
    id,
    name,
    email,
    cell_phone,
    type,
    active,
  });

  return response.json(user);
});

usersRouter.put('/active/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const { active } = request.body;

  const activeUser = new UpdateActive();

  const user = await activeUser.execute({
    id,
    active,
  });

  return response.json(user);
});

usersRouter.put(
  '/avatar/:id',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const { id } = request.params;
    const UpdateUserAvatar = new UpdateAvatarService();

    const user = await UpdateUserAvatar.execute({
      user_id: id,
      avatarFilename: request.file.filename,
    });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userWithoutPassword);
  },
);

usersRouter.put('/password/:id',
  ensureAuthenticated, async (request, response) => {
    const { id } = request.params;
    const { oldPassword, password, comparePassword } = request.body;

    const updatePasswordUser = new UpdatePasswordService();

    const user = await updatePasswordUser.execute({
      id,
      oldPassword,
      password,
      comparePassword,
    });

    return response.json(user);
  });

export default usersRouter;
