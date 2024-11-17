package br.com.mobile.rango.repository;

import br.com.mobile.rango.entities.Restaurante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface IRestauranteRepository extends JpaRepository<Restaurante, Long> {
}
