const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * PlaceSchema
 */
const PlaceSchema = new Schema(
  {
    row: String,
    col: Number,
    status: String,
    name: String,
    cell: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "Place" }
);

/**
 * WorshipPlaceSchema
 */
const WorshipPlaceSchema = new Schema(
  {
    count: Number,
    places: [PlaceSchema],
    row: String,
    col: Number,
    date: String,
    title: String,
    description: String,
    isDisplay: Boolean,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "WorshipPlace" }
);

/**
 * DisplaySchema
 */
const DisplaySchema = new Schema(
  {
    id: Number,
  },
  { collection: "Display" }
);

/**
 * WorshipPlaceSchema autoIncrement
 */
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose);
WorshipPlaceSchema.plugin(autoIncrement.plugin, {
  model: "WorshipPlace",
  field: "id",
  startAt: 1,
  increment: 1,
});

/**
 * PlaceSchema
 * @param row
 * @param col
 * @param status
 * @param name
 * @param cell
 * @param createdAt
 * @param updatedAt
 */
export const PlaceModel = mongoose.model("Place", PlaceSchema);

/**
 * WorshipPlaceSchema
 * @param count
 * @param places
 * @param row
 * @param col
 * @param date
 * @param title
 * @param description
 * @param isDisplay
 * @param createdAt
 * @param updatedAt
 */
export const WorshipPlaceModel = mongoose.model(
  "WorshipPlace",
  WorshipPlaceSchema
);

/**
 * DisplaySchema
 * @param id
 */
export const DisplayModel = mongoose.model("Display", DisplaySchema);
