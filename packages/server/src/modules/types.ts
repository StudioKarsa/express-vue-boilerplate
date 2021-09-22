import type { RequestHandler, Router } from 'express'
import type { PrismaClient } from '@prisma/client'
import type { Logger } from 'winston'

export type ModuleContext = {
  router: Router
  database: PrismaClient
  logger: Logger
}

export type ModuleStoreContext = Omit<ModuleContext, 'router'>

export type ModuleControllerContext<Store> = Omit<
  ModuleContext,
  'router' | 'database'
> & {
  store: Store
}

export type ModuleController = {
  [key: string]: RequestHandler
}

export type ModuleRoutesContext<Controller> = Omit<
  ModuleContext,
  'logger' | 'database'
> & {
  controller: Controller & ModuleController
}
