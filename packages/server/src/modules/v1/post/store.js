/**
 * Post store
 *
 * @param {{ database: import('@prisma/client').PrismaClient, logger: import('winston').Logger }} opts
 */
export function createPostStore({ database, logger }) {
  /**
   * @param {number} id
   */
  async function find(id) {
    const post = await database.post.findFirst({ where: { id } }).catch((err) => {
      throw err
    })
    return post
  }

  /**
   * @param {import('@prisma/client').Prisma.PostFindManyArgs} query
   */
  async function all(query = {}) {
    const posts = await database.post.findMany(query).catch((err) => {
      throw err
    })

    return posts
  }

  /**
   * @param {import('@prisma/client').Prisma.PostCreateInput} post
   */
  async function create(post) {
    return database.post.create({ data: post }).catch((err) => {
      throw err
    })
  }

  /**
   * @param {number} id
   * @param {import('@prisma/client').Prisma.PostCreateInput} post
   */
  async function update(id, post) {
    const exists = await database.post.findFirst({ where: { id } }).catch((err) => {
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

  /**
   * @param {number} id
   */
  async function remove(id) {
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
