import { connect } from 'mongoose';
const start = async () => {
    try {
        await connect(process.env.DB_URI, { dbName: 'ecommerce' })
        console.log('connected to db')
    }
    catch (error) {
        console.error(error)
    }
}
start();