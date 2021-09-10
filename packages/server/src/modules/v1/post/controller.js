import { HTTP_STATUS } from '../../../utils/http'

export function createPostController({ database, store }) {
  /**
   * Get all posts
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  const getPosts = async (req, res) => {
    const posts = await store.all()
    res.status(HTTP_STATUS.OK).json({
      items: posts,
      total: posts.length,
    })
  }

  /**
   * Get a single post
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  const getPost = async (req, res) => {
    const post = await store.find(req.params.id)
    if (!post) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Post not found' })
      return
    }
    res.status(HTTP_STATUS.OK).json(post)
  }

  /**
   * Create a new post
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  const createPost = async (req, res) => {
    const post = await store.create(req.body)
    res.status(HTTP_STATUS.CREATED).json(post)
  }

  /**
   * Update a post
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  const updatePost = async (req, res) => {
    const post = await store.update(req.params.id, req.body)
    if (!post) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Post not found' })
      return
    }
    res.status(HTTP_STATUS.OK).json(post)
  }

  /**
   * Delete a post
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  const deletePost = async (req, res) => {
    const post = await store.remove(req.params.id)
    if (!post) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Post not found' })
      return
    }
    res.status(HTTP_STATUS.OK).json(post)
  }

  return {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
  }
}
