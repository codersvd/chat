import mongoose from 'mongoose'

const config = {
  db: {
    url: 'localhost:27017',
    name: 'admin',
  },
}

const CONNECTION_URL = `mongodb://${config.db.url}/${config.db.name}`

mongoose.connect(CONNECTION_URL)

mongoose.connection.on('connected', () => {
  console.log('Mongo has connected succesfully')
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongo connection is disconnected')
})
