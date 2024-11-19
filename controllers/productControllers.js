import { StatusCodes } from "http-status-codes";
import Product from "../models/Product.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const createProduct = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError("No file uploded");
  }
  const { image } = req.files;
  if (Array.isArray(image)) {
    throw new BadRequestError("Please upload single image");
  }
  if (!image.mimetype.startsWith("image")) {
    throw new BadRequestError("Please upload image");
  }
  const maxSize = 1024 * 1024;
  if (image.size > maxSize) {
    throw new BadRequestError("Please upload image smaller than 1MB");
  }
  const product = new Product({ ...req.body, user: req.user.userId });
  await product.validate();

  //upload to cloudinary
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "Fizmar",
    }
  );
  product.image = result.secure_url;
  await product.save();
  fs.unlinkSync(req.files.image.tempFilePath);

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Product successfully uploaded" });
};

const getAllProducts = async (req, res) => {
  const {
    name,
    category,
    company,
    featured,
    sort,
    freeShipping,
    colors,
    fields,
    numericFilters,
  } = req.query;
  const queryObject = {};
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (category) {
    queryObject.category = category;
  }
  if (company) {
    queryObject.company = company;
  }
  if (featured) {
    queryObject.featured = featured;
  }
  if (freeShipping) {
    queryObject.freeShipping = freeShipping;
  }
  if (colors) {
    let colorsArray = colors.split(",");
    queryObject.colors = {
      $in: colorsArray.map((color) => new RegExp(`^${color}$`, "i")),
    };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|<=|>=|=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "averageRating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }
  let result = Product.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("price");
  }
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 6;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const nbhits = await Product.countDocuments(queryObject);
  const pages = Math.ceil(nbhits / limit);

  const products = await result;
  const featuredProducts = await Product.find({featured:true});
  res.status(StatusCodes.OK).json({ products, nbhits, pages,featured:featuredProducts });
};

const getSingleProduct = async(req,res) =>{
  const {id:productID} = req.params;
  const product = await Product.findOne({_id:productID});
  if(!product){
    throw new NotFoundError(`No product with id:${productID}`);
  }
  res.status(StatusCodes.OK).json(product);
}

export { createProduct, getAllProducts,getSingleProduct};
