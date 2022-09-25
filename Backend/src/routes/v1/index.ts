import * as express from 'express';
import { productRoute } from './ProductRoute';
import * as Debug from 'debug';
import { UserRoute } from './UserRoute';
import { AuthRoute } from './AuthRoute';
import { authenticate } from '../../middleware/authorization';

const debug = Debug('NT:router');
const router: express.Router = express.Router();

router.use('/auth', AuthRoute);
router.use('/user', authenticate, UserRoute);
router.use('/product', authenticate, productRoute);

export {router};