import { Express, Router } from 'express'
// metodo nativo que le um diretório de forma assincrona
import { readdirSync } from 'fs'
import { join } from 'path'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  // apartir do arquivo atual volta até o diretório routes e a partir do
  // diretório routes para cada arquivo que ele encontrar que não contenha
  // .test. faça o build para a dist

  readdirSync(join(__dirname, '../routes')).map(async file => {
    if (!file.endsWith('.map')) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}
