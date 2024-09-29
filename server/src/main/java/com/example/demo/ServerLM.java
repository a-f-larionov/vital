package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServerLM {

	public static void main(String[] args) {
		var context = SpringApplication.run(ServerLM.class, args);
	}
}