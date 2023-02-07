import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'

// fake database
const database = new Database()

/**
 * Query Parameters: URL Stateful => filtros, paginação, não-obrigatórios. /users?name=Alexandre&
 * Route Parameters: Identificação de recurso. /users/1
 * Request Body: (HTTPS) Envio de informações em um formulário
 */

export const routes = [
  {
    method: buildRoutePath('GET'),
    path: '/users',
    handler: (req, res) => {
      const users = database.select('users')

      return res.end(JSON.stringify(users));
    }
  },
  {
    method: buildRoutePath('POST'),
    path: '/users',
    handler: (req, res) => {
      const { name, email } = req.body

      const user = {
        id: randomUUID(),
        name,
        email
      }

      database.insert('users', user)

      return res.writeHead(201).end();
    }
  },
  {
    method: buildRoutePath('DELETE'),
    path: '/users/:id',
    handle: (req, res) => {
      const { id } = req.params

      database.delete('users', id)

      return res.writeHead(204).end()
    }
  }
]
