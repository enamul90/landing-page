
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export function getAuthUser() {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token.value) return null;

    try {
        const decoded = jwt.verify(token.value, "my_super_secret_token_key");

        return decoded ;
    }
    catch (err) {
        return null;
    }
}
