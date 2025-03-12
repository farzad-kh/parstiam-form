import z from "zod";
   const formValidationSchemas = z
     .object({
       name: z.string().optional(),
       lastName: z.string().optional(),
       age: z
         .string()
         .min(1, "لطفا سن خود را وارد کنید")
         .regex(/^\d+$/, "سن باید فقط شامل اعداد باشد"),
     })
     .refine((data) => !(data.name?.trim() && data.lastName?.trim()), {
       message: "فقط یکی از فیلدهای نام یا نام خانوادگی باید پر باشد.",
       path: ["name"],
     })
     .refine((data) => !(data.name?.trim() && data.lastName?.trim()), {
       message: "فقط یکی از فیلدهای نام یا نام خانوادگی باید پر باشد.",
       path: ["lastName"],
     });

   
     const formValidationServerSchemas = z.array(
        z
          .object({
            name: z.string().optional(),
            lastName: z.string().optional(),
            age: z
              .string()
              .min(1, "لطفا سن خود را وارد کنید")
              .regex(/^\d+$/, "سن باید فقط شامل اعداد باشد"),
          })
          .refine((data) => !(data.name?.trim() && data.lastName?.trim()), {
            message: "فقط یکی از فیلدهای نام یا نام خانوادگی باید پر باشد.",
            path: ["name"],
          })
          .refine((data) => !(data.name?.trim() && data.lastName?.trim()), {
            message: "فقط یکی از فیلدهای نام یا نام خانوادگی باید پر باشد.",
            path: ["lastName"],
          })
      );
      

     export {formValidationSchemas,formValidationServerSchemas}