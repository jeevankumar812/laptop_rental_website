import mongoose, { Schema } from "mongoose";

const laptopSchema = new Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    specs: {
      ram: { type: String, required: true },
      storage: { type: String, required: true },
      processor: { type: String, required: true },
      display: { type: String },
      os: { type: String },
    },
    category: {
      type: String,
      enum: ["Gaming", "Office", "Student", "Workstation"],
      required: true,
      default: "Office",
    },
    images: [{ type: String }],
    condition: {
      type: String,
      enum: ["new", "good", "fair"],
      default: "good",
    },
    status: {
      type: String,
      enum: ["available", "rented", "maintenance"],
      default: "available",
    },
    pricing: {
      perDay: { type: Number, required: true },
      perWeek: { type: Number, required: true },
      perMonth: { type: Number, required: true },
    },
    securityDeposit: { type: Number, required: true },
    totalUnits: { type: Number, required: true, default: 1 },
    availableUnits: { type: Number, required: true, default: 1 },
    tags: [{ type: String }],
  },
  { timestamps: true },
);
laptopSchema.index({ category: 1 });
laptopSchema.index({ tags: 1 });

const Laptop = mongoose.model("Laptop", laptopSchema);
export default Laptop;
