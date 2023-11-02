class Jugador{
    constructor(id, nombre){
        this.id = id;
        this.nombre = nombre;
    }

    // jugar(){}

    getId(){
        return this.id;
    }
    
    getNombre(){
        return this.nombre;
    }

    setNombre(nombre){
        this.nombre = nombre;
    }

}