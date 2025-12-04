import { Schema, model } from "mongoose";
import { ICategory } from "./category.interface";

const categorySchema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true
        },
        description: {
            type: String,
            default: ""
        },
        icon: { type: String },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

/* --------------------------------------------------
    🔥 Generate Slug on Create (pre save)
--------------------------------------------------- */
categorySchema.pre("save", async function () {
    if (this.isModified("name")) {
        const baseSlug = this.name
            .toLowerCase()
            .replace(/&/g, "and")
            .split(" ")
            .join("-");

        let slug = baseSlug;
        let counter = 1;

        // Check for duplicate slug
        while (await Category.exists({ slug })) {
            slug = `${baseSlug}-${counter++}`;
        }

        this.slug = slug;
    }
});

/* --------------------------------------------------
    🔥 Generate Slug on Update (findOneAndUpdate)
--------------------------------------------------- */
categorySchema.pre("findOneAndUpdate", async function () {
    const update = this.getUpdate() as Partial<ICategory>;

    if (update?.name) {
        const baseSlug = update.name
            .toLowerCase()
            .replace(/&/g, "and")
            .split(" ")
            .join("-");

        let slug = baseSlug;
        let counter = 1;

        // Check for duplicate slug
        while (await Category.exists({ slug })) {
            slug = `${baseSlug}-${counter++}`;
        }

        update.slug = slug;

        this.setUpdate(update);
    }
});

export const Category = model<ICategory>("Category", categorySchema);
