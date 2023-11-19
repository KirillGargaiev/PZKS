import {TokenName} from "./Utils";

class Lexer {
    input:any;
    current: number;
    tokens:TokenName[] =[]
    constructor(input: string) {
        this.input = input+""
        this.current = 0;
        this.tokens = [];
    }

    getNextToken(){
        for (this.current; this.current < this.input.length; this.current++){
            const currentChar = this.input[this.current];
            switch(currentChar){
                case " ": this.tokens.push(TokenName.WhiteSpace); break;
                case "(": this.tokens.push(TokenName.LParen);break;
                case ")": this.tokens.push(TokenName.RParen);break;
                case "+": this.tokens.push(TokenName.Plus);break;
                case "-": this.tokens.push(TokenName.Minus); break;
                case "/": this.tokens.push(TokenName.Div);break;
                case "**": this.tokens.push(TokenName.MultiplicationOperator); break;
                case "*": this.tokens.push(TokenName.Mul); break;
                default:
                    if(/./){
                        this.isFraction()
                    }
                    if (/^\d$/.test(currentChar)) {
                        this.isNumeric()
                        this.tokens.push(TokenName.NumberLiteral);
                    } else if (/[A-Za-z_]/.test(currentChar)){
                        this.isAlphaNumeric();
                        this.tokens.push(TokenName.Identifier);
                    } else {
                        this.tokens.push(TokenName.ErrorIdentifier)
                }
            }
        }
    }
    isAlphaNumeric(_index?: number, _temp?:string){
        const temp = _temp || this.input.slice(this.current);
        const index = _index || 0
        if (temp[index + 1] && /[A-Za-z_0-9]/.test(temp[index + 1])){
            this.isAlphaNumeric(index + 1, temp)
        }
        else {
            this.current += index
            return;
        }
    }
    isNumeric(_index?: number, _temp?:string, _isDecimal?: boolean){
        const temp = _temp || this.input.slice(this.current);
        const index = _index || 0
        let isDecimal = _isDecimal || false
        if (temp[index + 1] && /[0-9]/.test(temp[index + 1])){
            this.isNumeric(index + 1, temp, _isDecimal)
        } else if (temp[index+2] && /[0-9]/.test(temp[index + 2]) && /./.test(temp[index+1]) && !isDecimal){
            this.isNumeric(index + 1, temp, true)
        }
        else {
            this.current += index
            return;
        }
    }
    isFraction(){
        
    }
    getTokens(){
        return this.tokens
    }
}

export default Lexer