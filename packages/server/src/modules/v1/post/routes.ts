import joi from 'joi'
import { HTTP_METHODS } from 'common'

import { createRoutes } from '../../../utils/router'

import type { ModuleRoutesContext } from '../../types'
import type { PostController } from './controller'

export function createPostRoutes({
  controller,
  router,
}: ModuleRoutesContext<PostController>) {
  createRoutes({
    router,
    routes: [
      {
        method: HTTP_METHODS.GET,
        path: '/posts',
        handler: controller.getPosts,
      },
      {
        method: HTTP_METHODS.GET,
        path: '/posts/:id',
        handler: controller.getPost,
      },
      {
        method: HTTP_METHODS.POST,
        path: '/posts',
        validationSchema: joi.object({
          title: joi.string().required(),
          content: joi.string().required(),
        }),
        handler: controller.createPost,
      },
      {
        method: HTTP_METHODS.PUT,
        path: '/posts/:id',
        validationSchema: joi.object({
          title: joi.string().required(),
          content: joi.string().required(),
        }),
        handler: controller.updatePost,
      },
      {
        method: HTTP_METHODS.DELETE,
        path: '/posts/:id',
        handler: controller.deletePost,
      },
    ],
  })
}
