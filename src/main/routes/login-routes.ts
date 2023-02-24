import { Router } from 'express'
import { adapterRoute } from '../adapters/express/express-route-adapter'
import { MakeSignUpController } from '../factories/controllers/signup/signup-controller-factory'
import { makeLoginController } from '../factories/controllers/login/login-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adapterRoute(MakeSignUpController()))
  router.post('/login', adapterRoute(makeLoginController()))
}
