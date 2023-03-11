package com.example.bookservice.controller;

import com.example.bookservice.model.Book;
import com.example.bookservice.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/books")
@RequiredArgsConstructor
public class BookCtrl {
    private final BookService bookService;

    @GetMapping("/{bookId}")
    public Mono<ResponseEntity<Book>> getBookInfo(@PathVariable("bookId") Long id) {
        return bookService.findBookById(id)
                          .map(ResponseEntity::ok)
                          .defaultIfEmpty(ResponseEntity.notFound()
                                                        .build());
    }

    @GetMapping
    public Flux<Book> getBooksInfo() {
        return bookService.findAllBooks();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Book> createBook(@RequestBody Book book) {
        return bookService.saveBook(book);
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<Book>> updateBook(@PathVariable Long id, @RequestBody Book book) {
        return bookService.findBookById(id)
                          .flatMap(existingBook -> {
                              existingBook.setAuthor(book.getAuthor());
                              existingBook.setTitle(book.getTitle());
                              existingBook.setDescription(book.getDescription());
                              return bookService.saveBook(existingBook);
                          })
                          .map(ResponseEntity::ok)
                          .defaultIfEmpty(ResponseEntity.notFound()
                                                        .build());
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteBook(@PathVariable Long id) {
        return bookService.findBookById(id)
                          .flatMap(book -> bookService.deleteBook(id)
                                                      .then(Mono.just(ResponseEntity.ok()
                                                                                    .<Void>build())))
                          .defaultIfEmpty(ResponseEntity.notFound()
                                                        .build());
    }
}
