package TPO1.Adapter;

public class ClimaCelcius {

    private WeatherNow climaActual;
    private double temperatura;
    private String ciudad;

    public ClimaCelcius(String ciudad) throws Exception {
        climaActual = new WeatherNow();
        temperatura = climaActual.obtenerTemperatura(ciudad, 'c');
        this.ciudad = ciudad;
    }

    public void actualizarTemperatura() throws Exception {
        temperatura = climaActual.obtenerTemperatura(ciudad, 'c');
    }

    public double getTemperatura() {
        return this.temperatura;
    }

    public String getCiudad() {
        return this.ciudad;
    }
}
