// @ts-nocheck
import type { Router } from 'express'
import type { PrismaClient } from '@prisma/client'
import type { Logger } from 'winston'

import { mockDeep } from 'jest-mock-extended'
import type { DeepMockProxy } from 'jest-mock-extended/lib/cjs/Mock'

export type MockModuleContext = {
  router: DeepMockProxy<Router>
  database: DeepMockProxy<PrismaClient>
  logger: DeepMockProxy<Logger>
}

export function createMockModuleContext(): MockModuleContext {
  return {
    router: mockDeep<Router>(),
    database: mockDeep<PrismaClient>(),
    logger: mockDeep<Logger>(),
  }
}
