package TPO1.concurrencia;

import java.util.concurrent.ForkJoinPool;

public class EstacionServicio {

    public static void main(String[] args) {
        String[] autos = {
                "Auto1", "Auto2", "Auto3", "Auto4",
                "Auto5", "Auto6", "Auto7", "Auto8"
        };

        ForkJoinPool pool = new ForkJoinPool();

        AtenderAutos tarea = new AtenderAutos(autos, 0, autos.length);

        pool.invoke(tarea);

        System.out.println("Todos los autos fueron atendidos.");
    }
}