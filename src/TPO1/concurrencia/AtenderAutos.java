package TPO1.concurrencia;

import java.util.concurrent.RecursiveAction;

public class AtenderAutos extends RecursiveAction {
    private static final int maxAutos = 3; // Cantidad máxima de autos que atiende cada playero
    private final String[] autos;
    private final int inicio, fin;

    public AtenderAutos(String[] autos, int inicio, int fin) {
        this.autos = autos;
        this.inicio = inicio;
        this.fin = fin;
    }

    @Override
    protected void compute() {
        int cantidad = fin - inicio;
        int i = inicio;

        if (cantidad <= maxAutos) {
            // Caso base: atender directamente a los autos
            while (i < fin) {
                System.out.println(Thread.currentThread().getName() +
                        " atendiendo a " + autos[i]);
                try {
                    Thread.sleep(200); // Simula tiempo de carga
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
                i++;
            }
        } else {
            // Dividir en dos grupos
            int medio = (inicio + fin) / 2;

            AtenderAutos izquierda = new AtenderAutos(autos, inicio, medio);
            AtenderAutos derecha = new AtenderAutos(autos, medio, fin);

            // Ejecutar en paralelo
            izquierda.fork();        // lanza la izquierda en paralelo
            derecha.compute();       // ejecuta la derecha en este hilo
            izquierda.join();        // espera a que termine la izquierda
        }
    }
}


