import dotenv from 'dotenv'
dotenv.config()
import connectDB from './db/connect.js'
import Express from 'express'
const app = Express()
import errorHandlerMiddleware from './middleware/error-handler.js'
import notFound from './middleware/not-found.js'
import {router as products} from './routes/products.js'

app.use(Express.json())


// error handlers
//midlleware
// routes
app.use('/api/v1/products',products)

//product route
app.use(errorHandlerMiddleware)
app.use(notFound)

const port = process.env.PORT || 3000
const start = async ()=>{
    try {
        // await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`server is lisetning on port: ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()