package com.equipos.productos_cliente.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.equipos.productos_cliente.persistance.models.Product;
import com.equipos.productos_cliente.persistance.repository.ProductRepository;

import java.util.List;

@Service
public class JugadorService {
    @Autowired
    private ProductRepository jugadorRepository;

    public List<Product> obtenerJugadores() {
        return jugadorRepository.findAll();
    }

    public void crearJugador(Product jugador) {
        jugadorRepository.save(jugador);
    }

    public void borrarJugador(Long id) {
        jugadorRepository.deleteById(id);
    }
}
