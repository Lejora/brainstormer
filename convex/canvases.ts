import { query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {
    teamId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const canvases = await ctx.db
      .query("canvas")
      .withIndex("by_team", (q) => q.eq("teamId", args.teamId))
      .order("desc")
      .collect();

    return canvases;
  },
});
