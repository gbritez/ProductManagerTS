import { connect } from 'mongoose';
const url = 'mongodb+srv://gbritez:viuLjEoXqoKUXAqY@dev-coderhouse-ecommerc.38ar6ty.mongodb.net/?retryWrites=true&w=majority'
const start = async () => {
    try {
        await connect(url, { dbName: 'ecommerce' })
        console.log('connected to db')
    }
    catch (error) {
        console.error(error)
    }
}
start();