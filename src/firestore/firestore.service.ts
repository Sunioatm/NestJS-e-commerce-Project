import { Injectable } from '@nestjs/common';
import * as firestore from '@google-cloud/firestore';
import * as fs from 'fs';

@Injectable()
export class FirestoreService {
  private firestore: firestore.Firestore;

  constructor() {
    // Initialize Firestore
    const serviceAccountKeyPath = 'src/firestore/serviceAccountKey.json';
    const serviceAccountKey = fs.readFileSync(serviceAccountKeyPath, 'utf-8');
    const credentials = JSON.parse(serviceAccountKey);
    this.firestore = new firestore.Firestore({
        credentials: credentials,
        projectId: credentials.project_id,
    });
  }

  getFirestore(): firestore.Firestore {
    return this.firestore;
  }
}