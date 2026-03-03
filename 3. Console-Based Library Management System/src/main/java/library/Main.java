package library;

import java.util.List;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Library library = new Library();
        Scanner scanner = new Scanner(System.in);

        int choice;

        do {
            System.out.println("\n=== LIBRARY MANAGEMENT SYSTEM ===");
            System.out.println("1. Add New Book");
            System.out.println("2. View All Books");
            System.out.println("3. Search Books");
            System.out.println("4. Register Member");
            System.out.println("5. Borrow Book");
            System.out.println("6. Return Book");
            System.out.println("7. View Library Statistics");
            System.out.println("8. Exit");
            System.out.print("Enter your choice: ");

            while (!scanner.hasNextInt()) {
                System.out.println("Please enter a valid number.");
                scanner.next();
            }

            choice = scanner.nextInt();
            scanner.nextLine(); // clear buffer

            switch (choice) {

                case 1:
                    System.out.print("Enter ISBN: ");
                    String isbn = scanner.nextLine();

                    System.out.print("Enter Title: ");
                    String title = scanner.nextLine();

                    System.out.print("Enter Author: ");
                    String author = scanner.nextLine();

                    System.out.print("Enter Year: ");
                    int year;
                    while (!scanner.hasNextInt()) {
                        System.out.println("Enter valid year.");
                        scanner.next();
                    }
                    year = scanner.nextInt();
                    scanner.nextLine();

                    Book book = new Book(isbn, title, author, year);
                    library.addBook(book);
                    break;

                case 2:
                    library.displayAllBooks();
                    break;

                case 3:
                    System.out.print("Enter keyword to search: ");
                    String keyword = scanner.nextLine();

                    List<Book> results = library.searchBooks(keyword);
                    if (results.isEmpty()) {
                        System.out.println("No books found.");
                    } else {
                        for (Book b : results) {
                            System.out.println(b);
                        }
                    }
                    break;

                case 4:
                    System.out.print("Enter Member ID: ");
                    String memberId = scanner.nextLine();

                    System.out.print("Enter Member Name: ");
                    String memberName = scanner.nextLine();

                    Member member = new Member(memberId, memberName);
                    library.registerMember(member);
                    break;

                case 5:
                    System.out.print("Enter ISBN to borrow: ");
                    String borrowIsbn = scanner.nextLine();

                    System.out.print("Enter Member ID: ");
                    String borrowMemberId = scanner.nextLine();

                    library.borrowBook(borrowIsbn, borrowMemberId);
                    break;

                case 6:
                    System.out.print("Enter ISBN to return: ");
                    String returnIsbn = scanner.nextLine();

                    System.out.print("Enter Member ID: ");
                    String returnMemberId = scanner.nextLine();

                    library.returnBook(returnIsbn, returnMemberId);
                    break;

                case 7:
                    library.displayStatistics();
                    break;

                case 8:
                    System.out.println("Exiting system. Goodbye!");
                    break;

                default:
                    System.out.println("Invalid choice. Try again.");
            }

        } while (choice != 8);

        scanner.close();
    }
}