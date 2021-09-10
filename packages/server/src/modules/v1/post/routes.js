import joi from 'joi'
import { createRoutes } from '../../../utils/http'

export function createPostRoutes({ controller, router }) {
  createRoutes({
    router,
    routes: [
      {
        method: 'GET',
        path: '/posts',
        handlers: [controller.getPosts],
      },
      {
        method: 'GET',
        path: '/posts/:id',
        handlers: [controller.getPost],
      },
      {
        method: 'POST',
        path: '/posts',
        validationSchema: joi.object({
          title: joi.string().required(),
          content: joi.string().required(),
        }),
        handlers: [controller.createPost],
      },
      {
        method: 'PUT',
        path: '/posts/:id',
        validationSchema: joi.object({
          title: joi.string().required(),
          content: joi.string().required(),
        }),
        handlers: [controller.updatePost],
      },
      {
        method: 'DELETE',
        path: '/posts/:id',
        handlers: [controller.deletePost],
      },
    ],
  })
}
