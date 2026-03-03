package library;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class Book {

    private String isbn;
    private String title;
    private String author;
    private int year;
    private boolean available;
    private String borrowedBy;
    private LocalDate dueDate;

    public Book(String isbn, String title, String author, int year) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.year = year;
        this.available = true;
        this.borrowedBy = null;
        this.dueDate = null;
    }

    // Getters
    public String getIsbn() { return isbn; }
    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public int getYear() { return year; }
    public boolean isAvailable() { return available; }
    public String getBorrowedBy() { return borrowedBy; }
    public LocalDate getDueDate() { return dueDate; }

    // Setters
    public void setAvailable(boolean available) {
        this.available = available;
    }

    public void setBorrowedBy(String borrowedBy) {
        this.borrowedBy = borrowedBy;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public boolean isOverdue() {
        if (dueDate == null) return false;
        return LocalDate.now().isAfter(dueDate);
    }

    public long calculateFine() {
        if (!isOverdue()) return 0;
        long daysLate = ChronoUnit.DAYS.between(dueDate, LocalDate.now());
        return daysLate * 5; // ₹5 per day
    }

    @Override
    public String toString() {
        return "ISBN: " + isbn +
                " | Title: " + title +
                " | Author: " + author +
                " | Year: " + year +
                " | " + (available ? "Available"
                : "Borrowed by: " + borrowedBy + " | Due: " + dueDate);
    }
}