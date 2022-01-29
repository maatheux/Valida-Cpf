(function main() {
    let input = document.querySelector('#cpf-input');
    let resultContainer = document.querySelector('.result-container');

    function Cpf(str) {
        this.isValid = function () {
            if (
                this.cpfNumber.length !== 11 ||
                typeof this.cpfNumber !== 'string' ||
                this.cpfNumber.match(/\D/g) ||
                str.length < 11 ||
                str.length > 14 ||
                str.match(/\W/g) > 3
            ) {
                return false;
            } else {
                return true;
            }
        };
        this.cpfNumber =
            typeof str !== 'string' ? undefined : str.replace(/\D+/g, '');
    }

    const createResult = msg => {
        if (resultContainer.childNodes.length !== 0) {
            resultContainer.removeChild(resultContainer.lastChild);
        }
        const div = document.createElement('div');
        div.innerText = msg;
        div.style.fontSize = '1.4rem';
        div.style.color = '#0f0f0f';
        resultContainer.appendChild(div);
    };

    const lastTwoNumbersValidation = value => {
        let cpfAux = value.cpfNumber.slice(0, 9);
        let cpfAuxArr = cpfAux.split('');
        for (let auxNum = 10; auxNum < 12; auxNum++) {
            let auxNumTwo = auxNum;
            let sumNumbers = cpfAuxArr.reduce((count, value) => {
                count = count + value * auxNumTwo;
                auxNumTwo--;
                return count;
            }, 0);
            let lastDigit = 11 - (sumNumbers % 11);
            lastDigit < 10
                ? cpfAuxArr.push(String(lastDigit))
                : cpfAuxArr.push('0');
        }
        return cpfAuxArr.join('');
    };

    document.addEventListener('click', e => {
        const element = e.target;
        if (element.classList.contains('submit')) {
            const newCpf = new Cpf(input.value);
            if (newCpf.isValid() === false) {
                createResult('CPF Inválido');
            } else {
                if (lastTwoNumbersValidation(newCpf) === newCpf.cpfNumber) {
                    createResult('CPF Válido');
                } else {
                    createResult('CPF Inválido');
                }
            }
        }
    });
})();
