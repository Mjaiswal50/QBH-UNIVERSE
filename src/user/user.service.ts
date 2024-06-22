import { Injectable, NotFoundException } from '@nestjs/common';

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
}

@Injectable()
export class UserService {
    private users: User[] = [];
    private idCounter = 1;

    getAllUsers(): User[] {
        return this.users;
    }

    createUser(user: Omit<User, 'id'>): User {
        const newUser = { ...user, id: this.idCounter++ };
        this.users.push(newUser);
        return newUser;
    }

    editUser(id: number, user: Partial<User>): User {
        const userIndex = this.users.findIndex(u => u.id === id);
        if (userIndex === -1) {
            throw new NotFoundException('User not found');
        }
        this.users[userIndex] = { ...this.users[userIndex], ...user };
        return this.users[userIndex];
    }

    deleteUser(id: number): void {
        const userIndex = this.users.findIndex(u => u.id === id);
        if (userIndex === -1) {
            throw new NotFoundException('User not found');
        }
        this.users.splice(userIndex, 1);
    }
}
