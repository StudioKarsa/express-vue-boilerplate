import joi from 'joi'
import { createRoutes, HTTP_METHODS } from '../../../utils/http'

export function createPostRoutes({ controller, router }) {
  createRoutes({
    router,
    routes: [
      {
        method: HTTP_METHODS.GET,
        path: '/posts',
        handlers: [controller.getPosts],
      },
      {
        method: HTTP_METHODS.GET,
        path: '/posts/:id',
        handlers: [controller.getPost],
      },
      {
        method: HTTP_METHODS.POST,
        path: '/posts',
        validationSchema: joi.object({
          title: joi.string().required(),
          content: joi.string().required(),
        }),
        handlers: [controller.createPost],
      },
      {
        method: HTTP_METHODS.PUT,
        path: '/posts/:id',
        validationSchema: joi.object({
          title: joi.string().required(),
          content: joi.string().required(),
        }),
        handlers: [controller.updatePost],
      },
      {
        method: HTTP_METHODS.DELETE,
        path: '/posts/:id',
        handlers: [controller.deletePost],
      },
    ],
  })
}
