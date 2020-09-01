const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const express = require('express')

const app = express()

const adminBro = new AdminBro({
  databases: [],
  rootPath: '/admin',
})

const router = AdminBroExpress.buildRouter(adminBro)

app.use(adminBro.options.rootPath, router)
app.listen(8080, () => console.log('AdminBro is under localhost:8080/admin'))


// Mongoose Adapter
const AdminBro = require('admin-bro')
const AdminBroMongoose = require('@admin-bro/mongoose')
const mongoose = require('mongoose')

AdminBro.registerAdapter(AdminBroMongoose)

const User = mongoose.model('User', { name: String, email: String, surname: String })
const AdminBroOptions = {
  resources: [User],
}
const AdminBro = new AdminBro(AdminBroOptions)
const router = AdminBroExpress.buildRouter(adminBro)
// and add router to express