package TPO1.Adapter;

public class AdaptarTemperatura extends ClimaCelcius {
    private ClimaFahrenheit clima;

    public AdaptarTemperatura(ClimaFahrenheit clima) throws Exception {
        super(clima.getCiudad());
        this.clima = clima;
    }

    @Override
    public double getTemperatura() {
        double temperatura;
        temperatura = (clima.getTemperatura() - 32) * 5 / 9;
        return temperatura;
    }
}
