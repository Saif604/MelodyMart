import { StatusCodes } from "http-status-codes";
import Product from "../models/Product.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const createProduct = async (req, res) => {
  let { colors, ...rest } = req.body;
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

  const imageDetails = [];

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

    imageDetails.push({ url: result.secure_url, publicId: result.public_id });

    // Remove the temporary file
    fs.unlinkSync(img.tempFilePath);
  }

  //Parse colors if it a JSON string;
  if (typeof colors === "string") {
    colors = JSON.parse(colors);
  }
  // Create the product with the uploaded image URLs
  const product = new Product({
    colors,
    ...rest,
    user: req.user.userId,
    images: [...imageDetails],
  });

  await product.validate();
  await product.save();

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
  const featuredProducts = await Product.find({ featured: true });
  const allProducts = await Product.find({});
  res
    .status(StatusCodes.OK)
    .json({ products, nbhits, pages, featured: featuredProducts, allProducts });
};



const getSingleProduct = async (req, res) => {
  const { id: productID } = req.params;
  const product = await Product.findOne({ _id: productID });
  if (!product) {
    throw new NotFoundError(`No product with id:${productID}`);
  }
  res.status(StatusCodes.OK).json(product);
};



const updateProduct = async (req, res) => {
  const { id: productID } = req.params;
  const product = await Product.findById(productID);
  if (!product) {
    throw new NotFoundError(`No product with id: ${productID}`);
  }

  //If the user is uploading new images
  let newImages = [];
  if (req.files && req.files.images) {
    const imagesArr = Array.isArray(req.files.images)
      ? [...req.files.images]
      : [req.files.images];

    //upload new images to cloudinary
    for (let img of imagesArr) {
      const result = await cloudinary.uploader.upload(img.tempFilePath, {
        use_filename: true,
        folder: "Fizmar",
      });

      newImages.push({ url: result.secure_url, publicId: result.public_id });

      fs.unlinkSync(img.tempFilePath);
    }
    if (product.images.length > 0) {
      const deletePromises = product.images.map((image) =>
        cloudinary.uploader.destroy(image.publicId)
      );
      await Promise.all(deletePromises);
    }
  }

  // Update product fields (including images)
  const updatedProduct = await Product.findByIdAndUpdate(
    productID,
    {
      ...req.body,
      images: newImages.length > 0 ? newImages : product.images, // Use new images if provided, else keep old ones
    },
    { new: true, runValidators: true }
  );

  if (!updatedProduct) {
    throw new NotFoundError(`No product with id: ${productID}`);
  }

  res.status(StatusCodes.OK).json({ product: updatedProduct });
};


const deleteProduct = async (req, res) => {
  const { id: productID } = req.params;
  const product = await Product.findOne({ _id: productID });
  if (!product) {
    throw new NotFoundError(`No product with id: ${productID}`);
  }
  //Delete images from Cloudinary
  const deletePromises = product.images.map((image) =>
    cloudinary.uploader.destroy(image.publicId)
  );
  await Promise.all(deletePromises);

  await product.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "success product removed" });
};

export {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
