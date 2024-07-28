import *  as  jwt from 'jsonwebtoken'
import { injectable } from 'tsyringe'

interface IAuthenticationData {
    user: {
        id: number,
        profile: string
    }
}


@injectable()
class Authentication {
    public generateToken = (user: IAuthenticationData): string => {
        const expiresIn = process.env.EXPIRES_IN;
        const secretOrPrivateKey = process.env.JWT_KEY || "";

        const token = jwt.sign(
            { user },
            secretOrPrivateKey,
            { expiresIn }
        )
        return token
    }

    public getTokenData(token: string): IAuthenticationData {
        const secretOrPrivateKey = process.env.JWT_KEY || "";
        const { user } = jwt.verify(token, secretOrPrivateKey) as any
        return user;
    }
}

export { Authentication };