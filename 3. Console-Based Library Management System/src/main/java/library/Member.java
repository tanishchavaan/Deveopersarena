package library;

import java.util.ArrayList;
import java.util.List;

public class Member {

    private String id;
    private String name;
    private List<String> borrowedBooks;

    // Constructor
    public Member(String id, String name) {
        this.id = id;
        this.name = name;
        this.borrowedBooks = new ArrayList<>();
    }

    // Getters
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<String> getBorrowedBooks() {
        return borrowedBooks;
    }

    // Borrow book (store ISBN)
    public void borrowBook(String isbn) {
        borrowedBooks.add(isbn);
    }

    // Return book
    public void returnBook(String isbn) {
        borrowedBooks.remove(isbn);
    }

    // Display member info
    @Override
    public String toString() {
        return "Member ID: " + id +
                " | Name: " + name +
                " | Borrowed Books: " + borrowedBooks.size();
    }
}