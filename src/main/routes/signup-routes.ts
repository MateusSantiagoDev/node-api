import { Router } from 'express'
import { adapter } from '../adapter/express-route-adapter'
import { MakeSignUpController } from '../factories/signup'

export default (router: Router): void => {
  router.post('/signup', adapter(MakeSignUpController()))
}
