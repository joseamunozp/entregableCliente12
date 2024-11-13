package com.equipos.productos_cliente.persistance.dto;

import lombok.Data;

@Data
public class JugadorDTO {
    private Long idjugador;
    private String nombre;
    private int edad;
    private Long equipoId; // Solo el ID del equipo
    private String equipoNombre; // Para el nombre del equipo
}