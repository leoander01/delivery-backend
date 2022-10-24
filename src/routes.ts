import { Router } from 'express';
import { AuthenticateClientController } from './modules/accounts/authenticateClient/AuthenticateClientController';
import { AuthenticateDeliverymanController } from './modules/accounts/authenticateDeliveryman/AuthenticateDeliverymanController';
import { CreateClientController } from './modules/clients/usecases/createClient/CreateClientController';
import { CreateDeliverymanController } from './modules/deliveryman/usecases/create-deliveryman/CreateDeliverymanController';
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { FindAllAvailableController } from './modules/deliveries/useCases/findAllAvailable/FindAllAvailableController';
import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient';
import { ensureAuthenticateDeliveryman } from './middlewares/ensureAuthenticateDeliveryman';
import { UpdateDeliverymanController } from './modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymController';
import { FindAllDeliveriesController } from './modules/clients/usecases/deliveries/FindAllDeliveriesController';
import { FindAllDeliveriesDeliverymanController } from './modules/deliveryman/usecases/findAllDeliveries/FindAllDeliveriesController';
import { UpdateEndDateController } from './modules/deliveries/useCases/updateEndDate/UpdateEndDateController';

const routes = Router()

const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const createDeliverymanController = new CreateDeliverymanController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()

const deliveryController = new CreateDeliveryController()
const findAllAvailableController = new FindAllAvailableController()
const updateDeliverymanController = new UpdateDeliverymanController()

const findAllDeliveriesClient = new FindAllDeliveriesController()
const findAllDeliveriesDeliveryman = new FindAllDeliveriesDeliverymanController()

const updateEndDateController = new UpdateEndDateController()

routes.post('/client/authenticate', authenticateClientController.handle)
routes.post('/deliveryman/authenticate', authenticateDeliverymanController.handle)

routes.post('/client/', createClientController.handle)
routes.post('/deliveryman/', createDeliverymanController.handle)

routes.post('/delivery/', ensureAuthenticateClient, deliveryController.handle)
routes.get('/delivery/available', ensureAuthenticateDeliveryman, findAllAvailableController.handle)
routes.put('/deliveryman/update/:id', ensureAuthenticateDeliveryman, updateDeliverymanController.handle)

routes.get('/client/deliveries', ensureAuthenticateClient, findAllDeliveriesClient.handle)
routes.get('/deliveryman/deliveries', ensureAuthenticateDeliveryman, findAllDeliveriesDeliveryman.handle)

routes.put('/delivery/update/:id', ensureAuthenticateDeliveryman, updateEndDateController.handle)

export { routes }