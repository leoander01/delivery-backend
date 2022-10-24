import { Router } from 'express';
import { AuthenticateClientController } from './modules/accounts/authenticateClient/AuthenticateClientController';
import { AuthenticateDeliverymanController } from './modules/accounts/authenticateDeliveryman/AuthenticateDeliverymanController';
import { CreateClientController } from './modules/clients/usecases/createClient/CreateClientController';
import { CreateDeliverymanController } from './modules/deliveryman/usecases/create-deliveryman/CreateDeliverymanController';
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { FindAllAvailableController } from './modules/deliveries/useCases/findAllAvailable/FindAllAvailableController';
import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient';
import { ensureAuthenticateDeliveryman } from './middlewares/ensureAuthenticateDeliveryman';

const routes = Router()

const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const createDeliverymanController = new CreateDeliverymanController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()

const deliveryController = new CreateDeliveryController()
const findAllAvailableController = new FindAllAvailableController()

routes.post('/client/authenticate', authenticateClientController.handle)
routes.post('/deliveryman/authenticate', authenticateDeliverymanController.handle)

routes.post('/client/', createClientController.handle)
routes.post('/deliveryman/', createDeliverymanController.handle)

routes.post('/delivery/', ensureAuthenticateClient, deliveryController.handle)
routes.get('/delivery/available', ensureAuthenticateDeliveryman, findAllAvailableController.handle)

export { routes }