package com.sena.edu.turistear.external;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class climaService {

    private final RestClient client = RestClient.builder()
            .baseUrl("https://api.open-meteo.com")
            .build();

    public String consultar(double latitud, double longitud) {

        return client.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1/forecast")
                        .queryParam("latitude", latitud)
                        .queryParam("longitude", longitud)
                        .queryParam("current", "temperature_2m,weather_code,wind_speed_10m")
                        .queryParam("timezone", "auto")
                        .build())
                .retrieve()
                .body(String.class);
    }
}