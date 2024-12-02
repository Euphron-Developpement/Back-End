import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    private users = [
        { id: 1, name: "stephane", last_name: "brayane", email: "stephanefoyet@gmail.com", password: "123456", role: "admin" },
        {id: 2, name: "yann", last_name: "junior", email: "yannjunior@gmail.com", password: "123456", role: "admin" },
    ];

    private currentId = 3;


    
    findAll() {
        return this.users;
    }

    findOne(id: number) {
        return this.users.find((user) => user.id === id);
    }

    create(user: { name: string; last_name: string ; email: string; password: string; role: string }) {
        const newUser = { id: this.currentId++, ...user }; // Ajout d'un ID unique
        this.users.push(newUser);
        return newUser;
    }
    
    update(id: number, updatedUser: Partial<{ name: string; last_name: string; email: string; password: string; role: string }>) {
        const userIndex = this.users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            return { error: `User with ID ${id} not found` };
        }
    
        this.users[userIndex] = { ...this.users[userIndex], ...updatedUser };
        return this.users[userIndex];
    }
        
    delete(id: number) {
        const userIndex = this.users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            return { error: `User with ID ${id} not found` };
        }
    
        const deletedUser = this.users.splice(userIndex, 1);
        return deletedUser[0];
    }

}

