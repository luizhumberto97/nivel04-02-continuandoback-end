import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
     fakeUsersRepository = new FakeUsersRepository(); // Declaramos primeiro porque o CreateAppointmentService recebe um constructor como parametro que é a interface

     fakeHashProvider = new FakeHashProvider();

     createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  // it é igual o teste() e significa isso ou isto em inglês
  it('should be able to create a new user', async () => {


    const user = await createUser.execute({
      name: 'John Doe',
      email: 'Jonhdoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id'); // Verificsar se o usuario já tem o id
  });

  /**
   * SEGUNDO TESTE que é verificar o se tem usuario com email repetido
   */

  it('should not be able to create a new user with same email from another', async () => {

    await createUser.execute({
      name: 'John Doe',
      email: 'Jonhdoe@example.com',
      password: '123456',
    });

   await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'Jonhdoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError); // Verificsar se o usuario já tem o id
  });
});
