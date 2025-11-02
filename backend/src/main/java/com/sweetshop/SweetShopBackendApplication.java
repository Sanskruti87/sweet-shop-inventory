package com.sweetshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.sweetshop.model")
@EnableJpaRepositories("com.sweetshop.repository")
public class SweetShopBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(SweetShopBackendApplication.class, args);
    }
}
