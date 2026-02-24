import bcrypt from "bcrypt"
import jwt, { SignOptions } from "jsonwebtoken"
import { User} from "./auth.model"
import { env } from "../../config/env"
import { LoginBody, AuthTokenResponse, TokenPayload } from "./auth.types"

export class AuthService {
    private generateToken(payload: TokenPayload): string {
        const options: SignOptions = {
            expiresIn: env.JWT_EXPIRES_IN
        }

        return jwt.sign(payload, env.JWT_SECRET, options)
    }

    async login(body: LoginBody): Promise<AuthTokenResponse> {
        const { email, password } = body

        if(!email || !password) {
            throw new Error("Email and password are required")
        }

        const user = await User.findOne({ where: { email } })

        if (!user) {
            throw new Error("Invalid email or password")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            throw new Error("Invalid email or password")
        }

        const token = this.generateToken({
            sub: user.id,
            tenant: user.tenantId,
            role: user.role
        })
        return {
            token
        }
    }
}

export const authService = new AuthService()