package br.com.mobile.rango.controller;

import br.com.mobile.rango.entities.Restaurante;
import br.com.mobile.rango.repository.IRestauranteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/restaurantes")
public class RestauranteController {

    @Autowired
    private IRestauranteRepository restauranteRepository;

    // Criar restaurante
    @PostMapping
    public ResponseEntity<String> saveRestaurant(
            @RequestParam("nome") String nome,
            @RequestParam("descricao") String descricao,
            @RequestParam("imagem") MultipartFile imagem) {

        try {
            // Converte o arquivo de imagem em um array de bytes
            byte[] imageBytes = imagem.getBytes();

            // Cria o objeto Restaurante e salva no banco de dados
            Restaurante restaurante = new Restaurante();
            restaurante.setNome(nome);
            restaurante.setDescricao(descricao);
            restaurante.setImagem(imageBytes); // Armazena o conteúdo da imagem no banco

            restauranteRepository.save(restaurante); // Salva no banco

            return ResponseEntity.ok("Restaurante salvo com sucesso!");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Erro ao salvar imagem ou restaurante");
        }
    }
    // Listar todos os restaurantes
    @GetMapping
    public ResponseEntity<List<Restaurante>> listarTodos() {
        List<Restaurante> restaurantes = restauranteRepository.findAll();
        return ResponseEntity.ok(restaurantes);
    }

    // Listar todos os restaurantes
    @GetMapping("/{id}")
    public ResponseEntity<Restaurante> buscarPorId(@PathVariable Long id) {
        Optional<Restaurante> restaurante = restauranteRepository.findById(id);
        if (restaurante.isPresent()) {
            return ResponseEntity.ok(restaurante.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Atualizar restaurante
    @PutMapping("/{id}")
    public ResponseEntity<?> updateRestaurant(
            @PathVariable Long id,
            @RequestParam("nome") String nome,
            @RequestParam("descricao") String descricao,
            @RequestParam(value = "imagem", required = false) MultipartFile imagem) {

        Optional<Restaurante> restauranteOpt = restauranteRepository.findById(id);

        if (restauranteOpt.isPresent()) {
            Restaurante restaurante = restauranteOpt.get();

            restaurante.setNome(nome);
            restaurante.setDescricao(descricao);

            if (imagem != null && !imagem.isEmpty()) {
                try {
                    byte[] imageBytes = imagem.getBytes();
                    restaurante.setImagem(imageBytes); // Atualiza a imagem no banco
                } catch (IOException e) {
                    return ResponseEntity.status(500).body("Erro ao processar imagem");
                }
            }

            restauranteRepository.save(restaurante);
            return ResponseEntity.ok("Restaurante atualizado com sucesso!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Deletar restaurante
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRestaurant(@PathVariable Long id) {
        if (restauranteRepository.existsById(id)) {
            restauranteRepository.deleteById(id);
            return ResponseEntity.ok("Restaurante deletado com sucesso!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
