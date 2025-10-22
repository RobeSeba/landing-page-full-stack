/**
 * Dashboard JavaScript - Funcionalidades interactivas para el dashboard
 */

document.addEventListener('DOMContentLoaded', function() {
    // ---- Inicialización ----
    initializeDashboard();

    // ---- Event Listeners ----
    setupEventListeners();

    // ---- Animaciones ----
    runAnimations();

    // ---- Mockups y Datos ----
    setupMockData();
});

/**
 * Inicializa el dashboard y sus componentes
 */
function initializeDashboard() {
    // Inicializar DataTables si existe
    if ($.fn.DataTable && document.getElementById('registrosTable')) {
        $('#registrosTable').DataTable({
            responsive: true,
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json'
            },
            pageLength: 5,
            lengthMenu: [[5, 10, 25, -1], [5, 10, 25, "Todos"]],
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'excel',
                    text: '<i class="bi bi-file-earmark-excel"></i> Excel',
                    className: 'btn btn-sm btn-outline'
                },
                {
                    extend: 'pdf',
                    text: '<i class="bi bi-file-earmark-pdf"></i> PDF',
                    className: 'btn btn-sm btn-outline'
                }
            ],
            initComplete: function() {
                // Animación de entrada para la tabla
                $('.dataTables_wrapper').addClass('appear');
            }
        });
    }

    // Inicializar gráficos si Chart.js está cargado
    initializeCharts();

    // Verificar modo oscuro/claro guardado en localStorage
    checkThemePreference();
}

/**
 * Inicializa los gráficos del dashboard
 */
function initializeCharts() {
    if (window.Chart && document.getElementById('registrosChart')) {
        const ctx = document.getElementById('registrosChart').getContext('2d');
        
        // Datos simulados para el gráfico (se reemplazarían por datos reales)
        const currentDate = new Date();
        const labels = [];
        
        // Generar últimos 10 meses como etiquetas
        for (let i = 9; i >= 0; i--) {
            const month = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            const monthName = month.toLocaleString('es', { month: 'short' });
            labels.push(monthName.charAt(0).toUpperCase() + monthName.slice(1));
        }
        
        // Datos simulados con tendencia creciente
        const data = {
            labels: labels,
            datasets: [{
                label: 'Registros por Mes',
                data: generateRandomData(10, 50, 100, true),
                backgroundColor: 'rgba(0, 230, 230, 0.2)',
                borderColor: '#00e6e6',
                borderWidth: 2,
                tension: 0.3,
                fill: true
            }]
        };
        
        new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(15, 15, 15, 0.8)',
                        titleColor: '#00e6e6',
                        bodyColor: '#ffffff',
                        borderColor: '#00e6e6',
                        borderWidth: 1,
                        padding: 10
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                }
            }
        });
    }

    // Gráfico circular para conversiones (si existe)
    if (window.Chart && document.getElementById('conversionChart')) {
        const ctx = document.getElementById('conversionChart').getContext('2d');
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Inscritos', 'Pendientes', 'Rechazados'],
                datasets: [{
                    data: [65, 25, 10],
                    backgroundColor: [
                        '#00e6e6',
                        '#9b59b6',
                        '#e74c3c'
                    ],
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 2000,
                    easing: 'easeOutCirc'
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                }
            }
        });
    }
}

/**
 * Configura los eventos interactivos del dashboard
 */
function setupEventListeners() {
    // Alternar sidebar
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    const contentWrapper = document.querySelector('.content-wrapper');
    
    // Toggle sidebar en desktop
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            contentWrapper.classList.toggle('expanded');
            
            const isCollapsed = sidebar.classList.contains('collapsed');
            sidebarToggle.innerHTML = isCollapsed ? 
                '<i class="bi bi-chevron-right"></i>' : 
                '<i class="bi bi-chevron-left"></i>';
            
            // Guardar preferencia
            localStorage.setItem('sidebarState', isCollapsed ? 'collapsed' : 'expanded');
        });
    }
    
    // Toggle sidebar en mobile
    if (mobileSidebarToggle) {
        mobileSidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
            document.body.classList.toggle('sidebar-open');
        });
    }

    // Botón de logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animación de confirmación personalizada
            const confirmDialog = document.createElement('div');
            confirmDialog.className = 'confirm-dialog';
            confirmDialog.innerHTML = `
                <div class="confirm-dialog-content">
                    <i class="bi bi-question-circle confirm-icon"></i>
                    <h3>¿Cerrar sesión?</h3>
                    <p>¿Estás seguro de que deseas cerrar sesión?</p>
                    <div class="confirm-actions">
                        <button class="btn btn-outline btn-cancel">Cancelar</button>
                        <button class="btn btn-primary btn-confirm">Confirmar</button>
                    </div>
                </div>
            `;
            document.body.appendChild(confirmDialog);
            
            setTimeout(() => {
                confirmDialog.classList.add('show');
            }, 10);
            
            // Botón cancelar
            confirmDialog.querySelector('.btn-cancel').addEventListener('click', function() {
                confirmDialog.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(confirmDialog);
                }, 300);
            });
            
            // Botón confirmar
            confirmDialog.querySelector('.btn-confirm').addEventListener('click', function() {
                // Animación de cierre
                confirmDialog.classList.add('closing');
                
                // Eliminar cookie de sesión
                document.cookie = 'jwt_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                
                // Animación antes de redireccionar
                setTimeout(() => {
                    // Mostrar pantalla de carga de salida
                    const logoutLoader = document.createElement('div');
                    logoutLoader.className = 'loader-overlay';
                    logoutLoader.innerHTML = `
                        <div class="loader-content">
                            <div class="dashboard-spinner"></div>
                            <p class="loading-text">Cerrando sesión...</p>
                        </div>
                    `;
                    document.body.appendChild(logoutLoader);
                    
                    setTimeout(() => {
                        window.location.href = '../pages/login.html';
                    }, 1000);
                }, 300);
            });
        });
    }

    // Botón de actualizar
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.classList.add('rotating');
            
            // Mostrar mensaje de actualización
            const refreshToast = document.createElement('div');
            refreshToast.className = 'toast-notification';
            refreshToast.innerHTML = `
                <i class="bi bi-arrow-repeat"></i>
                <span>Actualizando datos...</span>
            `;
            document.body.appendChild(refreshToast);
            
            setTimeout(() => {
                refreshToast.classList.add('show');
            }, 10);
            
            // Simular actualización
            setTimeout(() => {
                refreshToast.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(refreshToast);
                    location.reload();
                }, 300);
            }, 1500);
        });
    }

    // Botones de acción en tabla
    setupTableActions();

    // Botón exportar
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            // Mostrar opciones de exportación
            const exportOptions = document.createElement('div');
            exportOptions.className = 'export-options';
            exportOptions.innerHTML = `
                <div class="export-options-content">
                    <h4>Exportar datos</h4>
                    <div class="export-option" data-type="excel">
                        <i class="bi bi-file-earmark-excel"></i>
                        <span>Excel</span>
                    </div>
                    <div class="export-option" data-type="pdf">
                        <i class="bi bi-file-earmark-pdf"></i>
                        <span>PDF</span>
                    </div>
                    <div class="export-option" data-type="csv">
                        <i class="bi bi-file-earmark-text"></i>
                        <span>CSV</span>
                    </div>
                </div>
            `;
            document.body.appendChild(exportOptions);
            
            setTimeout(() => {
                exportOptions.classList.add('show');
            }, 10);
            
            // Cerrar al hacer clic fuera
            exportOptions.addEventListener('click', function(e) {
                if (e.target === exportOptions) {
                    exportOptions.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(exportOptions);
                    }, 300);
                }
            });
            
            // Opciones de exportación
            const options = exportOptions.querySelectorAll('.export-option');
            options.forEach(option => {
                option.addEventListener('click', function() {
                    const type = this.getAttribute('data-type');
                    
                    // Simular exportación
                    exportOptions.classList.remove('show');
                    
                    // Mostrar notificación
                    const exportToast = document.createElement('div');
                    exportToast.className = 'toast-notification';
                    exportToast.innerHTML = `
                        <i class="bi bi-download"></i>
                        <span>Exportando como ${type.toUpperCase()}...</span>
                    `;
                    document.body.appendChild(exportToast);
                    
                    setTimeout(() => {
                        exportToast.classList.add('show');
                    }, 10);
                    
                    // Simular descarga completada
                    setTimeout(() => {
                        exportToast.innerHTML = `
                            <i class="bi bi-check-circle"></i>
                            <span>Exportación completada</span>
                        `;
                        
                        setTimeout(() => {
                            exportToast.classList.remove('show');
                            setTimeout(() => {
                                document.body.removeChild(exportToast);
                            }, 300);
                        }, 1500);
                    }, 1500);
                    
                    setTimeout(() => {
                        document.body.removeChild(exportOptions);
                    }, 300);
                });
            });
        });
    }
}

/**
 * Configura las acciones para cada fila de la tabla
 */
function setupTableActions() {
    // Botones de ver detalle
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener datos de la fila
            const row = this.closest('tr');
            const name = row.cells[0].textContent.trim();
            const email = row.cells[1].textContent.trim();
            const phone = row.cells[2].textContent.trim();
            const comment = row.cells[3].textContent.trim();
            const date = row.cells[4].textContent.trim();
            
            // Crear modal detalle
            const detailModal = document.createElement('div');
            detailModal.className = 'modal-overlay';
            detailModal.innerHTML = `
                <div class="modal-container">
                    <div class="modal-header">
                        <h3>Detalle de Registro</h3>
                        <button class="modal-close">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="detail-header">
                            <div class="detail-avatar">
                                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff" alt="${name}">
                            </div>
                            <div class="detail-info">
                                <h4>${name}</h4>
                                <p>Registrado el ${date}</p>
                            </div>
                        </div>
                        <div class="detail-content">
                            <div class="detail-item">
                                <span class="detail-label"><i class="bi bi-envelope"></i> Correo:</span>
                                <span class="detail-value">${email}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label"><i class="bi bi-telephone"></i> Teléfono:</span>
                                <span class="detail-value">${phone}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label"><i class="bi bi-chat-text"></i> Comentario:</span>
                                <span class="detail-value">${comment}</span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-outline modal-close-btn">Cerrar</button>
                        <button class="btn btn-primary">Contactar</button>
                    </div>
                </div>
            `;
            document.body.appendChild(detailModal);
            
            setTimeout(() => {
                detailModal.classList.add('show');
            }, 10);
            
            // Botones para cerrar modal
            const closeButtons = detailModal.querySelectorAll('.modal-close, .modal-close-btn');
            closeButtons.forEach(closeBtn => {
                closeBtn.addEventListener('click', function() {
                    detailModal.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(detailModal);
                    }, 300);
                });
            });
        });
    });

    // Botones de editar
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener datos de la fila
            const row = this.closest('tr');
            const name = row.cells[0].textContent.trim();
            const email = row.cells[1].textContent.trim();
            const phone = row.cells[2].textContent.trim();
            const comment = row.cells[3].textContent.trim();
            
            // Crear modal edición
            const editModal = document.createElement('div');
            editModal.className = 'modal-overlay';
            editModal.innerHTML = `
                <div class="modal-container">
                    <div class="modal-header">
                        <h3>Editar Registro</h3>
                        <button class="modal-close">×</button>
                    </div>
                    <div class="modal-body">
                        <form id="editForm" class="form">
                            <div class="form-group">
                                <label for="editName"><i class="bi bi-person"></i> Nombre</label>
                                <input type="text" id="editName" class="form-control" value="${name}" required>
                            </div>
                            <div class="form-group">
                                <label for="editEmail"><i class="bi bi-envelope"></i> Correo</label>
                                <input type="email" id="editEmail" class="form-control" value="${email}" required>
                            </div>
                            <div class="form-group">
                                <label for="editPhone"><i class="bi bi-telephone"></i> Teléfono</label>
                                <input type="tel" id="editPhone" class="form-control" value="${phone}" required>
                            </div>
                            <div class="form-group">
                                <label for="editComment"><i class="bi bi-chat-text"></i> Comentario</label>
                                <textarea id="editComment" class="form-control" rows="3">${comment}</textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-outline modal-close-btn">Cancelar</button>
                        <button class="btn btn-primary" id="saveEdit">Guardar cambios</button>
                    </div>
                </div>
            `;
            document.body.appendChild(editModal);
            
            setTimeout(() => {
                editModal.classList.add('show');
            }, 10);
            
            // Botones para cerrar modal
            const closeButtons = editModal.querySelectorAll('.modal-close, .modal-close-btn');
            closeButtons.forEach(closeBtn => {
                closeBtn.addEventListener('click', function() {
                    editModal.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(editModal);
                    }, 300);
                });
            });
            
            // Botón guardar cambios
            const saveButton = editModal.querySelector('#saveEdit');
            saveButton.addEventListener('click', function() {
                const form = editModal.querySelector('#editForm');
                if (form.checkValidity()) {
                    // Simular guardado
                    this.innerHTML = '<i class="bi bi-hourglass-split rotating me-2"></i> Guardando...';
                    this.disabled = true;
                    
                    setTimeout(() => {
                        editModal.classList.remove('show');
                        
                        // Mostrar notificación
                        const saveToast = document.createElement('div');
                        saveToast.className = 'toast-notification success';
                        saveToast.innerHTML = `
                            <i class="bi bi-check-circle"></i>
                            <span>Cambios guardados correctamente</span>
                        `;
                        document.body.appendChild(saveToast);
                        
                        setTimeout(() => {
                            saveToast.classList.add('show');
                            
                            // Actualizar valores en la tabla (simulado)
                            row.cells[0].querySelector('.user-cell').innerHTML = `
                                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(editModal.querySelector('#editName').value)}&background=0D8ABC&color=fff" alt="User">
                                ${editModal.querySelector('#editName').value}
                            `;
                            row.cells[1].textContent = editModal.querySelector('#editEmail').value;
                            row.cells[2].textContent = editModal.querySelector('#editPhone').value;
                            const commentText = editModal.querySelector('#editComment').value;
                            row.cells[3].textContent = commentText.length > 30 ? commentText.substring(0, 30) + '...' : commentText;
                            
                            // Aplicar animación de actualización
                            row.classList.add('updated-row');
                            setTimeout(() => {
                                row.classList.remove('updated-row');
                            }, 2000);
                        }, 10);
                        
                        setTimeout(() => {
                            saveToast.classList.remove('show');
                            setTimeout(() => {
                                document.body.removeChild(saveToast);
                            }, 300);
                        }, 3000);
                        
                        setTimeout(() => {
                            document.body.removeChild(editModal);
                        }, 300);
                    }, 1500);
                } else {
                    form.reportValidity();
                }
            });
        });
    });

    // Botones de eliminar
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener datos de la fila
            const row = this.closest('tr');
            const name = row.cells[0].textContent.trim();
            
            // Crear modal confirmación
            const confirmModal = document.createElement('div');
            confirmModal.className = 'modal-overlay';
            confirmModal.innerHTML = `
                <div class="modal-container delete-confirm">
                    <div class="modal-header">
                        <h3>Confirmar Eliminación</h3>
                        <button class="modal-close">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="delete-warning">
                            <i class="bi bi-exclamation-triangle-fill"></i>
                        </div>
                        <p>¿Estás seguro de que deseas eliminar el registro de <strong>${name}</strong>?</p>
                        <p class="text-danger">Esta acción no se puede deshacer.</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-outline modal-close-btn">Cancelar</button>
                        <button class="btn btn-danger" id="confirmDelete">Eliminar</button>
                    </div>
                </div>
            `;
            document.body.appendChild(confirmModal);
            
            setTimeout(() => {
                confirmModal.classList.add('show');
            }, 10);
            
            // Botones para cerrar modal
            const closeButtons = confirmModal.querySelectorAll('.modal-close, .modal-close-btn');
            closeButtons.forEach(closeBtn => {
                closeBtn.addEventListener('click', function() {
                    confirmModal.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(confirmModal);
                    }, 300);
                });
            });
            
            // Botón confirmar eliminación
            const confirmDeleteBtn = confirmModal.querySelector('#confirmDelete');
            confirmDeleteBtn.addEventListener('click', function() {
                // Simular eliminación
                this.innerHTML = '<i class="bi bi-hourglass-split rotating me-2"></i> Eliminando...';
                this.disabled = true;
                
                setTimeout(() => {
                    // Animación de eliminación
                    row.classList.add('deleting-row');
                    
                    confirmModal.classList.remove('show');
                    
                    // Mostrar notificación
                    const deleteToast = document.createElement('div');
                    deleteToast.className = 'toast-notification warning';
                    deleteToast.innerHTML = `
                        <i class="bi bi-trash"></i>
                        <span>Registro eliminado correctamente</span>
                    `;
                    document.body.appendChild(deleteToast);
                    
                    setTimeout(() => {
                        deleteToast.classList.add('show');
                    }, 10);
                    
                    setTimeout(() => {
                        // Eliminar fila
                        row.remove();
                        
                        deleteToast.classList.remove('show');
                        setTimeout(() => {
                            document.body.removeChild(deleteToast);
                        }, 300);
                    }, 3000);
                    
                    setTimeout(() => {
                        document.body.removeChild(confirmModal);
                    }, 300);
                }, 1500);
            });
        });
    });
}

/**
 * Ejecuta las animaciones del dashboard
 */
function runAnimations() {
    // Loading screen
    const dashboardLoader = document.getElementById('dashboard-loader');
    setTimeout(() => {
        if (dashboardLoader) {
            dashboardLoader.classList.add('hidden');
            setTimeout(() => {
                dashboardLoader.style.display = 'none';
            }, 500);
        }
    }, 1000);

    // Animación de entrada para las tarjetas de estadísticas
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, 300 + (index * 150));
    });

    // Animación para las tablas y gráficos
    const contentCards = document.querySelectorAll('.card:not(.stat-card)');
    contentCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, 800 + (index * 200));
    });

    // Restaurar estado de la sidebar
    const sidebar = document.querySelector('.sidebar');
    const contentWrapper = document.querySelector('.content-wrapper');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    if (sidebar && localStorage.getItem('sidebarState') === 'collapsed') {
        sidebar.classList.add('collapsed');
        contentWrapper.classList.add('expanded');
        
        if (sidebarToggle) {
            sidebarToggle.innerHTML = '<i class="bi bi-chevron-right"></i>';
        }
    }
}

/**
 * Configura datos simulados para el dashboard
 */
function setupMockData() {
    // Añadir números simulados a las tarjetas si no tienen datos
    updateCardNumbers();
    
    // Inicializar contador de notificaciones
    updateNotifications();
}

/**
 * Actualiza los números de las tarjetas estadísticas
 */
function updateCardNumbers() {
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(statValue => {
        if (statValue.innerText.trim() === '') {
            let max = 1000;
            if (statValue.innerText.includes('%')) {
                max = 100;
            }
            const randomValue = Math.floor(Math.random() * max);
            statValue.innerText = randomValue + (statValue.innerText.includes('%') ? '%' : '');
            
            // Animación de contador
            animateCounter(statValue, 0, parseInt(randomValue), 1500);
        }
    });
}

/**
 * Actualiza el contador de notificaciones
 */
function updateNotifications() {
    const notifBadge = document.querySelector('.notification-badge');
    if (notifBadge) {
        const count = Math.floor(Math.random() * 10) + 1;
        notifBadge.textContent = count;
        
        // Animación de notificación
        setInterval(() => {
            notifBadge.classList.add('pulse');
            setTimeout(() => {
                notifBadge.classList.remove('pulse');
            }, 1000);
        }, 5000);
    }
}

/**
 * Verifica la preferencia de tema guardada
 */
function checkThemePreference() {
    // Si se implementa un cambio de tema, aquí se verificaría
    const body = document.body;
    const theme = localStorage.getItem('dashboardTheme') || 'dark';
    
    if (theme === 'light') {
        body.classList.add('light-theme');
    } else {
        body.classList.remove('light-theme');
    }
}

/**
 * Genera datos aleatorios con tendencia
 */
function generateRandomData(count, min, max, ascending = true) {
    const data = [];
    let current = Math.floor(Math.random() * (max - min) / 2) + min;
    
    for (let i = 0; i < count; i++) {
        // Añadir variación aleatoria con tendencia
        const change = Math.floor(Math.random() * 20) - (ascending ? 5 : 15);
        current = Math.max(min, Math.min(max, current + change));
        data.push(current);
    }
    
    return data;
}

/**
 * Animación de contador para números
 */
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.innerHTML = value + (element.innerText.includes('%') ? '%' : '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// CSS para animaciones adicionales
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        
        .pulse {
            animation: pulse 1s ease-in-out;
        }
        
        @keyframes rotating {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .rotating {
            animation: rotating 1s linear infinite;
        }
        
        .updated-row {
            animation: highlightRow 2s ease-in-out;
        }
        
        @keyframes highlightRow {
            0% { background-color: transparent; }
            30% { background-color: rgba(0, 230, 230, 0.2); }
            100% { background-color: transparent; }
        }
        
        .deleting-row {
            animation: fadeOutRow 1s forwards;
        }
        
        @keyframes fadeOutRow {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(-20px); }
        }
        
        /* Modal y notificaciones personalizadas */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 1050;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .modal-overlay.show {
            opacity: 1;
        }
        
        .modal-container {
            background-color: #1a1a1a;
            border-radius: 8px;
            width: 90%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
            transform: translateY(-20px);
            transition: transform 0.3s ease;
            border: 1px solid rgba(0, 230, 230, 0.2);
        }
        
        .modal-overlay.show .modal-container {
            transform: translateY(0);
        }
        
        .modal-header {
            padding: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-close {
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.7);
            font-size: 1.5rem;
            cursor: pointer;
            transition: color 0.2s;
        }
        
        .modal-close:hover {
            color: #00e6e6;
        }
        
        .modal-body {
            padding: 1rem;
        }
        
        .modal-footer {
            padding: 1rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            justify-content: flex-end;
            gap: 0.5rem;
        }
        
        .toast-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #1a1a1a;
            color: #fff;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1100;
            transform: translateY(100px);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
            border-left: 4px solid #00e6e6;
        }
        
        .toast-notification.success {
            border-left-color: #2ecc71;
        }
        
        .toast-notification.warning {
            border-left-color: #e67e22;
        }
        
        .toast-notification.error {
            border-left-color: #e74c3c;
        }
        
        .toast-notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .toast-notification i {
            font-size: 1.2rem;
            color: #00e6e6;
        }
        
        .toast-notification.success i {
            color: #2ecc71;
        }
        
        .toast-notification.warning i {
            color: #e67e22;
        }
        
        .toast-notification.error i {
            color: #e74c3c;
        }
        
        /* Estilos para detalles */
        .detail-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .detail-avatar {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            overflow: hidden;
            border: 2px solid #00e6e6;
        }
        
        .detail-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .detail-info h4 {
            margin: 0;
            color: #fff;
        }
        
        .detail-info p {
            margin: 5px 0 0;
            color: rgba(255, 255, 255, 0.6);
            font-size: 0.9rem;
        }
        
        .detail-content {
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            padding: 1rem;
        }
        
        .detail-item {
            margin-bottom: 0.8rem;
        }
        
        .detail-label {
            display: block;
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.6);
            margin-bottom: 0.3rem;
        }
        
        .detail-value {
            display: block;
            font-size: 1rem;
            color: #fff;
        }
        
        /* Estilos para form dentro de modal */
        .form-group {
            margin-bottom: 1rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.3rem;
            color: rgba(255, 255, 255, 0.7);
        }
        
        .form-control {
            width: 100%;
            padding: 0.5rem;
            background-color: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            color: #fff;
            font-size: 0.9rem;
            transition: border-color 0.2s, box-shadow 0.2s;
        }
        
        .form-control:focus {
            outline: none;
            border-color: #00e6e6;
            box-shadow: 0 0 0 3px rgba(0, 230, 230, 0.25);
        }
        
        textarea.form-control {
            resize: vertical;
            min-height: 100px;
        }
        
        /* Estilos para confirmación de eliminación */
        .delete-confirm .modal-body {
            text-align: center;
            padding: 1.5rem;
        }
        
        .delete-warning {
            font-size: 3rem;
            color: #e74c3c;
            margin-bottom: 1rem;
        }
        
        /* Opciones de exportación */
        .export-options {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1050;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        
        .export-options.show {
            opacity: 1;
            visibility: visible;
        }
        
        .export-options-content {
            background-color: #1a1a1a;
            border-radius: 8px;
            width: 300px;
            padding: 1rem;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(0, 230, 230, 0.2);
        }
        
        .export-options-content h4 {
            margin-top: 0;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            text-align: center;
        }
        
        .export-option {
            padding: 0.8rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .export-option:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
        
        .export-option i {
            font-size: 1.5rem;
        }
        
        /* Confirmación personalizada */
        .confirm-dialog {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 1050;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .confirm-dialog.show {
            opacity: 1;
        }
        
        .confirm-dialog-content {
            background-color: #1a1a1a;
            border-radius: 8px;
            width: 90%;
            max-width: 400px;
            padding: 1.5rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
            transform: translateY(-20px);
            transition: transform 0.3s ease;
            border: 1px solid rgba(0, 230, 230, 0.2);
            text-align: center;
        }
        
        .confirm-dialog.show .confirm-dialog-content {
            transform: translateY(0);
        }
        
        .confirm-dialog.closing .confirm-dialog-content {
            transform: scale(0.9);
            opacity: 0;
        }
        
        .confirm-icon {
            font-size: 3rem;
            color: #00e6e6;
            margin-bottom: 1rem;
        }
        
        .confirm-actions {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-top: 1.5rem;
        }
    `;
    document.head.appendChild(style);
});