export const POST_TABLE_NAME = 'posts'
export const POST_TABLE_COLUMNS = [
  'id',
  'title',
  'content',
  'created_at',
  'updated_at',
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
    await database.execute(
      `INSERT INTO ${POST_TABLE_NAME} (title, content, created_at, updated_at)
      VALUES (?, ?, ?, ?)`,
      [post.title, post.content, new Date(), new Date()]
    )
  }

  async function update(id, post) {
    const [result] = await database.execute(
      `UPDATE ${POST_TABLE_NAME} SET title = ?, content = ?, updated_at = ? WHERE id = ?`,
      [post.title, post.content, new Date(), id]
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
