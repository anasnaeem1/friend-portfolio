import mongoose from "mongoose";

import { COLLECTION_NAME, connectDb } from "../config/db";
import { defaultContent } from "../app/lib/portfolioContent";

const SLUG = "main";

const schema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, default: SLUG },
    home: { type: Object, required: true },
    work: { type: Object, required: true },
    about: { type: Object, required: true },
    workExperience: { type: Object, required: true },
  },
  { collection: COLLECTION_NAME, timestamps: true }
);

schema.statics.getOrCreate = async function getOrCreate() {
  await connectDb();

  const doc = await this.findOneAndUpdate(
    { slug: SLUG },
    { $setOnInsert: { slug: SLUG, ...defaultContent } },
    { upsert: true, new: true }
  );

  return doc;
};

schema.statics.saveContent = async function saveContent(data) {
  await connectDb();

  return this.findOneAndUpdate(
    { slug: SLUG },
    {
      $set: {
        home: data.home,
        work: data.work,
        about: data.about,
        workExperience: data.workExperience,
      },
      $setOnInsert: { slug: SLUG },
    },
    { upsert: true, new: true }
  );
};

schema.methods.toContent = function toContent() {
  return {
    home: this.home,
    work: this.work,
    about: this.about,
    workExperience: this.workExperience,
  };
};

const PortfolioContent =
  mongoose.models.PortfolioContent || mongoose.model("PortfolioContent", schema);

export default PortfolioContent;
