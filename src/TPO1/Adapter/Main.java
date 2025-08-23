package TPO1.Adapter;

public class Main {

    public static void main(String[] args) throws Exception {
        Aplicacion aplicacion = new Aplicacion(15);
        ClimaCelcius climaCelcius = new ClimaCelcius("neuquen");
        // climaCelcius funciona con la aplicacion.
        System.out.println(aplicacion.comprobarTemperatura(climaCelcius));

        ClimaFahrenheit climaFahrenheit = new ClimaFahrenheit("neuquen");
        // System.out.println(aplicacion.comprobarTemperatura(climaFahrenheit)); // no
        // compila

        // System.out.println("La temperatura en Fahrenheit en "
        // +climaFahrenheit.getCiudad() + " es: " + climaFahrenheit.getTemperatura() +
        // "°F."); // si queremos saber la temperatura en °F.

        // Adaptamos para resolver el problema.
        AdaptarTemperatura adaptaClima = new AdaptarTemperatura(climaFahrenheit);
        System.out.println(aplicacion.comprobarTemperatura(adaptaClima));
    }
}
