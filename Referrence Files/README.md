# Z-Prefix-Store-Project
Basic Crud app simulating a store



-------------SETUP--------------
Installs needed:
`npm install express`
`npm install pg`
`npx knex init`
`npm install knex --save`
`npm init -y`
`npm i nodemon`
`npm install`
`npm list knex`
`npm install dotenv`



---------------Start DATABASE ------------------
Navigate to the server folder
Type the following below
`docker-compose up -d --build`
`docker-compose exec app npx knex migrate:latest`
`docker-compose exec app npx knex seed:run`
In a seperate terminal: `docker-compose exec db psql -U postgres -d store`