import * as argon from 'argon2'

    export async function Argonhash (valueToHash: string) {
        return await argon.hash(valueToHash);
    }

    export async function Argoncompare (plainValue: string, hashedValue: string) {
        return await argon.verify(hashedValue, plainValue);
    }