// Responsável pela criação do agendamento
import { startOfHour, isBefore, getHours } from 'date-fns';

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

/**
 * [x] Recebimento das informações
 * [/] Tratativas de erros/excessões
 * [x] Acesso ao Repositório
 */

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

/**
 * Dependency Inversion (SOLID)
 */

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You can create an appointment on a past date.');
    }

    if (user_id === provider_id) {
      throw new AppError('You can create an appointment with yourself.');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You can only create appointment between 8am and 5pm ',
      );
    }

    // Verificação de agendamento
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    // Se teve o mesmo horário
    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id, // id do usuario que vai fazer o serviço
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
