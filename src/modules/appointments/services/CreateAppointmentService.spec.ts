import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository(); // Declaramos primeiro porque o CreateAppointmentService recebe um constructor como parametro que é a interface

    createAppointment = new CreateAppointmentService( // Já colocamos o repositorio de appointment no caso eles recebem a IAppointments
      fakeAppointmentsRepository,
    );
  });

  // it é igual o teste() e significa isso ou isto em inglês
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(),
      user_id: 'user-id',
      provider_id: 'provider-id',
    });

    expect(appointment).toHaveProperty('id'); /// Espero que tenha um id
    expect(appointment.provider_id).toBe('provider-id');
  });

  /**
   * SEGUNDO TESTE
   */

  it('should not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 10).getTime();
    });

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user-id',
      provider_id: 'provider-id',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'user-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // Teste para não permitir agendamentos em data que ja passaram
  it('should not be able to create an appointment on a past date', async () => {
    // Usamos o jest.spyOn para simular algumas coisas
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: 'user-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // Teste que O User_id não pode ser o mesmo que provider id ( Não pode ter agendamento com o mesmo usuario)
  it('should not be able to create an appointment with same user a s provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: 'user-id',
        provider_id: 'user-id', // colocamos aqui user-id para dar erro
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // Não pdoe ter agendamento antes das 8 e nem depois das 17
  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 7),
        user_id: 'user-id',
        provider_id: 'provider-id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 18),
        user_id: 'user-id',
        provider_id: 'provider-id', // colocamos aqui user-id para dar erro
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
