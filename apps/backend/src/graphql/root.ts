// The root provides a resolver function for each API endpoint

const fakeDatabase: Record<string, MessageInput> = {};

interface MessageInput {
    content: string,
    author: string
}

export const root = {
    quoteOfTheDay() : string {
        return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
    },
    random() : number {
        return Math.random();
    },
    getDie({ numSides } : { numSides : number }) : RandomDie {
        return new RandomDie(numSides || 6);
    },
    getMessage({ id } : { id : string }) : Message {
        if (!fakeDatabase[id]) {
          throw new Error('no message exists with id ' + id);
        }
        return new Message(id, fakeDatabase[id]);
    },
    createMessage({ input } : { input: MessageInput }) : Message {
        // Create a "random" id for our "database".
        const id: string = String(Math.floor(Math.random() * 100));
        
        fakeDatabase[id] = input;
        return new Message(id, input);
    },
    updateMessage({ id, input } : { id: string, input: MessageInput }) : Message {
        if (!fakeDatabase[id]) {
            throw new Error('no message exists with id ' + id);
        }
        // This replaces all old data, but some apps might want partial update.
        fakeDatabase[id] = input;
        return new Message(id, input);
    },
};

class Message {
    id: string
    content: string
    author: string

    constructor(id: string, input: MessageInput) {
        this.id = id;
        this.content = input.content;
        this.author = input.author;
    }
}

class RandomDie {
    numSides: number

    constructor(numSides: number) {
      this.numSides = numSides;
    }
   
    rollOnce() : number {
      return 1 + Math.floor(Math.random() * this.numSides);
    }
   
    roll({ numRolls } : { numRolls : number }) : number[] {
      const output : number[] = [];
      for (let i = 0; i < numRolls; i++) {
        output.push(this.rollOnce());
      }
      return output;
    }
}