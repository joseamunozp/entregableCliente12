package com.equipos.productos_cliente.persistance.repository;


import com.equipos.productos_cliente.persistance.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}