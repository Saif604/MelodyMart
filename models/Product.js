import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide product name"],
    trim: true,
    maxLength: [100, "Name cann't be more than 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please provide product price"],
    default: 0,
  },
  description: {
    type: String,
    required: [true, "Please provide product description"],
    maxLength: [1000, "Description cann't be more than 1000 characters long"],
  },
  image: {
    type: String,
    default: "/uploads/example.jpeg",
  },
  category:{
    type:String,
    required:[true,"Please provide product category"],
    enum:["flute","piano","guitar","drum"]
  },
  company:{
    type:String,
    required:[true,"Please provide product company"],
    enum:{
        values:["sennheister","kawai","steinway","yamha","gibson"],
        message:"{VALUE} is not supported"
    }
  },
  colors:{
    type:[String],
    default:["#222"],
    required:true
  },
  featured:{
    type:Boolean,
    default:false
  },
  freeShipping:{
    type:Boolean,
    default:false
  },
  inventory:{
    type:Number,
    required:true,
    default:15,
  },
  averageRating:{
    type:Number,
    default:0,
  },
  numOfReviews:{
    type:Number,
    default:0
  },
  user:{
    type:mongoose.Types.ObjectId,
    ref:"User",
    required:true
  }
},{timestamps:true});


export default mongoose.model("Product",ProductSchema);