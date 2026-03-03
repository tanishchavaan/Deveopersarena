package library;

import java.io.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class FileHandler {

    private static final String BOOKS_FILE = "data/books.txt";
    private static final String MEMBERS_FILE = "data/members.txt";

    // =========================
    // SAVE BOOKS
    // =========================
    public void saveBooks(List<Book> books) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(BOOKS_FILE))) {

            for (Book book : books) {
                writer.write(
                        book.getIsbn() + "," +
                        book.getTitle() + "," +
                        book.getAuthor() + "," +
                        book.getYear() + "," +
                        book.isAvailable() + "," +
                        (book.getBorrowedBy() == null ? "null" : book.getBorrowedBy()) + "," +
                        (book.getDueDate() == null ? "null" : book.getDueDate())
                );
                writer.newLine();
            }

        } catch (IOException e) {
            System.out.println("Error saving books: " + e.getMessage());
        }
    }

    // =========================
    // LOAD BOOKS
    // =========================
    public List<Book> loadBooks() {
        List<Book> books = new ArrayList<>();
        File file = new File(BOOKS_FILE);

        if (!file.exists()) {
            return books; // return empty list if file doesn't exist
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {

            String line;
            while ((line = reader.readLine()) != null) {

                String[] parts = line.split(",");

                Book book = new Book(
                        parts[0],
                        parts[1],
                        parts[2],
                        Integer.parseInt(parts[3])
                );

                boolean available = Boolean.parseBoolean(parts[4]);
                book.setAvailable(available);

                if (!parts[5].equals("null")) {
                    book.setBorrowedBy(parts[5]);
                }

                if (!parts[6].equals("null")) {
                    book.setDueDate(LocalDate.parse(parts[6]));
                }

                books.add(book);
            }

        } catch (IOException e) {
            System.out.println("Error loading books: " + e.getMessage());
        }

        return books;
    }

    // =========================
    // SAVE MEMBERS
    // =========================
    public void saveMembers(List<Member> members) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(MEMBERS_FILE))) {

            for (Member member : members) {

                String borrowedBooks = String.join(";", member.getBorrowedBooks());

                writer.write(
                        member.getId() + "," +
                        member.getName() + "," +
                        borrowedBooks
                );
                writer.newLine();
            }

        } catch (IOException e) {
            System.out.println("Error saving members: " + e.getMessage());
        }
    }

    // =========================
    // LOAD MEMBERS
    // =========================
    public List<Member> loadMembers() {
        List<Member> members = new ArrayList<>();
        File file = new File(MEMBERS_FILE);

        if (!file.exists()) {
            return members;
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {

            String line;
            while ((line = reader.readLine()) != null) {

                String[] parts = line.split(",");

                Member member = new Member(parts[0], parts[1]);

                if (parts.length > 2 && !parts[2].isEmpty()) {
                    String[] borrowed = parts[2].split(";");
                    for (String isbn : borrowed) {
                        member.borrowBook(isbn);
                    }
                }

                members.add(member);
            }

        } catch (IOException e) {
            System.out.println("Error loading members: " + e.getMessage());
        }

        return members;
    }
}