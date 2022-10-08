import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";

function App() {

    const [data, setData] = useState({
        symbol: '',
        number: '',
        result: ''
    });

    const op = ['-', '+', '/', '*'];
    const btnValues = [
        ['0', '1', '2', '3'],
        ['4', '5', '6', '7'],
        ['8', '9', '+', '-'],
        ['*', '/', '=', 'c'],
    ];

    const handleClicker = param => {
        //setData({number: params})

        switch (param) {
            case 'c':
                clearChecker(param);
                break;
            case '=':
                resultChecker(param);
                break;
            case '+':
            case '-':
            case '*':
            case '/':
                symbolChecker(param);
                break;
            default:
                numberClicker(param)
        }

    }

    const clearChecker = () => {
        setData({
            ...data,
            symbol: '',
            number: '',
            result: '',
        })
    }

    const math = (a, b, sign) => {
        return sign === '+' ? a + b : sign === '-' ? a - b : sign === '*' ? a * b : a / b;
    }

    const handleCalculation = (number, callback) => {

        let stack = "";
        let secStack = "";
        let currentOp = "";
        let sCheck = false;
        let r = 0

        for (const i in number) {
            let item = number[i]

            //console.log(item, Number(item))
            if(item && (item == 0 || Number(item))) {
                if (sCheck) {
                    secStack = secStack + item;
                } else {
                    stack = stack + item;
                }
            } else if(op.includes(item)) {
                if (sCheck) {
                    let res = math(parseFloat(stack), parseFloat(secStack), currentOp)

                    let t = String(res);
                    let newNumber = number.slice(i)
                        console.log('sCheck', `${t}${newNumber}`)

                    // return handleCalculation(`${t}${newNumber}`, response => {
                    //     r = t;
                    //     return callback(response)
                    // })
                    // ends
                }

                currentOp = item
                sCheck = true;
            }
        }
    }

    const resultChecker = () => {
        if (data.symbol != "") return;
        let number = data.number;
        //9115/5

        handleCalculation(number, res => {
          console.log('total number', res)
        })

    }

// 120 2
    //  120*2-40/2
    // ((120*2)-40) / 2
    // (120*2)

    // 24

    // -23+3/34/-23+3
    //15+2-9*/
    //15+2-9/
    //15+2-9*

    const symbolChecker = (value) => {
        let number = '';
        if (op.includes(value)) {

            if(data.symbol === value) return;
            if(data.symbol && data.symbol != "") {
                number = data.number.slice(0,-1) + value;
            } else {
                number = data.number + value
            }

            setData({
                ...data,
                number,
                symbol: value
            })
        }
    }

    const numberClicker = (value) => { // need more work

        let number = '0';
        if(data.number == '0') {
            number = value
        } else {
            number = data.number + value
        }

        setData({
            ...data,
            symbol: "",
            number
        })
    }

    return (
        <div className="App">

            <p className={'value'}>{data.number}</p>
            <div>
                <div>
                    {btnValues.map((btnNode, i) =>
                        <div className={'break'} key={i}>
                            {btnNode.map((btn, index) => <button key={index} onClick={() => handleClicker(btn)}> {btn}</button>)}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}

export default App;
