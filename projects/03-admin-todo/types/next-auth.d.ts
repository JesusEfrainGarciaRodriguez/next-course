import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

interface IUser extends DefaultUser {
  /**
   * Roles del usuario
   */
  roles?: string[];
  /**
   * Agregar cualquier otro campo que tu manejas
   */
  id: string;
}

declare module "next-auth" {
    interface Session {
        user: IUser & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        roles?: string[];
        id: string;
    }
}
