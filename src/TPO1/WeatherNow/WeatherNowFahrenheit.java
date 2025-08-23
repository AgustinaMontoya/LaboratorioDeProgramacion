package TPO1.WeatherNow;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class WeatherNowFahrenheit {
    public int obtenerTemperatura(String ciudad) throws Exception {
        int temperatura;
        HttpClient cliente = HttpClient.newHttpClient();
        HttpRequest solicitud = HttpRequest.newBuilder(URI.create("https://wttr.in/" + ciudad + "?format=3&u")).build();
        String cuerpo = cliente.send(solicitud, HttpResponse.BodyHandlers.ofString()).body(); // "Salta: 🌦 +16°C"
        String ultimo = cuerpo.trim().substring(cuerpo.lastIndexOf(' ') + 1); // "+16°C"
        temperatura = Integer.parseInt(ultimo.replaceAll("[^0-9+-]", "").trim()); // 16
        return temperatura;
    }
}
