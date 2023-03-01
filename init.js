const fs = require('fs')

fs.copyFileSync('.env.sample', '.env')
fs.copyFileSync('./packages/server/.env.sample', './packages/server/.env')

fs.mkdirSync('tmp/pgdata', { recursive: true })
fs.mkdirSync('tmp/pgadmin_data', { recursive: true })
