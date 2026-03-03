package library;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Library {

    private List<Book> books;
    private List<Member> members;
    private FileHandler fileHandler;

    public Library() {
        books = new ArrayList<>();
        members = new ArrayList<>();
        fileHandler = new FileHandler();
        loadData();
    }

    // =========================
    // LOAD DATA FROM FILES
    // =========================
    private void loadData() {
        books = fileHandler.loadBooks();
        members = fileHandler.loadMembers();
        System.out.println("Loaded " + books.size() + " books and " + members.size() + " members.");
    }

    // =========================
    // BOOK OPERATIONS
    // =========================

    public void addBook(Book book) {
        books.add(book);
        fileHandler.saveBooks(books);
        System.out.println("Book added successfully.");
    }

    public void removeBook(String isbn) {
        Book book = findBookByIsbn(isbn);
        if (book != null) {
            books.remove(book);
            fileHandler.saveBooks(books);
            System.out.println("Book removed successfully.");
        } else {
            System.out.println("Book not found.");
        }
    }

    public Book findBookByIsbn(String isbn) {
        return books.stream()
                .filter(book -> book.getIsbn().equalsIgnoreCase(isbn))
                .findFirst()
                .orElse(null);
    }

    public List<Book> searchBooks(String keyword) {
        return books.stream()
                .filter(book ->
                        book.getTitle().toLowerCase().contains(keyword.toLowerCase()) ||
                        book.getAuthor().toLowerCase().contains(keyword.toLowerCase()))
                .collect(Collectors.toList());
    }

    public void displayAllBooks() {
        if (books.isEmpty()) {
            System.out.println("No books available.");
            return;
        }

        System.out.println("\n=== ALL BOOKS ===");
        for (Book book : books) {
            System.out.println(book);
        }
    }

    // =========================
    // MEMBER OPERATIONS
    // =========================

    public void registerMember(Member member) {
        members.add(member);
        fileHandler.saveMembers(members);
        System.out.println("Member registered successfully.");
    }

    public Member findMemberById(String id) {
        return members.stream()
                .filter(member -> member.getId().equalsIgnoreCase(id))
                .findFirst()
                .orElse(null);
    }

    // =========================
    // BORROW BOOK
    // =========================

    public void borrowBook(String isbn, String memberId) {

        Book book = findBookByIsbn(isbn);
        Member member = findMemberById(memberId);

        if (book == null) {
            System.out.println("Book not found.");
            return;
        }

        if (member == null) {
            System.out.println("Member not found.");
            return;
        }

        if (!book.isAvailable()) {
            System.out.println("Book is already borrowed.");
            return;
        }

        book.setAvailable(false);
        book.setBorrowedBy(memberId);
        book.setDueDate(LocalDate.now().plusWeeks(2));

        member.borrowBook(isbn);

        fileHandler.saveBooks(books);
        fileHandler.saveMembers(members);

        System.out.println("Book borrowed successfully.");
        System.out.println("Due Date: " + book.getDueDate());
    }

    // =========================
    // RETURN BOOK
    // =========================

    public void returnBook(String isbn, String memberId) {

        Book book = findBookByIsbn(isbn);
        Member member = findMemberById(memberId);

        if (book == null || member == null) {
            System.out.println("Invalid book or member.");
            return;
        }

        if (book.isAvailable()) {
            System.out.println("This book was not borrowed.");
            return;
        }

        // Fine calculation
        if (book.isOverdue()) {
            long daysLate = ChronoUnit.DAYS.between(book.getDueDate(), LocalDate.now());
            long fine = daysLate * 5;  // ₹5 per day
            System.out.println("Book is overdue by " + daysLate + " days.");
            System.out.println("Fine to be paid: ₹" + fine);
        }

        book.setAvailable(true);
        book.setBorrowedBy(null);
        book.setDueDate(null);

        member.returnBook(isbn);

        fileHandler.saveBooks(books);
        fileHandler.saveMembers(members);

        System.out.println("Book returned successfully.");
    }

    // =========================
    // STATISTICS
    // =========================

    public void displayStatistics() {

        long availableBooks = books.stream()
                .filter(Book::isAvailable)
                .count();

        long borrowedBooks = books.size() - availableBooks;

        long overdueBooks = books.stream()
                .filter(book -> !book.isAvailable() && book.isOverdue())
                .count();

        System.out.println("\n=== LIBRARY STATISTICS ===");
        System.out.println("Total Books: " + books.size());
        System.out.println("Available Books: " + availableBooks);
        System.out.println("Borrowed Books: " + borrowedBooks);
        System.out.println("Overdue Books: " + overdueBooks);
        System.out.println("Registered Members: " + members.size());
    }
}