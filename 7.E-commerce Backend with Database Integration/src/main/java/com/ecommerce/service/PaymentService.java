package com.ecommerce.service;

import com.ecommerce.exception.PaymentFailedException;
import com.ecommerce.model.entity.Order;
import com.ecommerce.model.entity.Payment;
import com.ecommerce.model.enums.OrderStatus;
import com.ecommerce.model.enums.PaymentStatus;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    @Transactional
    public Payment processPayment(Long orderId, String paymentMethod) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new PaymentFailedException("Order is not in a valid state for payment processing");
        }

        // Mock payment processing logic setup
        boolean paymentSuccess = mockPaymentGateway(order.getTotalAmount().doubleValue());
        
        Payment payment = Payment.builder()
                .order(order)
                .amount(order.getTotalAmount())
                .paymentMethod(paymentMethod)
                .transactionId(UUID.randomUUID().toString())
                .build();

        if (paymentSuccess) {
            payment.setStatus(PaymentStatus.COMPLETED);
            order.setStatus(OrderStatus.PROCESSING);
        } else {
            payment.setStatus(PaymentStatus.FAILED);
            throw new PaymentFailedException("Payment gateway declined transaction");
        }
        
        orderRepository.save(order);
        return paymentRepository.save(payment);
    }

    private boolean mockPaymentGateway(double amount) {
        // Simulate an external API call
        return true; 
    }
}
