/*
 * The MIT License
 *
 * Copyright 2015 eduardo.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

define(['knockout'], function(ko) {
    'use strict';

    function TransitionTable() {
        this.init.apply(this, arguments);
    }

    TransitionTable.prototype = {

        /**
         * @constructs
         */
        init: function() {
            this.symbols = ko.observableArray([]);
            this.states  = ko.observableArray([]);

            this.startState = ko.observable(0);
            this.endStates  = ko.observableArray([0]);

            this.nextStates = [];
        },

        /**
         * Adiciona uma nova linha na tabela para representar um novo estado.
         */
        addState: function() {
            this.states.push('Q' + this.states().length);
            this.nextStates.push(new Array(this.symbols().length).fill(''));
        },

        /**
         * Adiciona uma nova coluna na tabela para representar um símbolo que pode ser reconhecido.
         */
        addSymbol: function() {
            var len = this.symbols().length;
            var symbol = String.fromCharCode((len % 26) + 97);
            this.symbols.push(symbol + String(Math.floor(len / 26) || ''));
            for (var i = 0, l = this.nextStates.length; i < l; ++i) {
                this.nextStates[i].push('');
            }
        },

        /**
         * Remove uma linha (estado) da tabela de transição.
         *
         * @param {number} index Índice da linha para ser removida, começando em 0.
         */
        removeState: function(index) {
            this.states.splice(index, 1);
            this.nextStates.splice(index, 1);
        },

        /**
         * Remove uma coluna (símbolo) da tabela de transição.
         *
         * @param {number} index Índice da coluna para ser removida, começando em 0.
         */
        removeSymbol: function(index) {
            this.symbols.splice(index, 1);
            for (var i = 0, l = this.nextStates.length; i < l; ++i) {
                this.nextStates[i].splice(index, 1);
            }
        },

        setStartState: function(index) {
            this.startState(index);
        },

        toggleEndState: function(index) {
            var pos = this.endStates.indexOf(index);
            if (pos !== -1) {
                this.endStates.splice(pos, 1);
            }
            else {
                this.endStates.push(index);
            }
        }

    };

    return TransitionTable;
});