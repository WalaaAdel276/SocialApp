const { Schema } = require("mongoose");

const ReportedPostsSchema = new Schema(
    {
        reportComment: {
            type: String,
            enum: ["nudity", "violence", "harassment", "terrorism", "hate speech", "among others"]
        },
        ReportCreator: { type: Schema.Types.ObjectId, ref: "users" },
        ReportedPost: { type: Schema.Types.ObjectId, ref: "posts" }
    
    },
{
    timestamps: true,
    }
);

module.exports = ReportedPostsSchema;