import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide rating"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide review title"],
      maxLength: 100,
    },
    comment: {
      type: String,
      required: [true, "Please provide review text"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calculateAverageRating = async function (productID) {
  // const product = await this.find({ product: productID });
  const result = await this.aggregate([
    {
      $match: {
        product: productID,
      },
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);
  //  console.log(result);
  // Update the product with the new averageRating and numOfReviews
  await mongoose.model("Product").findByIdAndUpdate(productID, {
    averageRating: result[0]?.averageRating || 0, // Default to 0 if no reviews
    numOfReviews: result[0]?.numOfReviews || 0,
  });
};
ReviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.product);
});
ReviewSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    await this.constructor.calculateAverageRating(this.product);
  }
);

export default mongoose.model("Review", ReviewSchema);
