import { z } from "zod";

export const contactSchema = z.object({
  intId: z.number().optional(),
  strName: z.string().min(1, { message: "Name is required" }),
  strEmail: z.string().email({ message: "Invalid email address" }),
  strPhoneNo: z
    .string()
    .optional()
    .refine((value) => !value || /^[\d\s()+-]+$/.test(value), {
      message: "Invalid phone number format",
    }),
    strDate: z.date().default(() => new Date()),
  }) 

export type Contact = z.infer<typeof contactSchema>;

export const initContactSchema: Contact = {
  intId: undefined, 
  strName: "",       
  strEmail: "",      
  strPhoneNo: "",     
  strDate: new Date() 
};
