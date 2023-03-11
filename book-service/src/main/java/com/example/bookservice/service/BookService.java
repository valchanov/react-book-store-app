package com.example.bookservice.service;

import com.example.bookservice.model.Book;
import com.example.bookservice.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;

    public Flux<Book> findAllBooks() {
        return bookRepository.findAll();
    }

    public Mono<Book> findBookById(Long id) {
        return bookRepository.findById(id);
    }

    public Mono<Book> saveBook(Book book) {
        return bookRepository.save(book);
    }

    public Mono<Void> deleteBook(Long id) {
        return bookRepository.deleteById(id);
    }

}
