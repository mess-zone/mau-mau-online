export interface Evento {
    tipo: string;
    dados: any;
}
  
export interface Observer {
    update(evento: Evento): void;
}
  
export class Subject {
    private observers: Observer[] = [];
  
    public addObserver(observer: Observer): void {
      this.observers.push(observer);
    }
  
    public removeObserver(observer: Observer): void {
      const index = this.observers.indexOf(observer);
      if (index !== -1) {
        this.observers.splice(index, 1);
      }
    }
  
    public notifyObservers(evento: Evento): void {
      for (const observer of this.observers) {
        observer.update(evento);
      }
    }
}
