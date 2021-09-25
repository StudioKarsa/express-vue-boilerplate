import supertest from 'supertest'
import { HTTP_STATUS } from 'common'
import { createApp } from '../src/app'

import type { Application } from 'express'
import type { ModuleContext } from '../src/modules/types'
import { createMockModuleContext, MockModuleContext } from './mockTypes'

let mockCtx: MockModuleContext
let ctx: ModuleContext
let app: Application

beforeEach(() => {
  mockCtx = createMockModuleContext()
  ctx = mockCtx as unknown as ModuleContext
  app = createApp({ database: ctx.database, logger: ctx.logger })
})

test('GET /health should return status ok', async () => {
  const response = await supertest(app).get('/health').expect(HTTP_STATUS.OK)

  expect(response.body).toEqual({
    status: 'ok',
  })
})

test('GET /404-page should return status 404', async () => {
  const response = await supertest(app)
    .get('/404-page')
    .expect(HTTP_STATUS.NOT_FOUND)

  expect(response.body).toEqual({
    message: 'Not found',
  })
})
