import { Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as firestore from '@google-cloud/firestore';

import { FirestoreService } from 'src/firestore/firestore.service';

@Injectable()
export class ProductService {
  private productsCollection: firestore.CollectionReference;
  
  constructor(private firestoreService: FirestoreService) {
    const firestore = this.firestoreService.getFirestore();
    this.productsCollection = firestore.collection('product');
  }

  async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
    const docRef = this.productsCollection.doc();
    await docRef.set(createProductDto);
    const productDoc = await docRef.get();
    const product: ProductDocument = {
      id: productDoc.id,
      name: createProductDto.name, 
      price: createProductDto.price,
    };
    return product;
  }

  async findAll(): Promise<ProductDocument[]> {
    const snapshot = await this.productsCollection.get();
    const products: ProductDocument[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      const product: ProductDocument = {
        id: doc.id,
        name: data.name, // Assuming 'name' is a property in the Firestore document
        price: data.price, // Assuming 'price' is a property in the Firestore document
        // Add any other properties from the Firestore document
      };
      products.push(product);
    });
    return products;
  }

  async findOne(id: string): Promise<ProductDocument> {
    const docRef = this.productsCollection.doc(id); // Get a reference to the document with the specified ID
    const docSnapshot = await docRef.get(); // Fetch the document
    // console.log("DocRef : ", docRef);
    // console.log("DocSnapshot : ", docSnapshot);
    if (!docSnapshot.exists) {
      throw new NotFoundException(`Product with ID ${id} not found`); // Or handle the not found case as you see fit
    }
  
    const data = docSnapshot.data();
    const product: ProductDocument = {
      id: docSnapshot.id,
      name: data.name, // Assuming 'name' is a property in the Firestore document
      price: data.price, // Assuming 'price' is a property in the Firestore document
      // Add any other properties from the Firestore document
    };
  
    return product;
  }
  
  async update(id: string, updateProductDto: UpdateProductDto): Promise<void> {
    const docRef = this.productsCollection.doc(id);
    const docSnapshot = await docRef.get();
  
    // Check if the document exists
    if (!docSnapshot.exists) {
      throw new NotFoundException(`Product with ID ${id} not found`); // Or handle it as per your application's error handling strategy
    }
  
    // Proceed with the update if the document exists
    await docRef.update(updateProductDto as { [x: string]: any });
  }
  

  async remove(id: string): Promise<void> {
    const docRef = this.productsCollection.doc(id);
    const docSnapshot = await docRef.get();
    if (!docSnapshot.exists) {
      throw new NotFoundException(`Product with ID ${id} not found`); // Or handle the not found case as you see fit
    }

    await docRef.delete();
  }
}