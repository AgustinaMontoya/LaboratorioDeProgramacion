package TPO1.Adapter;

import TPO1.WeatherNow.WeatherNowFahrenheit;

public class ClimaFahrenheit {

    private WeatherNowFahrenheit weatherNow;
    private double temperatura;
    private String ciudad;

    public ClimaFahrenheit(String ciudad) throws Exception {
        weatherNow = new WeatherNowFahrenheit();
        temperatura = weatherNow.obtenerTemperatura(ciudad);
        this.ciudad = ciudad;
    }

    public void actualizarTemperatura() throws Exception {
        temperatura = weatherNow.obtenerTemperatura(ciudad);
    }

    public double getTemperatura() {
        return this.temperatura;
    }

    public String getCiudad() {
        return this.ciudad;
    }
}
