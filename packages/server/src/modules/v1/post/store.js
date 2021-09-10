export const POST_TABLE_NAME = 'posts'
export const POST_TABLE_COLUMNS = [
  'id',
  'title',
  'content',
  'createdAt',
  'updatedAt',
]

/**
 * Post store
 *
 * @param {{ database: import('mysql2/promise').Pool }} database
 */
export function createPostStore({ database }) {
  async function find(id) {
    const [result] = await database.execute(
      `SELECT ${POST_TABLE_COLUMNS.join(
        ','
      )} FROM ${POST_TABLE_NAME} WHERE id = ?`,
      [id]
    )

    return result
  }

  async function all() {
    const [result] = await database.query(
      `SELECT ${POST_TABLE_COLUMNS.join(',')} FROM ${POST_TABLE_NAME}`
    )

    return result
  }

  async function where(query) {
    const [result] = await database.query(
      `SELECT ${POST_TABLE_COLUMNS.join(
        ','
      )} FROM ${POST_TABLE_NAME} WHERE ${query}`
    )

    return result
  }

  async function create(post) {
    const [result] = await database.execute(
      `INSERT INTO ${POST_TABLE_NAME} SET ?`,
      post
    )

    return result
  }

  async function update(id, post) {
    const [result] = await database.execute(
      `UPDATE ${POST_TABLE_NAME} SET ? WHERE id = ?`,
      [post, id]
    )

    return result
  }

  async function remove(id) {
    const [result] = await database.execute(
      `DELETE FROM ${POST_TABLE_NAME} WHERE id = ?`,
      [id]
    )

    return result
  }

  return {
    find,
    all,
    where,
    create,
    update,
    remove,
  }
}
