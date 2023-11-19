import Lexer from "./Lexer";
import Validator from "./Validator";

const temp = "-cos(-&t))/(*(*f)(127.0.0.1"

const lexer = new Lexer(temp);
lexer.getNextToken();
const tokens = lexer.getTokens();
console.log(tokens)

