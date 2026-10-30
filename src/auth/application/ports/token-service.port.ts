import { Role } from '../../domain/enums/role.enum';

export interface TokenPayload {
    sub: string;
    role: Role;
}

export interface ITokenService {
    sign(payload: TokenPayload): Promise<string>;
}