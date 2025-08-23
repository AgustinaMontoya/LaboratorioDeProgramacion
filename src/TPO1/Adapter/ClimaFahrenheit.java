package TPO1.Adapter;

public class ClimaFahrenheit {

    private WeatherNow climaActual;
    private double temperatura;
    private String ciudad;

    public ClimaFahrenheit(String ciudad) throws Exception {
        climaActual = new WeatherNow();
        temperatura = climaActual.obtenerTemperatura(ciudad, 'f');
        this.ciudad = ciudad;
    }

    public void actualizarTemperatura() throws Exception {
        temperatura = climaActual.obtenerTemperatura(ciudad, 'f');
    }

    public double getTemperatura() {
        return this.temperatura;
    }

    public String getCiudad() {
        return this.ciudad;
    }
}
