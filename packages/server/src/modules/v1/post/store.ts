import type { Prisma, Post } from '@prisma/client'
import type { ModuleStoreContext } from '../../types'

/** Post store */
export function createPostStore({ database, logger }: ModuleStoreContext) {
  async function find(id: number) {
    return database.post.findUnique({ where: { id } }).catch((err) => {
      throw err
    })
  }

  async function all(query: Prisma.PostFindManyArgs = {}) {
    return database.post.findMany(query).catch((err) => {
      throw err
    })
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

export type PostStore = ReturnType<typeof createPostStore>
