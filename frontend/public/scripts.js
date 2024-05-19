document.addEventListener('DOMContentLoaded', () => {
    const origenInput = document.getElementById('origen');
    const destinoInput = document.getElementById('destino');
    const sugerenciasOrigen = document.getElementById('sugerenciasOrigen');
    const sugerenciasDestino = document.getElementById('sugerenciasDestino');
    const listaVuelos = document.getElementById('listaVuelos');
    const mostrarVuelosBtn = document.getElementById('mostrarVuelos');
    const reservaForm = document.getElementById('reservaForm');
    const API_URL = 'https://testpage-t5aw.vercel.app/api/vuelos';

    origenInput.addEventListener('input', () => actualizarSugerencias(origenInput, sugerenciasOrigen));
    destinoInput.addEventListener('input', () => actualizarSugerencias(destinoInput, sugerenciasDestino));

    function actualizarSugerencias(input, sugerencias) {
        const valor = input.value.toLowerCase();
        sugerencias.innerHTML = '';
        if (valor) {
            const coincidencias = countries.filter(pais => pais.toLowerCase().includes(valor));
            coincidencias.forEach(pais => {
                const li = document.createElement('li');
                li.textContent = pais;
                li.addEventListener('click', () => {
                    input.value = pais;
                    sugerencias.innerHTML = '';
                });
                sugerencias.appendChild(li);
            });
        }
    }

    function agregarVueloALaLista(vuelo) {
        const li = document.createElement('li');
        li.innerHTML = `Origen: ${vuelo.origen}, Destino: ${vuelo.destino}, Día: ${vuelo.dia}`;
        listaVuelos.appendChild(li);
    }

    function limpiarFormulario() {
        origenInput.value = '';
        destinoInput.value = '';
        diaInput.value = '';
    }

    document.getElementById('reservaForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const origen = document.getElementById('origen').value;
        const destino = document.getElementById('destino').value;
        const dia = document.getElementById('dia').value;
        
        const vuelo = { origen, destino, dia };
        console.log('Datos del vuelo a enviar:', vuelo);

        fetch('https://testpage-t5aw.vercel.app/api/vuelos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vuelo)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
            agregarVueloALaLista(data);
        })
        .catch(error => console.error('Error en la petición:', error));
    });

    async function fetchVuelos() {
        try {
          const response = await fetch(API_URL);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error en la petición:', error);
          throw error;
        }
      }

      async function saveVuelo(vuelo) {
        try {
          const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(vuelo),
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error en la petición:', error);
          throw error;
        }
    }

});
