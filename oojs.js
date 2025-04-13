// Alaposztály
class Animal {
    constructor(name) {
      this.name = name;
    }
  
    speak() {
      return `${this.name} hangot ad.`;
    }
  
    render() {
      const p = document.createElement("p");
      p.textContent = this.speak();
      document.body.appendChild(p);
    }
  }
  
  // Leszármazott osztály
  class Dog extends Animal {
    constructor(name, breed) {
      super(name); // hivatkozás a szülő konstruktorára
      this.breed = breed;
    }
  
    speak() {
      return `${this.name} (${this.breed}) ugat: Vau vau!`;
    }
  }
  
  // Példányosítás és DOM-hoz adás
  const dog = new Dog("Bodri", "Puli");
  dog.render();
  