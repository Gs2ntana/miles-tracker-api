package com.web.project.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.project.repository.UsuarioRepository;
import com.web.project.requests.LoginRequestDTO;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("Deve retornar 200 e Token JWT quando credenciais são válidas")
    void login_Sucesso() throws Exception {
        com.web.project.model.Usuario user = new com.web.project.model.Usuario();
        user.setNome("Tester");
        user.setEmail("auth_test@email.com");
        user.setSenha(passwordEncoder.encode("123456"));
        usuarioRepository.save(user);

        LoginRequestDTO loginRequest = new LoginRequestDTO("auth_test@email.com", "123456");

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists());
    }

    @Test
    @DisplayName("Deve retornar 403 quando senha está errada")
    void login_Falha() throws Exception {
        com.web.project.model.Usuario user = new com.web.project.model.Usuario();
        user.setNome("Tester");
        user.setEmail("errado@email.com");
        user.setSenha(passwordEncoder.encode("123456"));
        usuarioRepository.save(user);

        LoginRequestDTO loginRequest = new LoginRequestDTO("errado@email.com", "senha_errada");

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isForbidden());
    }
}