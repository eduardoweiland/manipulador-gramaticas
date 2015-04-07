/**
 * @class Grammar
 */
function Grammar() {
    this.init.apply(this, arguments);
}

(function(Grammar) {
    'use strict';

    var GRAMMAR_SYMBOL = 'G';

    /**
     * Retorna a intersecção entre dois array.
     *
     * @private
     */
    function arrayIntersection(a, b) {
        return a.filter(function(i) {
            return b.indexOf(i) > -1;
        });
    }

    Grammar.prototype = {

        /**
         * @constructor
         */
        init: function() {
            this.nonTerminalSymbols    = [];
            this.terminalSymbols       = [];
            this.productionSetSymbol   = 'P';
            this.productionStartSymbol = 'S';

            // Erros de validação.
            this.errors = null;
        },

        /**
         * Verifica se a gramática é válida.
         *
         * @return {boolean} Se a gramática é válida ou não.
         */
        validate: function() {
            var err = [],
                nt  = this.nonTerminalSymbols,
                t   = this.terminalSymbols,
                p   = this.productionSetSymbol,
                s   = this.productionStartSymbol;

            // 1. Símbolos terminais e não terminais precisam ser diferentes
            var intersect = arrayIntersection(nt, t);
            if (intersect.length > 0) {
                err.push('Existem símbolos não terminais repetidos entre os '
                        + 'símbolos terminais (' + intersect.join(', ') + ').');
            }

            // 2.1. Símbolo de início de produção deve ser não terminal
            if (nt.indexOf(s) === -1) {
                err.push('O símbolo de início de produção (' + s + ') não está '
                        + 'entre os símbolos não terminais.');
            }

            // 2.2. Símbolo de início de produção NÃO deve ser terminal
            if (t.indexOf(s) > -1) {
                err.push('O símbolo de início de produção (' + s + ') não pode '
                        + 'estar entre os símbolos terminais.');
            }

            // 3. Deve haver uma produção para o símbolo de início de produção
            // TODO

            // 4. Não deve existir mais de uma produção para o mesmo símbolo
            // TODO

            // Salva a lista de erros de validação e retorna o estado.
            this.errors = err.length ? err : null;
            return !err.length;
        },

        /**
         * Retorna os erros encontados durante a validação da gramática.
         *
         * @return {string[]} Array com as mensagens dos erros encontrados
         * durante a última validação executada.
         * @throws {Error} Se a gramática não possui erros para retornar.
         */
        getErrors: function() {
            if (this.errors === null) {
                throw new Error('Nenhum erro na gramática.');
            }

            return this.errors;
        },

        /**
         * Monta a string que representa o formalismo da gramática, sem incluir
         * o conjunto de regras de produção.
         *
         * @return {string} A representação formal da gramática.
         * @notes Esse método assume que a gramática é válida.
         */
        toFormalismString: function() {
            var str = GRAMMAR_SYMBOL + '('
                    + '{' + this.nonTerminalSymbols.join(', ') + '}, '
                    + '{' + this.terminalSymbols   .join(', ') + '}, '
                    + this.productionSetSymbol + ', '
                    + this.productionStartSymbol + ')';

            return str;
        }

    };    
    
})(Grammar);


(function executeTests() {
	'use strict';

	function test(desc, fn) {
		console.log('========================================');
		console.log(' Testando ' + desc);
		fn();
	}

	test('entrada de uma gramática válida', function() {
		var gramatica = new Grammar();
		gramatica.nonTerminalSymbols    = ['S', 'A', 'B', 'C'];
		gramatica.terminalSymbols       = ['a', 'b'];
		gramatica.productionSetSymbol   = 'P';
		gramatica.productionStartSymbol = 'S';

		var valid = gramatica.validate();
		console.log('Gramática ' + (valid ? '' : 'não ') + 'é válida');

		if (!valid) {
		    console.log('Erros encontrados:');
		    console.log(gramatica.getErrors());
		}
	});

	test('entrada de uma gramática inválida', function() {
		var gramatica = new Grammar();
		gramatica.nonTerminalSymbols    = ['S', 'X', 'b', 'C'];
		gramatica.terminalSymbols       = ['a', 'b', 'S'];
		gramatica.productionSetSymbol   = 'K';
		gramatica.productionStartSymbol = 'S';

		var valid = gramatica.validate();
		console.log('Gramática ' + (valid ? '' : 'não ') + 'é válida');

		if (!valid) {
		    console.log('Erros encontrados:');
		    console.log(gramatica.getErrors());
		}
	});

})();

