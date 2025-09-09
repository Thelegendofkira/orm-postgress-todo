import z, { email } from "zod";
import { ParseStatus } from "zod/v3";
const userschema=z.object({
    username:z.string().min(1,"length is less").max(32,"too long"),
    password:z.string().min(1,"to short").max(32,"tolong"),
    email:z.email()

})

type usertype=z.infer<typeof userschema>;

const todoschema=z.object({
    title:z.string().min(1).max(20),
    description:z.string().min(1).max(300),
    done:z.boolean()
})

type todotype=z.infer<typeof todoschema>

export {userschema,todoschema}
export type{usertype,todotype}