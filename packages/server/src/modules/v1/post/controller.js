import { HTTP_STATUS } from '../../../utils/http'

export function createPostController({ store, logger }) {
  /**
   * Get all posts
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  const getPosts = async (req, res) => {
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

  /**
   * Get a single post
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  const getPost = async (req, res) => {
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

  /**
   * Create a new post
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  const createPost = async (req, res) => {
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

  /**
   * Update a post
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  const updatePost = async (req, res) => {
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

  /**
   * Delete a post
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  const deletePost = async (req, res) => {
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
