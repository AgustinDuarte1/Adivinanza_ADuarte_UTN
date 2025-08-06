import readline from 'readline';

function adivinaLaLetra(){
    const letras = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const cantidadMaxima = 15;
    const puntajePorAcierto = 100 / cantidadMaxima;

    const letraSecreta = letras[Math.floor(Math.random() * letras.length)];
    
    //Verifica si la letra es mayúscula o minúscula
    const esMayúscula = letraSecreta === letraSecreta.toUpperCase();

    let intentos = 0;
    let puntuacion = 0;
    let adivino = false;

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout  
    });

    if(esMayúscula){
        console.log("Pista: la letra secreta es MAYÚSCULA");
    } else {
        console.log("Pista: la letra secreta es MINÚSCULA");
    }

    function pedirLetra(){
        rl.question(`Intento ${intentos + 1}/${cantidadMaxima}. Adivina la letra: `, (respuesta) => {
            if (respuesta === null){
                console.log('Juego terminado.');
                rl.close();
                return;
            }
      

        respuesta = respuesta.trim();

        // Genera los intentos posibles
        if(respuesta.length !== 1 || !letras.includes(respuesta)){
            console.log('Ingresa una letra válida (a-z - A-Z, sin ll o ñ).');
            pedirLetra();
            return;
        }

        intentos++;

        if(respuesta === letraSecreta){
            adivino = true;

            puntuacion = Math.max(0, Math.round(((cantidadMaxima - intentos + 1) * puntajePorAcierto)));
        

            let rango;
            if(puntuacion >= 80){
                rango = 'Adivinador nato';
            } else if (puntuacion >= 60){
                rango = 'Adivinador experto';
            } else if (puntuacion >= 40){
                rango = 'Adivinador novato';
            } else if (puntuacion >= 1){
                rango = 'Adivinador amateur';
            } else {
                rango = 'No adivinador';
            }

            console.log(`¡Correcto! La letra era "${letraSecreta}".\nPuntaje: ${puntuacion}\nRango: ${rango}`);
            rl.close();
        
        } else {
            console.log('Letra incorrecta. Intenta de nuevo.');
            if(intentos < cantidadMaxima){
                pedirLetra();
            } else {
                console.log(`No adivinaste. La letra era "${letraSecreta}".`);
                rl.close();
            }
        }
    });
    }
    pedirLetra();
}

 


adivinaLaLetra();
    

