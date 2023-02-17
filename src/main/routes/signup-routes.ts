import { Router } from 'express'
import { adapterRoute } from '../adapter/express-route-adapter'
import { MakeSignUpController } from '../factories/signup'

export default (router: Router): void => {
  router.post('/signup', adapterRoute(MakeSignUpController()))
}
