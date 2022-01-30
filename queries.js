const Pool = require('pg').Pool
const pool = new Pool({
  user: 'wait_login',
  host: 'wait-db.cv3iclekihw6.us-east-2.rds.amazonaws.com',
  database: 'postgres',
  password: 'Waitforme',
  port: 5432,
})


const getDestination = (request, response) => {
  const dest = request.params.dest
    pool.query('SELECT * FROM public.user_messages WHERE dest = $1',[dest], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createPost = (request, response) => {
    const flight_num = request.params.flight_num
    const dest =  request.params.dest
    const title = request.params.title
    const image_url  = request.params.image_url
    const post_content  = request.params.post_content
    const tags = request.params.tags

    pool.query('INSERT INTO public.user_messages (flight_num, dest, title, image_url, post_content, tags) VALUES ($1, $2, $3, $4, $5, $6)', 
    [flight_num, dest, title, image_url, post_content, tags], (error, result) => {
        if (error) {
        throw error
        }
        response.status(201).send(`User added with ID: ${result}`)
    })
}



module.exports = {
  getDestination,
  createPost
  }
