export interface JwtPayload {
    sub: number; // user id
    email: string;
    iat?: number; // issued at timestamp
    exp?: number; // expiration timestamp
} 