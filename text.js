document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('configur-question').addEventListener('click', function(){
        const numQuestion = parseInt(document.getElementById('num-preguntas').value);
        const questionContainer = document.getElementById('question-container');
        questionContainer.innerHTML = ""; // Limpiar preguntas anteriores, revisar
    
        for(let i=1; i<= numQuestion; i++){
            const questionWrapper = document.createElement('div');
            questionWrapper.classList.add('question-wrapper');
            questionWrapper.classList.add('each-question-fortmt');
    
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
    
            const selectInput = document.createElement('select');
            selectInput.classList.add('question-type');
            selectInput.innerHTML = `
                <option value="text">Pregunta de texto</option>
                <option value="true-false">Pregunta de Verdadero o Falso</option>
                <option value="multiple-choice">Pregunta de opción múltiple</option>
            `;
            questionDiv.appendChild(selectInput);
    
            // Agregar evento change al selector de tipo de pregunta
            selectInput.addEventListener('change', function() {
                const selectedValue = selectInput.value;
                const respuestaContainer = document.createElement('div');
                respuestaContainer.classList.add('respuesta-container');
                const existingRespuestaContainer = questionWrapper.querySelector('.respuesta-container');
                if(existingRespuestaContainer) {
                    questionWrapper.removeChild(existingRespuestaContainer);
                }
                
                // Limpia los elementos anteriores
                respuestaContainer.innerHTML = "";

                // Título de la pregunta
                const titleInput = document.createElement('input');
                titleInput.type = 'text';
                titleInput.placeholder = 'Título de la pregunta';
                titleInput.classList.add('question-title');
                respuestaContainer.appendChild(titleInput);

                // Agregar espacio vertical
                const spacer = document.createElement('div');
                spacer.classList.add('spacer');
                respuestaContainer.appendChild(spacer);

                // Crea los elementos según el tipo de pregunta seleccionado
                if (selectedValue === 'text') {
                    const textInput = document.createElement('input');
                    textInput.type = 'text';
                    textInput.placeholder = 'Ingrese su respuesta aquí';
                    respuestaContainer.appendChild(textInput);
                } else if (selectedValue === 'true-false') {
                    const trueLabel = document.createElement('label');
                    trueLabel.textContent = 'Verdadero';
                    const trueInput = document.createElement('input');
                    trueInput.type = 'radio';
                    trueInput.name = `answer${i}`;
                    trueInput.value = 'verdadero';
                    trueLabel.appendChild(trueInput);
    
                    const falseLabel = document.createElement('label');
                    falseLabel.textContent = 'Falso';
                    const falseInput = document.createElement('input');
                    falseInput.type = 'radio';
                    falseInput.name = `answer${i}`;
                    falseInput.value = 'falso';
                    falseLabel.appendChild(falseInput);
    
                    respuestaContainer.appendChild(trueLabel);
                    respuestaContainer.appendChild(falseLabel);
                } else if (selectedValue === 'multiple-choice') {
                    const optionInput = document.createElement('input');
                    optionInput.type = 'text';
                    optionInput.placeholder = 'Ingrese una opción';
    
                    const addOptionButton = document.createElement('button');
                    addOptionButton.textContent = 'Agregar Opción';
                    addOptionButton.addEventListener('click', function() {
                        const newOptionInput = document.createElement('input');
                        newOptionInput.type = 'text';
                        newOptionInput.placeholder = 'Ingrese una opción';
                        respuestaContainer.insertBefore(newOptionInput, addOptionButton);
                    });
    
                    respuestaContainer.appendChild(optionInput);
                    respuestaContainer.appendChild(addOptionButton);
                }
    
                // Agrega el contenedor de respuestas al contenedor de preguntas
                questionWrapper.appendChild(respuestaContainer);
            });
    
            questionWrapper.appendChild(questionDiv);
            questionContainer.appendChild(questionWrapper);
        }
    
        document.getElementById('contenedor-preguntas').style.display = 'block';
    });
});
