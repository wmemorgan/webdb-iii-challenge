const knex = require('knex')
const dbConfig = require('./knexfile')

const db = knex(dbConfig.development)

module.exports = {
  find,
  findById,
  insert,
  update,
  remove
}

function find(table) {
  return db(table)
}

function findById(id, table) {
  return db(table)
    .where({ id: Number(id) })
    .first()
    .then(record => record)
}

function insert(data, table) {
  return db(table)
    .insert(data, 'id')
    .then(ids => {
      return db(table)
        .where({ id: ids[0] })
        .first()
        .then(record => record)
    })
}

function update(id, data, table) {
  return db(table)
    .where({ id })
    .update(data)
    .then(count => {
      if (count > 0) {
        return db(table)
          .where({ id })
          .first()
          .then(record => record)
      }
    })
}

function remove(id, table) {
  return db(table)
    .where({ id })
    .del()
    .then(count => {
      if (count > 0) {
        return { message: `${count} ${count > 1 ? 
          'records' : 'record'} deleted` }
      }
    })
}