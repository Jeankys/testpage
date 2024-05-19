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

    async function cargarVuelos() {
        try {
          const response = await fetch(API_URL);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          mostrarVuelos(data);
        } catch (error) {
          console.error('Error al cargar los vuelos:', error);
        }
    }

    function mostrarVuelos(vuelos) {
        const listaVuelos = document.getElementById('lista-vuelos');
        listaVuelos.innerHTML = '';
        vuelos.forEach(vuelo => {
          const li = document.createElement('li');
          li.textContent = `${vuelo.origen} - ${vuelo.destino} (${vuelo.fecha})`;
          listaVuelos.appendChild(li);
        });
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

        fetch('http://localhost:3001/api/vuelos', {
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

    document.addEventListener('DOMContentLoaded', () => {
        const API_URL = 'https://testpage-t5aw.vercel.app/api/vuelos';
      
        async function cargarVuelos() {
          try {
            const response = await fetch(API_URL);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            mostrarVuelos(data);
          } catch (error) {
            console.error('Error al cargar los vuelos:', error);
          }
        }
      
        function mostrarVuelos(vuelos) {
          const listaVuelos = document.getElementById('lista-vuelos');
          listaVuelos.innerHTML = '';
          vuelos.forEach(vuelo => {
            const li = document.createElement('li');
            li.textContent = `${vuelo.origen} - ${vuelo.destino} (${vuelo.fecha})`;
            listaVuelos.appendChild(li);
          });
        }
      
        document.getElementById('btn-ver-vuelos').addEventListener('click', () => {
          const listaVuelos = document.getElementById('lista-vuelos');
          if (listaVuelos.style.display === 'none' || listaVuelos.style.display === '') {
            cargarVuelos();
            listaVuelos.style.display = 'block';
            document.getElementById('btn-ver-vuelos').textContent = 'Ocultar Todos Los Vuelos Agendados';
          } else {
            listaVuelos.style.display = 'none';
            document.getElementById('btn-ver-vuelos').textContent = 'Ver Todos Los Vuelos Agendados';
          }
        });
      });
    
    // Evento del botón para mostrar/ocultar los vuelos agendados
    document.getElementById('btn-ver-vuelos').addEventListener('click', () => {
        const listaVuelos = document.getElementById('lista-vuelos');
        if (listaVuelos.style.display === 'none' || listaVuelos.style.display === '') {
          cargarVuelos();
          listaVuelos.style.display = 'block';
          document.getElementById('btn-ver-vuelos').textContent = 'Ocultar Todos Los Vuelos Agendados';
        } else {
          listaVuelos.style.display = 'none';
          document.getElementById('btn-ver-vuelos').textContent = 'Ver Todos Los Vuelos Agendados';
        }
      });

});
