import type { Prisma, Post } from '@prisma/client'
import type { ModuleStoreContext } from '../../types'

export interface PostStore {
  find: (id: number) => Promise<Post | null>
  all: (query?: Prisma.PostFindManyArgs) => Promise<Post[]>
  create: (post: Post) => Promise<Post>
  update: (id: number, post: Post) => Promise<Post | null>
  remove: (id: number) => Promise<Post | null>
}

/** Post store */
export function createPostStore({
  database,
  logger,
}: ModuleStoreContext): PostStore {
  async function find(id: number) {
    const post = await database.post
      .findUnique({ where: { id } })
      .catch((err) => {
        throw err
      })
    return post
  }

  async function all(query: Prisma.PostFindManyArgs = {}) {
    const posts = await database.post.findMany(query).catch((err) => {
      throw err
    })

    return posts
  }

  async function create(post: Post) {
    return database.post.create({ data: post }).catch((err) => {
      throw err
    })
  }

  async function update(id: number, post: Post) {
    const exists = await database.post
      .findFirst({ where: { id } })
      .catch((err) => {
        throw err
      })

    if (!exists) {
      return null
    }

    return database.post
      .update({
        where: {
          id,
        },
        data: post,
      })
      .catch((err) => {
        throw err
      })
  }

  async function remove(id: number) {
    return database.post.delete({ where: { id } }).catch((err) => {
      throw err
    })
  }

  return {
    find,
    all,
    create,
    update,
    remove,
  }
}
