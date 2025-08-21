package TPO1;

import java.net.http.*;
import java.net.URI;

public class WeatherNow {
    public static String get(String city) throws Exception {
        var client = HttpClient.newHttpClient();
        var req = HttpRequest.newBuilder(URI.create("https://wttr.in/" + city + "?format=3")).build();

        return client.send(req, HttpResponse.BodyHandlers.ofString()).body();

    }

    public static void main(String[] args) throws Exception {
        System.out.println(get("Salta"));
    }
}
