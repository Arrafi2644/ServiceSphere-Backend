import { Schema, model, Types } from "mongoose";
import { IService } from "./service.interface";

const serviceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    image: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    category: {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
    },

    serviceProvider: {
      type: Types.ObjectId,
      ref: "ServiceProvider",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/* --------------------------------------------------
    🔥 Generate Slug on Create (pre save)
--------------------------------------------------- */
serviceSchema.pre("save", async function () {
  if (this.isModified("title")) {
    const baseSlug = this.title
      .toLowerCase()
      .replace(/&/g, "and")
      .split(" ")
      .join("-");

    let slug = baseSlug;
    let counter = 1;

    while (await Service.exists({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    this.slug = slug;
  }
});

/* --------------------------------------------------
    🔥 Generate Slug on Update (findOneAndUpdate)
--------------------------------------------------- */
serviceSchema.pre("findOneAndUpdate", async function () {
  const update = this.getUpdate() as Partial<IService>;

  if (update?.title) {
    const baseSlug = update.title
      .toLowerCase()
      .replace(/&/g, "and")
      .split(" ")
      .join("-");

    let slug = baseSlug;
    let counter = 1;

    while (await Service.exists({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    update.slug = slug;
    this.setUpdate(update);
  }
});

export const Service = model<IService>("Service", serviceSchema);
