import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  canvas: defineTable({
    title: v.string(),
    teamId: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    imageUrl: v.string(),
  })
    .index("by_team", ["teamId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["teamId"],
    }),
});
