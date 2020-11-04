FUNCIONALIDADES MACRO

# Recuperação de Senha

**RF(Requisito funcional)** Requisito funcional;

- O Usuario deve poder recuperar sua senha informando o seu e-mail;
- O Usuario deve recbeer um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF(Requisito Não Funcional)** Requisito Não Funcional: não tme nada a ver com regra de negocio;

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar AMazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);




**RN (Regra De Negócio)**

- O link enviado por email para resetar senha, deve experiar em 2h;
- O usuario precisa confirmar a nova senha senha ao resetar sua senha;
-


# Atualização do perfil
**RF(Requisito funcional)** Requisito funcional;

- O Usuario deve poder atualizar seu nome, email e senha;

**RNF(Requisito Não Funcional)** Requisito Não Funcional: não tme nada a ver com regra de ;negocio;

- Não tem;


**RN (Regra De Negócio)**

- O usuario não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuario precisa confirmar a nova senha;



# Painel do Prestador
**RF(Requisito funcional)** Requisito funcional;

- O usuário deve poder listar seus agendamentos em um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;


**RNF(Requisito Não Funcional)** Requisito Não Funcional: não tme nada a ver com regra de negocio;

- Os agendamentos do rpestado rno dia devem ser armazenadas em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- AS notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;


**RN (Regra De Negócio)**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;



# Agendamento de serviços
**RF(Requisito funcional)** Requisito funcional;

- O usuário deve poder listar todos prestadores de serviços cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O Usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuario deve poder realizar um novo agendamento com um prestador;


**RNF(Requisito Não Funcional)** Requisito Não Funcional: não tme nada a ver com regra de negocio;

- A listagem de prestadores deve ser armazenada em cache;
-


**RN (Regra De Negócio)**

- Cada agendamento vai durar 1 hora exatamente;
- Os agendamentos devem estar disponíveis entre 8h as 18H (Primeiro ás 8H, último as 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O Usuário não pode agendar serviços consigo mesmo;



