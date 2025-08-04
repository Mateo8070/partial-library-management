package com.matthew.bookdb.aspects;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger LOGGER = LoggerFactory.getLogger(LoggingAspect.class);

    @Before("execution(* com.matthew.bookdb.controller.BookController.*(..))")
    public void logMethodCall() {
        LOGGER.info("A method in BookController was called.");
    }
}
