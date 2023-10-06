import Mongoose from "mongoose";

const productSchema = new Mongoose.Schema({
    name:{
        type:String,
        required:[true,'product must have a name']
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5
    },
    price:{
        type:Number,
        required:[true,'product must have a price']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        enum:{
            values: ['ikea','liddy','caressa', 'marcos'],
            message: '{VALUE} is not supported'
        }
    }
})

export default Mongoose.model('Product',productSchema)