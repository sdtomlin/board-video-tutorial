import { v } from "convex/values";
import { mutation, query} from "./_generated/server";

export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity) {
            throw new Error("Unauthorised");
        }

        const board = await ctx.db.insert("boards", {
            title: args.title,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: 'image.tst'
        });

        return board;
    }

});

export const remove = mutation({
    args: {
        id: v.id("boards")
    },
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Unauthorised");
        }

        const existingFavourite = await ctx.db.query("userFavourites")
        .withIndex("by_user_board", (q) => 
            q.eq("userId", identity.subject)
            .eq("boardId", args.id)
        ).unique();

        if(existingFavourite){
            await ctx.db.delete(existingFavourite._id);
        }

        await ctx.db.delete(args.id);
    }
});

export const update = mutation({
    args: {
        id: v.id("boards"),
        title: v.string()
    },
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Unauthorised");
        }

        const title = args.title.trim();

        if(!title) {
            throw new Error("Title is required");
        }

        if(title.length > 60){
            throw new Error("Title cannot be longer than 60 characters")
        }

        const board = await ctx.db.patch(args.id, { title: args.title});

        return board;
    }
});

export const favourites = mutation({
    args: {
        id: v.id("boards")
    },
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Unauthorised");
        }

        const board = await ctx.db.get(args.id);

        if(!board){
            throw new Error("Board not found");
        }

        const userId = identity.subject;

        const existingFavourite = await ctx.db.query("userFavourites")
                                        .withIndex("by_user_board", (q) => 
                                            q.eq("userId", userId)
                                            .eq("boardId", board._id)
                                        ).unique();

        if(existingFavourite)
            throw new Error("Board already favourited");

        await ctx.db.insert("userFavourites", { boardId: args.id, orgId: board.orgId, userId: userId});

        return board;
    }
});

export const unfavourite = mutation({
    args: {
        id: v.id("boards")
    },
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Unauthorised");
        }

        const board = await ctx.db.get(args.id);

        if(!board){
            throw new Error("Board not found");
        }

        const userId = identity.subject;

        const existingFavourite = await ctx.db.query("userFavourites")
                                        .withIndex("by_user_board", (q) => 
                                            q.eq("userId", userId)
                                            .eq("boardId", board._id)
                                        ).unique();

        if(!existingFavourite)
            throw new Error("Board not favourited");

        await ctx.db.delete(existingFavourite._id);

        return board;
    }
});

export const get = query({
    args: { id: v.id("boards")},
    handler: async (ctx, args) => {
        const board = ctx.db.get(args.id);

        return board;
    }
})