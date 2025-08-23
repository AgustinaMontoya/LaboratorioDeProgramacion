package TPO1.Adapter;

import java.text.DecimalFormat;

public class Aplicacion {
    private double temperaturaAmbiente;

    public Aplicacion(int temperaturaAmbiente) {
        this.temperaturaAmbiente = temperaturaAmbiente;
    }

    public double getTemperaturaAmbiente() {
        return this.temperaturaAmbiente;
    }

    public String comprobarTemperatura(ClimaCelcius clima) {
        String cadena;
        String ciudad = clima.getCiudad();
        double temperatura = clima.getTemperatura();
        DecimalFormat df = new DecimalFormat("#.##"); // variable para reducir decimales
        if (temperatura >= 30) {
            cadena = "Está caluroso.";
        } else if (temperatura >= 15) {
            cadena = "Está templado.";
        } else {
            cadena = "Está frio.";
        }
        cadena += " La temperatura en " + ciudad + " es: " + df.format(temperatura) + "°C.";
        return cadena;
    }

}
