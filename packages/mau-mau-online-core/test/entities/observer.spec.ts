import { Evento, Observer, Subject } from "@/entities/observer";

class ConcreteSubject extends Subject {
    private state: any;
  
    public getState(): any {
      return this.state;
    }
  
    public setState(state: any, tipoEvento: string): void {
      this.state = state;
      this.notifyObservers({ tipo: tipoEvento, dados: state });
    }
}
  
class ConcreteObserver implements Observer {
    constructor(private subject: Subject) {
      this.subject.addObserver(this);
    }
  
    public update(evento: Evento): void {
      console.log(`Evento do tipo ${evento.tipo} recebido. Dados: ${JSON.stringify(evento.dados)}`);
    }
  
    public unsubscribe(): void {
      this.subject.removeObserver(this);
    }
}

describe("Observer Pattern", () => {
    let subject: ConcreteSubject;
    let observer1: ConcreteObserver;
    let observer2: ConcreteObserver;
  
    beforeEach(() => {
      subject = new ConcreteSubject();
      observer1 = new ConcreteObserver(subject);
      observer2 = new ConcreteObserver(subject);
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    test("Subject should notify all observers", () => {
      const updateMock = jest.fn();
      observer1.update = updateMock;
      observer2.update = updateMock;
  
      subject.setState("state 1", 'set-state-event');
  
      expect(updateMock).toHaveBeenNthCalledWith(1, { tipo: 'set-state-event', dados: "state 1" });
      expect(updateMock).toHaveBeenNthCalledWith(2, { tipo: 'set-state-event', dados: "state 1" });
    });
  
    test("Observer should unsubscribe from subject", () => {
      const updateMock = jest.fn();
      observer1.update = updateMock;
      observer2.update = updateMock;
  
      observer2.unsubscribe();
      subject.setState("state 2", 'set-state-event');
  
      expect(updateMock).toHaveBeenCalledTimes(1);
    });
  });
  