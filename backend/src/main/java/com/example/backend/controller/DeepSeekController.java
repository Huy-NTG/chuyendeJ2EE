package com.example.backend.controller;

import com.example.backend.dto.request.ChatRequest;
import com.example.backend.service.DeepSeekService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class DeepSeekController {

    @Autowired
    private DeepSeekService deepSeekService;

    @PostMapping("/ask")
    public String chat(@RequestBody ChatRequest request) {
        return deepSeekService.askDeepSeek(request.getPrompt());
    }
}
