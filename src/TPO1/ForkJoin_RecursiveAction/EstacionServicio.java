package TPO1.ForkJoin_RecursiveAction;

import java.util.concurrent.ForkJoinPool;

public class EstacionServicio {

    public static void main(String[] args) {
        Automovil[] autos = crearAutomoviles();

       // "Pileta de hilos", usa todos los hilos disponibles
        ForkJoinPool playeros = new ForkJoinPool();

        // Límito para que trabajen 4 hilos
        //ForkJoinPool playeros = new ForkJoinPool(4);

        AtenderAutos atender = new AtenderAutos(autos, 0, autos.length);

        // Envia la tarea "atender" a la pileta de hilos para que trabajen
        playeros.invoke(atender);

        System.out.println("Todos los autos fueron atendidos.");
    }

    public static Automovil[] crearAutomoviles(){
        Automovil[] autos = new Automovil[150];
        Automovil auto;
        String nombre = "";
        for(int i = 0; i < autos.length; i++){
            nombre = String.valueOf(i);
            auto = new Automovil(nombre);
            autos[i] = auto;
        }
        return autos;
    }
}