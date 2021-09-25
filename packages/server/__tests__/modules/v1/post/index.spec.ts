import supertest from 'supertest'
import { HTTP_STATUS } from 'common'

import type { Application } from 'express'
import type { Prisma, Post } from '@prisma/client'

import { createApp } from '../../../../src/app'
import { createMockModuleContext, MockModuleContext } from '../../../mockTypes'

import type { ModuleContext } from '../../../../src/modules/types'

let mockCtx: MockModuleContext
let ctx: ModuleContext
let app: Application
let posts: Post[]

beforeEach(() => {
  mockCtx = createMockModuleContext()
  ctx = mockCtx as unknown as ModuleContext
  app = createApp({ database: ctx.database, logger: ctx.logger })
  posts = [
    {
      id: 1,
      title: 'test',
      content: 'test',
      createdAt: new Date('2021-09-25T09:17:06.422Z'),
      updatedAt: new Date('2021-09-25T09:17:06.422Z'),
    },
  ]
})

describe('POST /v1/post', () => {
  test('should create a new post', async () => {
    // @ts-ignore
    mockCtx.database.post.create.mockResolvedValueOnce(posts[0])

    const newPostPayload = {
      title: posts[0].title,
      content: posts[0].content,
    }

    const response = await supertest(app)
      .post('/v1/posts')
      .send(newPostPayload)
      .expect(HTTP_STATUS.CREATED)

    expect(response.body).toEqual({
      message: 'Post created',
      post: posts.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt.toJSON(),
        updatedAt: post.updatedAt.toJSON(),
      }))[0],
    })
  })

  test('should return an error if title is missing', async () => {
    const newPost: Partial<Prisma.PostCreateInput> = {
      content: 'test',
    }

    const response = await supertest(app)
      .post('/v1/posts')
      .send(newPost)
      .expect(HTTP_STATUS.UNPROCESSABLE_ENTITY)

    expect(response.body).toEqual({
      error: '"title" is required',
    })
  })

  test('should return an error if content is missing', async () => {
    const newPost: Partial<Prisma.PostCreateInput> = {
      title: 'test',
    }

    const response = await supertest(app)
      .post('/v1/posts')
      .send(newPost)
      .expect(HTTP_STATUS.UNPROCESSABLE_ENTITY)

    expect(response.body).toEqual({
      error: '"content" is required',
    })
  })
})

test('GET /v1/posts should return all posts', async () => {
  // @ts-ignore
  mockCtx.database.post.findMany.mockResolvedValueOnce(posts)

  const response = await supertest(app).get('/v1/posts').expect(HTTP_STATUS.OK)

  expect(response.body).toEqual({
    items: posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt.toJSON(),
      updatedAt: post.updatedAt.toJSON(),
    })),
    total: posts.length,
  })
})

describe('GET /v1/posts/:id', () => {
  test('should return a post', async () => {
    // @ts-ignore
    mockCtx.database.post.findUnique.mockResolvedValueOnce(posts[0])

    const response = await supertest(app)
      .get('/v1/posts/1')
      .expect(HTTP_STATUS.OK)

    expect(response.body).toEqual(
      posts.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt.toJSON(),
        updatedAt: post.updatedAt.toJSON(),
      }))[0]
    )
  })

  test('should return an error if post is not found', async () => {
    // @ts-ignore
    mockCtx.database.post.findUnique.mockResolvedValueOnce(null)

    const response = await supertest(app)
      .get('/v1/posts/404')
      .expect(HTTP_STATUS.NOT_FOUND)

    expect(response.body).toEqual({
      message: 'Post not found',
    })
  })
})

describe('PUT /v1/posts/:id', () => {
  test('should update a post', async () => {
    // @ts-ignore
    mockCtx.database.post.findUnique.mockResolvedValueOnce(posts[0])
    // @ts-ignore
    mockCtx.database.post.update.mockResolvedValueOnce(
      posts.map((post) => ({
        id: post.id,
        title: post.title.toUpperCase(),
        content: post.content.toUpperCase(),
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      }))[0]
    )

    const updatedPostPayload = {
      title: posts[0].title.toUpperCase(),
      content: posts[0].content.toUpperCase(),
    }

    const response = await supertest(app)
      .put('/v1/posts/1')
      .send(updatedPostPayload)
      .expect(HTTP_STATUS.OK)

    expect(response.body).toEqual({
      message: 'Post updated',
      post: posts.map((post) => ({
        id: post.id,
        title: post.title.toUpperCase(),
        content: post.content.toUpperCase(),
        createdAt: post.createdAt.toJSON(),
        updatedAt: post.updatedAt.toJSON(),
      }))[0],
    })
  })

  test('should return an error if post is not found', async () => {
    // @ts-ignore
    mockCtx.database.post.findUnique.mockResolvedValueOnce(null)
    // @ts-ignore
    mockCtx.database.post.update.mockResolvedValueOnce(null)

    const updatedPostPayload = {
      title: posts[0].title.toUpperCase(),
      content: posts[0].content.toUpperCase(),
    }

    const response = await supertest(app)
      .put('/v1/posts/404')
      .send(updatedPostPayload)
      .expect(HTTP_STATUS.NOT_FOUND)

    expect(response.body).toEqual({
      message: 'Post not found',
    })
  })
})

describe('DELETE /v1/posts/:id', () => {
  test('should delete a post', async () => {
    // @ts-ignore
    mockCtx.database.post.delete.mockResolvedValueOnce(posts[0])

    const response = await supertest(app)
      .delete('/v1/posts/1')
      .expect(HTTP_STATUS.OK)

    expect(response.body).toEqual({
      message: 'Post deleted',
      post: posts.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt.toJSON(),
        updatedAt: post.updatedAt.toJSON(),
      }))[0],
    })
  })

  test('should return an error if post is not found', async () => {
    // @ts-ignore
    mockCtx.database.post.delete.mockResolvedValueOnce(null)

    const response = await supertest(app)
      .delete('/v1/posts/404')
      .expect(HTTP_STATUS.NOT_FOUND)

    expect(response.body).toEqual({
      message: 'Post not found',
    })
  })
})
