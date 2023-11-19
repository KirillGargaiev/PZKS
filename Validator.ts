import {TokenName} from "./Utils";

type ValidateErrors = ["StatementNameError", "StatementStartError", "StatementEndError", "StatementContentError", "BracketsError"];


class Valdator {
    
    errors: Record<ValidateErrors[number], number>;
    tokens: TokenName[]
    index:number
    constructor(token: TokenName[]) {
        this.tokens = token;
        this.index = 0;
        this.errors = {
          StatementNameError : 0,
          StatementStartError : 0,
          StatementEndError : 0,
          StatementContentError : 0,
          BracketsError:0
        }
    }
    
    validate(){
    
    }
    findScope(token: TokenName[], index: number):number{
      let cond = 0;
      for ( index; index < token.length; index++){
          if (token[index] == TokenName.LParen){
              cond += 1
          }
          if (token[index] !== TokenName.RParen){
              continue;
          }
          if (cond == 0){
              return token.indexOf(token[index])
          }
          cond -= 1
      }
      this.errors.BracketsError += 1;
      this.index+=1;
      return 0;
    }
    
    identifierRules(){};
    numberRules(){};
    simpleOperationsRules(){};
    complexOperationsRules(){};
}

export default Valdator;