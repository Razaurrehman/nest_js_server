import { Injectable, HttpException } from '@nestjs/common';
import { BOOKS } from '../mocks/books.mock';

@Injectable()
export class BooksService {
  books = BOOKS;

  // get all books
  getBooks(): Promise<any> {
    return new Promise(resolve => {
      resolve(this.books);
    });
  }

  // get book by id
  getBook(bookID): Promise<any> {
    const id = Number(bookID);
    return new Promise(resolve => {
      const book = this.books.find(b => b.id === id);
      if (!book) {
        throw new HttpException('Book does not exist!', 404);
      }
      resolve(book);
    });
  }

  //   create a new book
  addBook(book): Promise<any> {
    return new Promise(resolve => {
      this.books.push(book);
      resolve(this.books);
    });
  }

  // delete a book
  deleteBook(bookID): Promise<any> {
    const id = Number(bookID);
    return new Promise(resolve => {
      const index = this.books.findIndex(book => book.id === id);
      if (index === -1) {
        throw new HttpException('Book does not exist!', 404);
      }
      this.books.splice(1, index);
      resolve(this.books);
    });
  }
}
