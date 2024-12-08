import { StatusCodes } from "http-status-codes";
import Product from "../models/Product.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const createProduct = async (req, res) => {
  if (!req.files || !req.files.images) {
    throw new BadRequestError("No file uploaded");
  }

  const { images } = req.files;

  // Ensure the images are in an array format
  const imagesArr = Array.isArray(images) ? images : [images];

  // Limit the number of images to 5
  if (imagesArr.length > 5) {
    throw new BadRequestError("You can upload up to 5 images");
  }

  const urls = []; // Array to store Cloudinary URLs

  for (const img of imagesArr) {
    // Validate each image
    if (!img.mimetype.startsWith("image")) {
      throw new BadRequestError("Please upload only images");
    }
    const maxSize = 1024 * 1024;
    if (img.size > maxSize) {
      throw new BadRequestError("Please upload images smaller than 1MB");
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(img.tempFilePath, {
      use_filename: true,
      folder: "Fizmar",
    });

    // Push the secure URL to the array
    urls.push(result.secure_url);

    // Remove the temporary file
    fs.unlinkSync(img.tempFilePath);
  }

  // Create the product with the uploaded image URLs
  const product = new Product({
    ...req.body,
    user: req.user.userId,
    images: [...urls], // Store the array of image URLs
  });

  await product.validate();
  await product.save();

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Product successfully uploaded", images: urls });
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

const updateProduct = async (req, res) => {
  const { id: productID } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new NotFoundError(`No product with id: ${productID}`);
  }
  res.status(StatusCodes.OK).json({ product });
};
const deleteProduct = async (req, res) => {
  const { id: productID } = req.params;
  const product = await Product.findOne({ _id: productID });
  if (!product) {
    throw new NotFoundError(`No product with id: ${productID}`);
  }
  await product.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "success product removed" });
};


export { createProduct, getAllProducts,getSingleProduct, updateProduct,deleteProduct};
