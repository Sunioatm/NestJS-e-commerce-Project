import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Role } from './users.role.enum';
import { UserDocument } from './users.document';


import * as firestore from '@google-cloud/firestore';

import { FirestoreService } from 'src/firestore/firestore.service';
import { CreateUserDto } from './dto/create-user.dto';
// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
    private usersCollection: firestore.CollectionReference;
  
    constructor(private firestoreService: FirestoreService) {
      const firestore = this.firestoreService.getFirestore();
      this.usersCollection = firestore.collection('user');
    }
  
    async create(createUserDto: CreateUserDto): Promise<UserDocument> {
        const docRef = this.usersCollection.doc(); // Firestore generates an ID
        await docRef.set({
          ...createUserDto,
          role: createUserDto.role || Role.User,
        });
        
        const user: UserDocument = {
          id: docRef.id,
          username: createUserDto.username,
          email: createUserDto.email,
          password: createUserDto.password,
          role: createUserDto.role || Role.User, // Reflect the role, assuming it's part of CreateUserDto
        };
      
        return user;
      }
    
      async findOne(identifier: string): Promise<UserDocument> {
        const usersRef = this.usersCollection;
        const querySnapshotByUsername = await usersRef.where('username', '==', identifier).limit(1).get();
        const querySnapshotByEmail = await usersRef.where('email', '==', identifier).limit(1).get();
        
        let userDocument;
        
        if (!querySnapshotByUsername.empty) {
            userDocument = querySnapshotByUsername.docs[0].data();
        } else if (!querySnapshotByEmail.empty) {
            userDocument = querySnapshotByEmail.docs[0].data();
        } else {
            throw new NotFoundException(`No user found with username/email ${identifier}`);
        }
        return userDocument; // Make sure to cast this to UserDocument type as needed
    
    }

}

