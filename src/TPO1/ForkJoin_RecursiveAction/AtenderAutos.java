package TPO1.ForkJoin_RecursiveAction;

import java.util.concurrent.RecursiveAction;

public class AtenderAutos extends RecursiveAction {
    private static final int maxAutos = 3; // Cantidad máxima de autos que atiende cada playero
    private final Automovil[] autos;
    private final int inicio, fin;

    public AtenderAutos(Automovil[] autos, int inicio, int fin) {
        this.autos = autos;
        this.inicio = inicio;
        this.fin = fin;
    }

    @Override
    protected void compute() {
        // Se fija si la cantidad de autos asignados es menor o igual a maxAutos
        int cantidad = fin - inicio;
        int i = inicio;
        if (cantidad <= maxAutos) {
            // Caso Base: La cantidad de autos es menor a maxAutos, no hace falta dividir
            while (i < fin) {
                System.out.println(Thread.currentThread().getName() +
                        " atendiendo a " + autos[i].getNombre());
                try {
                    Thread.sleep(500); // Simula tiempo de carga
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
                i++;
            }
        } else {
            // Caso Recursivo: La cantidad de autos es mayor, entonces divide
            int medio = (inicio + fin) / 2;
            // Crea auxiliares para facilitar la division
            AtenderAutos izquierda = new AtenderAutos(autos, inicio, medio);
            AtenderAutos derecha = new AtenderAutos(autos, medio, fin);
            //
            izquierda.fork();
            derecha.compute();
            izquierda.join();
        }
    }
}


