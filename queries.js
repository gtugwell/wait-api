const Pool = require('pg').Pool
const pool = new Pool({
  user: 'wait_login',
  host: 'wait-db.cv3iclekihw6.us-east-2.rds.amazonaws.com',
  database: 'postgres',
  password: 'Waitforme',
  port: 5432,
})


const getUsers = (request, response) => {
  const dest = request.params.dest
    pool.query('SELECT * FROM public.user_messages WHERE dest = $1',[dest], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

// const createUser = (request, response) => {
//     const { name, email } = request.body

//     pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
//         if (error) {
//         throw error
//         }
//         response.status(201).send(`User added with ID: ${result.insertId}`)
//     })
// }

// const deleteUser = (request, response) => {
//     const id = parseInt(request.params.id)
  
//     pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).send(`User deleted with ID: ${id}`)
//     })
// }


module.exports = {
    getUsers,
    // getUserById,
    // createUser,
    // updateUser,
    // deleteUser,
  }