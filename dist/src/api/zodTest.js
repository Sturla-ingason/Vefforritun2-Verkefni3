import * as z from 'zod';
export const pagingSchema = z.object({
    limit: z.coerce
        .number()
        .min(1)
        .max(100)
        .optional()
        .default(10),
    offset: z.coerce
        .number()
        .min(0)
        .max(100)
        .optional()
        .default(0)
});
export const createAuthorSchema = z.object({
    name: z.string("not a string")
        .min(1, "string is too short")
        .max(100, "string is too long!"),
    email: z.email()
});
export const createNewsSchema = z.object({
    authId: z.coerce.number("there is no author"),
    content: z.coerce.string()
        .min(1, "string is not long enough")
        .max(500, "string is too large"),
    excerpt: z.coerce.string()
        .min(1)
        .max(100),
    published: z.coerce.boolean()
        .default(false),
    title: z.coerce.string("missing title")
        .min(1, "the title is too short")
        .max(50, "the title is too long")
});
