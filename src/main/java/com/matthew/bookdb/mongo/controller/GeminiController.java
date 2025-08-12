package com.matthew.bookdb.mongo.controller;

import com.matthew.bookdb.mongo.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/gemini")
public class GeminiController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/summary")
    public String getBookSummary(@RequestBody String title) {
        return geminiService.getBookSummary(title);
    }
}
