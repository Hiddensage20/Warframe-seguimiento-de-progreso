document.addEventListener('DOMContentLoaded', () => {
    const warframeCards = document.querySelectorAll('.warframe-card');

    warframeCards.forEach(card => {
        card.addEventListener('click', () => {
            let currentState = parseInt(card.dataset.state); // Obtener el estado actual
            const cardType = card.dataset.type; // 'normal' o 'prime'

            // Incrementar el estado
            currentState++;

            // Lógica de reinicio de estados
            if (cardType === 'normal') {
                if (currentState > 3) { // 0 (gris) -> 1 (color) -> 2 (dominado) -> 3 (helminth) -> 0 (gris)
                    currentState = 0;
                }
            } else if (cardType === 'prime') {
                if (currentState > 2) { // 0 (gris) -> 1 (color) -> 2 (dominado) -> 0 (gris)
                    currentState = 0;
                }
            }

            // Actualizar el estado en el dataset
            card.dataset.state = currentState;

            // Remover todas las clases de estado antes de aplicar las nuevas
            card.classList.remove('colored', 'dominated', 'helminth');
            const dominatedMessage = card.querySelector('.status-dominated');
            const helminthMessage = card.querySelector('.status-helminth');

            // Ocultar mensajes por defecto
            if (dominatedMessage) dominatedMessage.style.display = 'none';
            if (helminthMessage) helminthMessage.style.display = 'none';


            // Aplicar clases y mostrar/ocultar mensajes según el nuevo estado
            switch (currentState) {
                case 0:
                    // Gris (estado inicial) - ya no hay clases especiales, solo el filtro por defecto del CSS
                    break;
                case 1:
                    card.classList.add('colored');
                    break;
                case 2:
                    card.classList.add('colored', 'dominated');
                    if (dominatedMessage) dominatedMessage.style.display = 'block';
                    break;
                case 3: // Solo para warframes normales
                    if (cardType === 'normal') {
                        card.classList.add('colored', 'dominated', 'helminth');
                        if (dominatedMessage) dominatedMessage.style.display = 'block';
                        if (helminthMessage) helminthMessage.style.display = 'block';
                    }
                    break;
            }
        });
    });
});
