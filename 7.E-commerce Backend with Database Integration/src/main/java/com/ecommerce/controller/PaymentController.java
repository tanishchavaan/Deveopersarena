package com.ecommerce.controller;

import com.ecommerce.model.entity.Payment;
import com.ecommerce.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/{orderId}")
    public ResponseEntity<Payment> processPayment(@PathVariable Long orderId, @RequestParam String paymentMethod) {
        return ResponseEntity.ok(paymentService.processPayment(orderId, paymentMethod));
    }
}
