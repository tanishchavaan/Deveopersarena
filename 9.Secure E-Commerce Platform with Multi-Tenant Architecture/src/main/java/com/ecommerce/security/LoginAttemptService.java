package com.ecommerce.security;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class LoginAttemptService {

    private final RedisTemplate<String, String> redisTemplate;
    
    private final int MAX_ATTEMPTS = 5;
    private final long LOCK_TIME_DURATION = 15; // 15 minutes lockout

    public void loginSucceeded(String key) {
        redisTemplate.delete("login_attempts:" + key);
    }

    public void loginFailed(String key) {
        String cacheKey = "login_attempts:" + key;
        String attemptsStr = redisTemplate.opsForValue().get(cacheKey);
        int attempts = (attemptsStr == null) ? 0 : Integer.parseInt(attemptsStr);
        attempts++;
        
        redisTemplate.opsForValue().set(cacheKey, String.valueOf(attempts), LOCK_TIME_DURATION, TimeUnit.MINUTES);
    }

    public boolean isBlocked(String key) {
        String cacheKey = "login_attempts:" + key;
        String attemptsStr = redisTemplate.opsForValue().get(cacheKey);
        if (attemptsStr != null) {
            int attempts = Integer.parseInt(attemptsStr);
            return attempts >= MAX_ATTEMPTS;
        }
        return false;
    }
}
