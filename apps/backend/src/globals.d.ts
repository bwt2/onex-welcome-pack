declare namespace NodeJS {
    interface ProcessEnv { // extends default nodejs process.env interface
      PORT?: string;
    }
}