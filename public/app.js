addEventListener("load", (event) => {
        document.getElementById('apiForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        loadData();
    });

    document.getElementById('insertForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const baseUrl = document.getElementById('baseUrl').value;
        const insertEndpoint = document.getElementById('insert').value;

        if (!baseUrl || !insertEndpoint) {
            alert('La URL base y el endpoint de inserción son obligatorios.');
            return;
        }

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        fetch(baseUrl + insertEndpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => {
                if (res.ok) {
                    alert('Producto insertado correctamente');
                    location.reload();
                } else {
                    alert('Error al insertar el producto');
                }
            })
            .catch(err => alert('Error: ' + err.message));
    });

    loadData(); // enviar el formulario automaticamente al cargar la pagina
});

function loadData() {
    const baseUrl = document.getElementById('baseUrl').value;
    const getAll = document.getElementById('getAll').value;
    const insert = document.getElementById('insert').value;
    const edit = document.getElementById('edit').value;
    const deleteEndpoint = document.getElementById('delete').value;

    if (!baseUrl || !getAll || !insert || !edit || !deleteEndpoint) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    fetch(baseUrl + getAll)
    .then(res => res.json())
    .then(data => {
        const contentDiv = document.getElementById('content');
        contentDiv.innerHTML = ''; // Limpiar el contenido previo

        // Verificar si hay datos
        if (data.length === 0) {
            contentDiv.textContent = 'No hay datos disponibles.';
            return;
        }

        const table = document.createElement('table');
        const headers = Object.keys(data[0]);
        const headerRow = document.createElement('tr');

        // Crear encabezados de la tabla
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        headerRow.appendChild(document.createElement('th')).textContent = 'Acciones';
        table.appendChild(headerRow);

        // Crear filas para cada elemento
        data.forEach(item => {
            const row = document.createElement('tr');
            headers.forEach(key => {
                const td = document.createElement('td');
                td.textContent = item[key];
                row.appendChild(td);
            });

            const actionsTd = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.onclick = () => {
                const formData = {};
                Object.entries(item).forEach(([key, value]) => {
                    if (key !== 'id') {
                        const newValue = prompt(`Editar ${key}`, value);
                        if (newValue !== null) formData[key] = newValue;
                    }
                });
                fetch(baseUrl + edit.replace('{id}', item.id), {
                    method: 'PUT',
                    body: JSON.stringify(formData),
                    headers: { 'Content-Type': 'application/json' },
                }).then(() => location.reload());
            };

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.onclick = () => {
                fetch(baseUrl + deleteEndpoint.replace('{id}', item.id), { method: 'DELETE' }).then(() => location.reload());
            };

            actionsTd.appendChild(editButton);
            actionsTd.appendChild(deleteButton);
            row.appendChild(actionsTd);
            table.appendChild(row);
        });

        contentDiv.appendChild(table);
    })
    .catch(err => alert('Error: ' + err.message));
}