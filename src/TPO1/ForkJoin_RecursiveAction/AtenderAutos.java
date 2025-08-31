package TPO1.ForkJoin_RecursiveAction;

import java.util.concurrent.RecursiveAction;

public class AtenderAutos extends RecursiveAction {
    private static final int maxAutos = 6; // Cantidad máxima de autos que atiende cada playero
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
        if (cantidad <= maxAutos) {
            // Caso Base: La cantidad de autos es menor a maxAutos, no hace falta dividir
            for(int i = inicio; i < fin; i++){
                System.out.println(Thread.currentThread().getName() +
                        " atendiendo auto #" + autos[i].getNombre());
                try {
                    Thread.sleep(500); // Simula tiempo de carga
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        } else {
            // Caso Recursivo: La cantidad de autos es mayor, entonces divide
            int medio = (inicio + fin) / 2;
            // Crea auxiliares para facilitar la division
            AtenderAutos izquierda = new AtenderAutos(autos, inicio, medio);
            AtenderAutos derecha = new AtenderAutos(autos, medio, fin);
            // Divide la tarea del auxiliar izquierdo
            izquierda.fork();
            // Divide el auxiliar derecho y lo ejecuta
            derecha.compute();
            // Ejecuta la tarea dividida del nodo derecho
            izquierda.join();
        }
    }
}


