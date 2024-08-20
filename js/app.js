// creando variables
const textoInput = document.querySelector('.text-input'),
    encriptarBtn = document.querySelector('.btn-encriptar'),
    desencriptarBtn = document.querySelector('.btn-desencriptar'),
    resultado = document.querySelector('.result'),
    copiarBtn = document.querySelector('.btn-copy'),
    imagen = document.querySelector('.img-result'),
    areaResult = document.querySelector('.area-result'),
    textResult = document.querySelector('.text-result')


// Creando Funciones
function encriptarTexto(texto) {
    const reglas = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    let textoEncriptado = texto;
    for (const letra in reglas) {
        textoEncriptado = textoEncriptado.replace(new RegExp(letra, 'g'), reglas[letra]);
    }
    return textoEncriptado;
}

function desencriptarTexto(texto) {
    const reglas = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };

    let textoDesencriptado = texto;
    for (const letra in reglas) {
        textoDesencriptado = textoDesencriptado.replace(new RegExp(letra, 'g'), reglas[letra]);
    }
    return textoDesencriptado;
}

// para limpiar la caja
const limpiarCaja = () => document.querySelector('.text-input').value = '';

// mostrar boton copiar y ocultar img
function mostrarBtn() {
    // Si el boton está oculta, mostrarlo
    if(copiarBtn.classList.contains('hidden')) {
        copiarBtn.classList.remove('hidden');
        imagen.classList.add('hidden');
        textResult.classList.add('hidden');
    }
}

function alturaResultadoTextarea() {
    if(!resultado.classList.contains('height')) {
        resultado.classList.add('height');
    }
}

function alinearTextStart() {
    if(!resultado.classList.contains('text-aling')) {
        resultado.classList.add('text-aling');
    }
}

// Funcion para eliminar caracteres especiales
document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.querySelector('.text-input');

    textInput.addEventListener('input', function(e) {
        let texto = this.value;
        
        // Reemplazar 'ñ' por 'n'
        texto = texto.replace(/ñ/g, 'n');
        
        // Eliminar acentos de las vocales
        texto = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        // Eliminar signos de puntuación y números
        texto = texto.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()¿¡0-9"'´`]/g, '');
        
        // Actualizar el valor del textarea
        this.value = texto;
    });
});

// Encriptar
encriptarBtn.addEventListener('click', () => {
    const texto = textoInput.value.toLowerCase();
    if (texto === '') {
        alert('Ingrese el texto que desea encriptar')
        return;
    }else if (!/^[a-z\s]*$/.test(texto)) {
        alert('Solo se permiten letras minúsculas y espacios. No se deben utilizar letras con acentos ni caracteres especiales.');
        return;
    }
    limpiarCaja()
    mostrarBtn()
    alinearTextStart()
    alturaResultadoTextarea()
    resultado.value = encriptarTexto(texto);
});

// Desencriptar
desencriptarBtn.addEventListener('click', () => {
    const texto = textoInput.value.toLowerCase();
    if (texto === '') {
        alert('Ingrese el texto que desea desencriptar')
        return;
    }else if (!/^[a-z\s]*$/.test(texto)) {
        alert('Solo se permiten letras minúsculas y espacios. No se deben utilizar letras con acentos ni caracteres especiales.');
        return;
    }
    limpiarCaja()
    mostrarBtn()
    alinearTextStart()
    alturaResultadoTextarea()
    resultado.value = desencriptarTexto(texto);
});

// Copiar
document.addEventListener('DOMContentLoaded', function() {
    // ajustar el textarea de input
    textoInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    copiarBtn.addEventListener('click', function() {
        resultado.select();
        resultado.setSelectionRange(0, 99999); // Para dispositivos móviles

        navigator.clipboard.writeText(resultado.value)
            .then(function() {
                // Crea el elemento del aviso
                const aviso = document.createElement('div');
                aviso.textContent = 'Texto copiado';
                aviso.style.position = 'fixed'; // Para que aparezca encima del contenido
                aviso.style.top = '100px'; 
                aviso.style.left = '50%';
                aviso.style.transform = 'translateX(-50%)'; // Centrar horizontalmente
                aviso.style.backgroundColor = '#4CAF50'; // Verde para éxito
                aviso.style.color = 'white';
                aviso.style.padding = '15px 30px';
                aviso.style.borderRadius = '5px';
                aviso.style.zIndex = '1000'; // Asegurar que esté encima de otros elementos

                document.body.appendChild(aviso); 

                // Elimina el aviso después de 2 segundos
                setTimeout(function() {
                    document.body.removeChild(aviso);
                }, 2000);
            })
            .catch((error) => console.error('Error al copiar el texto: ', error));
    });
});


