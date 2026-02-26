import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {UsersService} from "./users.service";
import {randomBytes,scrypt} from "crypto";
import {promisify} from "util";

const Scrypt = promisify(scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async signUp(email: string, password: string) {
        const user = await this.usersService.find(email);
        if (user.length) {
            throw new BadRequestException('Email in use');
        }
        //hash password
        const salt=randomBytes(8).toString('hex');
        const hash=(await Scrypt(password,salt,32)) as Buffer;
        const result=salt+"."+hash.toString('hex')
        //create a new user and save it
        const newUser=await this.usersService.create(email,result);
        //return the user
        return newUser;

    }

    async signIn(email: string, password: string) {
        const [user] = await this.usersService.find(email);
        if (!user){
            throw new NotFoundException('User not found with this email');
        }
        const [salt,dbHash]=user.password.split('.');

        const hash=(await Scrypt(password,salt,32)) as Buffer;
        if (dbHash===hash.toString('hex')){
            return user;
        }else {
            throw new BadRequestException('Invalid password');
        }
    }
}