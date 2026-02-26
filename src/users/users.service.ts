import {Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>){}

    create(email:string,password:string){
        const user = this.repo.create({email,password});

        return this.repo.save(user);
    }

    find(email:string){
        return this.repo.find({where:{email}});
    }

    findOne(id:number){
        if (!id){
            return null;
        }
      return  this.repo.findOneBy({id});
    }

    async update(id:number,attrs:Partial<User>){
       const user = await this.findOne(id);
       console.log(user);
       if(!user){
           throw new NotFoundException('User not found');
       }
       Object.assign(user,attrs);
       console.log(user);
       return this.repo.save(user);
    }

    async remove(id:number){
       const user = await this.findOne(id);
       if(!user){
           throw new NotFoundException('User not found');
       }
       return this.repo.remove(user);
    }

}
