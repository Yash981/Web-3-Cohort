//practice code

import crypto from 'crypto';

// const input = "100xdevs";
// const hash = crypto.createHash('sha256').update(input).digest('hex');

// console.log(hash)

// Assignment 1
function main(prefix){
    let num = 1;
    while(1){
        let input = num.toString();
        const hash = crypto.createHash('sha256').update(input).digest('hex');
        if(hash.startsWith(prefix)){
            console.log(hash, num);
            break;
        }
        num += 1;

    }

}

main('00000')

// Assignment 2
function main2(prefix){
    let num = 1;
    while(1){
        let input = "100xdevs" + num.toString();
        const hash = crypto.createHash('sha256').update(input).digest('hex');
        if(hash.startsWith(prefix)){
            console.log(hash, num);
            break;
        }
        num += 1;

    }

}

main2('00000')

// Assignment 3
function main3(prefix){
    let number = 1
    while(1){
        let TypeCastedString = `harkirat => Raman | Rs 100
        Ram => Ankit | Rs 10` + number.toString();
        const hash = crypto.createHash('sha256').update(TypeCastedString).digest('hex');
        if(hash.startsWith(prefix)){
            console.log(hash, number,prefix);
            break;
        }
        number += 1;

    }

}
main3("00000")