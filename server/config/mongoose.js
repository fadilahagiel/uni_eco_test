const mongoose = require('mongoose')
const password = process.env.MONGO_PASS

const uri = `mongodb+srv://fadilahagiel:${password}@cluster0.uojn3ps.mongodb.net/mongo_test`

mongoose.connect(uri)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('connected'))
