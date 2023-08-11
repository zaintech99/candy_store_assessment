import { ConflictException, Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser } from './user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async validateUser(user: any): Promise<any> {
        const { user_email, password } = user
        const userCheck: any = await this.userRepository.findOne({
            where: { user_email },
        });
        if (userCheck.token_expire < user.exp) throw new NotAcceptableException("User token is expired");
        if (!userCheck) throw new NotAcceptableException("could not find the user");
        const passwordValid = await bcrypt.compare(password, userCheck.password);
        if (!passwordValid) throw new NotAcceptableException("Invalid password!");
        delete userCheck.password
        return userCheck
    }

    async login(user: any): Promise<{ accessToken: string }> {
        const userData: any = await this.validateUser(user)
        const accessToken = this.jwtService.sign({ user_id: userData.user_id, ...user });
        const tokenData: any = this.jwtService.decode(accessToken);
        await this.userRepository.update(
            tokenData.user_id,
            { token_expire: tokenData.exp }
        );
        return { accessToken };
    }

    async register(createUserDto: IUser): Promise<User> {
        const { user_name, user_email, password } = createUserDto;
        const existingUser = await this.userRepository.findOne({
            where: { user_email },
        });
        if (existingUser) throw new ConflictException("user already exists");

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.userRepository.save({
            user_name,
            user_email,
            password: hashedPassword,
        });

        return newUser;
    }

    async logout(user: any): Promise<any> {
        await this.userRepository.update(
            user.user_id,
            { token_expire: 0 }
        );
        return {
            message: "Logout Successfully!"
        }
    }
}
