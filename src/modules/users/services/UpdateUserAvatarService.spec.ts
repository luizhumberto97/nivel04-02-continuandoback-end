import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {

  beforeEach(() => {
     fakeUsersRepository = new FakeUsersRepository(); // Declaramos primeiro porque o CreateAppointmentService recebe um constructor como parametro que é a interface
     fakeStorageProvider = new FakeStorageProvider();

     updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  // it é igual o teste() e significa isso ou isto em inglês
  it('should be able to create a new user', async () => {


    // Criamos usuario usando o fakeUsersRepository create
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg'); // Verificsar se o usuario já tem o id
  });

  /**
   * SEGUNDO TESTE que é verificar o se o usuario não existe e o
   */

  it('should not be able to update avatar from non existing user', async () => {

   await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError); // Verificsar se o usuario já tem o id
  });

  /**
   * TERCEIRO TESTE ->  quando já tem um avatar, deletar um avatar antigo quando estiver atualizando um novo
   *
   */

  it('should delete old avatar when updating new one', async () => {


    // UTILIZANDO O método espionar para retornar a função que quer espionar
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    // Criamos usuario usando o fakeUsersRepository create
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg'); // a função sendo chamada por um paramêtro especifico

    expect(user.avatar).toBe('avatar2.jpg'); // Esse é o avatar novo
  });
});
