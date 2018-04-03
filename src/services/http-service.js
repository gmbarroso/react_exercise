import 'whatwg-fetch';

class HttpService {

    // var getProducts = functions(){} // É o mesmo que abaixo
    getProducts = () => {

        // Com a Promise eu trago o dado da minha api
        var promise = new Promise((resolve, reject) => {
            // Com o fetch eu to pegando alguma coisa do meu servidor
            // que é o json printado no response
            fetch('http://localhost:3004/product')
                .then(res => {
                    resolve(res.json());
                    // reject("You suck!");
                })
        });

        return promise;
    }
}

export default HttpService;

