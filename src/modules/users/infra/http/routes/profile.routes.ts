import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

// importar o middleware que certific que o usuario está autenticado
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
