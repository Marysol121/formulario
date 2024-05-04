//Hacer que el contenedor general de preguntas aparaezca al precionar el botón configurar
function mostrarPreguntas() {
    document.getElementById('quiz-form').style.display = 'none';
    document.getElementById('contenedor-preguntas').style.display = 'block';
}

//Configuracion del boton configura
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('configur-question').addEventListener('click', function () {
        const numQuestion = parseInt(document.getElementById('num-preguntas').value);
        const questionContainer = document.getElementById('question-container'); // contenedor general de las preguntas
        questionContainer.innerHTML = ""; // Limpiar preguntas anteriores

        for (let i = 1; i <= numQuestion; i++) {
            const questionWrapper = document.createElement('div'); // contenedor general para cada pregunta
            questionWrapper.classList.add('each-question-format'); // formato conte

            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');

            const questionLabel = document.createElement('label');
            questionLabel.textContent = `Pregunta ${i}: `;
            questionDiv.appendChild(questionLabel);

            const selectInput = document.createElement('select');
            selectInput.classList.add('question-type');
            selectInput.innerHTML = `
                <option value="label">Tipo de pregunta</option>
                <option value="text">Pregunta de texto</option>
                <option value="true-false">Pregunta de Verdadero o Falso</option>
                <option value="multiple-choice">Pregunta de opción múltiple</option>
            `;
            questionDiv.appendChild(selectInput);

            const answerContainer = document.createElement('div');
            answerContainer.classList.add('contenedor-respuesta');

            // Agregar evento change al selector de tipo de pregunta
            selectInput.addEventListener('change', function () {
                answerContainer.innerHTML = ""; // Limpiar contenido actual

                const selectedValue = selectInput.value;

                //Contenido de la pregunta
                const titleInput = document.createElement('input');
                titleInput.type = 'text';
                titleInput.placeholder = 'Contenido de la pregunta';
                titleInput.classList.add('question-title');
                answerContainer.appendChild(titleInput);

                // Crea los elementos según el tipo de pregunta seleccionado
                if (selectedValue === 'text') {
                    const textInput = document.createElement('input');
                    textInput.type = 'text';
                    textInput.placeholder = 'Ingrese su respuesta aquí';
                    answerContainer.appendChild(textInput);
                } else if (selectedValue === 'true-false') {
                    // Crear los botones de opción
                    const rad1 = document.createElement("input");
                    rad1.type = "radio";
                    rad1.name = `verdadero${i}`;
                    rad1.id = "rad1";
                    rad1.value = "verdadero";
                    const label1 = document.createElement("label");
                    label1.htmlFor = "rad1";
                    label1.textContent = "Verdadero";
                    label1.style.marginRight = "5px"; // Ajustar el margen derecho
                    label1.style.display = "inline"; // Mostrar en línea
                    const rad2 = document.createElement("input");
                    rad2.type = "radio";
                    rad2.name = `verdadero${i}`;
                    rad2.id = "rad2";
                    rad2.value = "falso";
                    const label2 = document.createElement("label");
                    label2.htmlFor = "rad2";
                    label2.textContent = "Falso";
                    label2.style.marginRight = "5px"; // Ajustar el margen derecho
                    label2.style.display = "inline"; // Mostrar en línea

                    // Agregar los botones de opción al contenedor de respuestas
                    answerContainer.appendChild(rad1);
                    answerContainer.appendChild(label1);
                    answerContainer.appendChild(rad2);
                    answerContainer.appendChild(label2);
                } else if (selectedValue === 'multiple-choice') {
                    // Crear los elementos para la opción múltiple
                    const addOptionButton = document.createElement('button');
                    addOptionButton.textContent = 'Agregar Opción';
                    addOptionButton.classList.add('add-option-button');

                    // Agregar evento al botón "Agregar Opción"
                    addOptionButton.addEventListener('click', function () {
                        // Crear un contenedor para la opción
                        const optionContainer = document.createElement('div');
                        optionContainer.classList.add('option-container');

                        // Crear el checkbox
                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';

                        // Crear la caja de texto para escribir la opción
                        const optionText = document.createElement('input');
                        optionText.type = 'text';
                        optionText.placeholder = 'Ingrese una opción';

                        // Agregar el checkbox y la caja de texto al contenedor de la opción
                        optionContainer.appendChild(checkbox);
                        optionContainer.appendChild(optionText);

                        // Insertar el contenedor de la opción antes del botón "Agregar Opción"
                        answerContainer.insertBefore(optionContainer, addOptionButton);
                    });

                    // Agregar el botón "Agregar Opción"
                    answerContainer.appendChild(addOptionButton);
                }
            });

            questionWrapper.appendChild(questionDiv);
            questionWrapper.appendChild(answerContainer);
            questionContainer.appendChild(questionWrapper);
        }

        document.getElementById('contenedor-preguntas').style.display = 'block';
    });
    
    document.getElementById('add-question').addEventListener('click', function () {
        // Recopilar respuestas de preguntas
        const responses = document.querySelectorAll('.each-question-format');
        let result = "";
        responses.forEach((response, index) => {
            const question = response.querySelector('.question-title').value;
            let answer = "";
            if (response.querySelector('.contenedor-respuesta input[type="text"]')) {
                answer = response.querySelector('.contenedor-respuesta input[type="text"]').value;
            } else if (response.querySelector('.contenedor-respuesta input[type="checkbox"]')) {
                const checkboxes = response.querySelectorAll('.contenedor-respuesta input[type="checkbox"]');
                checkboxes.forEach((checkbox) => {
                    if (checkbox.checked) {
                        answer += checkbox.nextElementSibling.value + ", ";
                    }
                });
                // Eliminar la coma y el espacio al final
                answer = answer.slice(0, -2);
            } else if (response.querySelector('.contenedor-respuesta input[type="radio"]')) {
                const radio = response.querySelector('.contenedor-respuesta input[type="radio"]:checked');
                if (radio) {
                    answer = radio.nextElementSibling.textContent;
                }
            }
            result += `Pregunta ${index + 1}: Enunciado: ${question}, Respuesta: ${answer}\n`;
        });
        document.getElementById('respuesta-cuestionario').textContent = result;
    });
});