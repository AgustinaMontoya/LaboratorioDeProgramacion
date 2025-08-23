package TPO1.Adapter;

import TPO1.WeatherNow.WeatherNowCelcius;

public class ClimaCelcius {

    private WeatherNowCelcius weatherNow;
    private double temperatura;
    private String ciudad;

    public ClimaCelcius(String ciudad) throws Exception {
        weatherNow = new WeatherNowCelcius();
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
