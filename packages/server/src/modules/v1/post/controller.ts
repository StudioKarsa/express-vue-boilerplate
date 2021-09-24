import { HTTP_STATUS } from 'common'
import type { RequestHandler } from 'express'

import type { ModuleController, ModuleControllerContext } from '../../types'
import type { PostStore } from './store'

export interface PostController extends ModuleController {
  getPosts: RequestHandler
  getPost: RequestHandler
  createPost: RequestHandler
  updatePost: RequestHandler
  deletePost: RequestHandler
}

export function createPostController({
  store,
  logger,
}: ModuleControllerContext<PostStore>): PostController {

  /** Get all posts */
  const getPosts: RequestHandler = async (req, res) => {
    try {
      const posts = await store.all()

      res.status(HTTP_STATUS.OK).json({
        items: posts,
        total: posts.length,
      })
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        error,
        message: 'Internal server error',
      })
    }
  }

  /** Get a single post */
  const getPost: RequestHandler = async (req, res) => {
    try {
      const post = await store.find(Number(req.params.id))
      if (!post) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Post not found' })
        return
      }

      res.status(HTTP_STATUS.OK).json(post)
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        error,
        message: 'Internal server error',
      })
    }
  }

  /** Create a new post */
  const createPost: RequestHandler = async (req, res) => {
    try {
      const post = await store.create(req.body)

      res.status(HTTP_STATUS.CREATED).json({
        message: 'Post created',
        post,
      })
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        error,
        message: 'Internal server error',
      })
    }
  }

  /** Update a post */
  const updatePost: RequestHandler = async (req, res) => {
    try {
      const post = await store.update(Number(req.params.id), req.body)
      if (!post) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Post not found' })
        return
      }

      res.status(HTTP_STATUS.OK).json({
        message: 'Post updated',
        post,
      })
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        error,
        message: 'Internal server error',
      })
    }
  }

  /** Delete a post */
  const deletePost: RequestHandler = async (req, res) => {
    try {
      const post = await store.remove(Number(req.params.id))
      if (!post) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Post not found' })
        return
      }

      res.status(HTTP_STATUS.OK).json({
        message: 'Post deleted',
        post,
      })
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        error,
        message: 'Internal server error',
      })
    }
  }

  return {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
  }
}
