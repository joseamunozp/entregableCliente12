package com.equipos.productos_cliente;

import com.equipos.productos_cliente.persistance.models.Product;
import com.equipos.productos_cliente.persistance.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(ProductRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                // Insertar productos de prueba
                repository.save(new Product(null, "Producto 1", "Descripción 1", 10.99));
                repository.save(new Product(null, "Producto 2", "Descripción 2", 20.50));
                repository.save(new Product(null, "Producto 3", "Descripción 3", 30.00));
                System.out.println("Productos de prueba insertados");
            }
        };
    }
}