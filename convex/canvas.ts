import { mutation } from "./_generated/server";
import { v } from "convex/values";

const images = ["/placeholders/1.svg", "/placeholders/2.svg"];

export const create = mutation({
  args: {
    teamId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const canvas = await ctx.db.insert("canvas", {
      title: args.title,
      teamId: args.teamId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage,
    });

    return canvas;
  },
});

export const remove = mutation({
  args: { id: v.id("canvas") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    await ctx.db.delete(args.id);
  },
});
