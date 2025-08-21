package TPO1;

public class Clima {
    private int gradosFahrenheit;

    public Clima(int gradosFahrenheit) {
        this.gradosFahrenheit = gradosFahrenheit;
    }

    public int getGradosFahrenheit() {
        return this.gradosFahrenheit;
    }

    public String notificacion() {
        return "La temperatura es " + this.gradosFahrenheit + " °K.";
    }
}
