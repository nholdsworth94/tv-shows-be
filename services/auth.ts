import { User } from '@prisma/client';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
const client = new OAuth2Client(process.env.CLIENT_ID);

export const validateUser = async (token: string): Promise<User> => {

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const payload: TokenPayload | undefined = ticket.getPayload();

    if (payload == undefined) {
        throw new Error('Error getting user');
    }

    return {
        id: payload.email!,
        firstName: payload.given_name!,
        lastName: payload.family_name!,
        imageUrl: payload.picture!
    }
}