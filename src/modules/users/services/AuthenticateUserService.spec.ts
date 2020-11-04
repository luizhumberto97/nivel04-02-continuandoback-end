import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
     fakeHashProvider = new FakeHashProvider();

     createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

     authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {


    // Criando o usuario
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    // AUthenticando o ousuario
    const response = await authenticateUser.execute({
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token'); // Verificar se o usuario já tem o id
    expect(response.user).toEqual(user);
  });

  /**
   * SEGUNDO TESTE -> Não authenticar -> Usuario que não tem conta ( Não existe)
   */

  it('should not be able to authenticate with non existing user', async () => {

    await expect(
      authenticateUser.execute({
        email: 'jonhdoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  /**
   * TERCEIRO TESTE -> NÃO AUTENTICAR USUARIO COM SENHA ERRADA
   */
  it('should be able to authenticate', async () => {


    // Criando o usuario
    await createUser.execute({
      name: 'John Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

   await expect(
      authenticateUser.execute({
        email: 'jonhdoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
