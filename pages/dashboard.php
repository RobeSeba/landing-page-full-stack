<?php
    require __DIR__ . '/../vendor/autoload.php';
    require_once __DIR__ . '/../php/logica.php';
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    // Clave secreta usada en login
    $key = "@1254sd";

    // Verificar si hay token en la cookie
    if (!isset($_COOKIE["jwt_token"])) {
        header("Location: ../pages/login.html");
        exit();
    }

    $token = $_COOKIE["jwt_token"];

    try {
        $decoded = JWT::decode($token, new Key($key, 'HS256'));
        // Extraer información del usuario desde el token
        $usuario = $decoded->data->usuario ?? 'Administrador';
        $email = $decoded->data->email ?? 'admin@example.com';
    } catch (Exception $e) {
        // Token inválido o expirado
        header("Location: ../pages/login.html");
        exit();
    }

    // Obtener datos para estadísticas
    $registro = new Registros();
    $datos = $registro->listar();
    $totalRegistros = count($datos);
    
    // Calcular registros de hoy
    $hoy = date('Y-m-d');
    $registrosHoy = 0;
    foreach ($datos as $lead) {
        if (strpos($lead['fecha_registro'], $hoy) !== false) {
            $registrosHoy++;
        }
    }
    
    // Calcular porcentaje de crecimiento (simulado)
    $crecimiento = rand(5, 25); // Simulado para demo
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Bootcamp Admin</title>
    
    <!-- Bootstrap 5 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
    
    <!-- DataTables -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.1/css/dataTables.bootstrap5.min.css">
    
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    
    <!-- Custom Dashboard Styles -->
    <link rel="stylesheet" href="../css/dashboard.css">
</head>
<body>
    <!-- Loading Screen -->
    <div id="dashboard-loader" class="loader-overlay">
        <div class="loader-content">
            <div class="dashboard-spinner"></div>
            <p class="loading-text">Cargando dashboard de administración...</p>
        </div>
    </div>

    <!-- Dashboard Layout -->
    <div class="dashboard-container">
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="sidebar-header">
                <div class="logo">
                    <i class="bi bi-code-slash logo-icon"></i>
                    <span class="logo-text">Bootcamp</span>
                </div>
                <button class="sidebar-toggle" id="sidebarToggle">
                    <i class="bi bi-chevron-left"></i>
                </button>
            </div>
            
            <div class="sidebar-user">
                <img src="https://ui-avatars.com/api/?name=<?php echo urlencode($usuario); ?>&background=0D8ABC&color=fff" alt="User Avatar" class="user-avatar">
                <div class="user-info">
                    <h4><?php echo htmlspecialchars($usuario); ?></h4>
                    <p><?php echo htmlspecialchars($email); ?></p>
                </div>
            </div>
            
            <nav class="sidebar-menu">
                <div class="menu-section">
                    <h5 class="menu-title">Principal</h5>
                    <ul class="menu-items">
                        <li class="menu-item">
                            <a href="#" class="menu-link active">
                                <i class="bi bi-speedometer2 menu-icon"></i>
                                Dashboard
                            </a>
                        </li>
                        <li class="menu-item">
                            <a href="#" class="menu-link">
                                <i class="bi bi-person-lines-fill menu-icon"></i>
                                Registros
                            </a>
                        </li>
                    </ul>
                </div>
                
                <div class="menu-section">
                    <h5 class="menu-title">Administración</h5>
                    <ul class="menu-items">
                        <li class="menu-item">
                            <a href="#" class="menu-link">
                                <i class="bi bi-gear menu-icon"></i>
                                Configuración
                            </a>
                        </li>
                        <li class="menu-item">
                            <a href="#" class="menu-link">
                                <i class="bi bi-bar-chart menu-icon"></i>
                                Reportes
                                <span class="menu-badge">3</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            
            <div class="sidebar-footer">
                <a href="#" id="logoutBtn" class="btn btn-outline w-100">
                    <i class="bi bi-box-arrow-right"></i>
                    Cerrar Sesión
                </a>
            </div>
        </aside>
        
        <!-- Main Content -->
        <div class="content-wrapper">
            <!-- Header -->
            <header class="header">
                <h1 class="header-title">Panel de Administración</h1>
                
                <div class="header-actions">
                    <button class="header-action">
                        <i class="bi bi-bell"></i>
                        <span class="notification-badge">5</span>
                    </button>
                    <button class="header-action">
                        <i class="bi bi-gear"></i>
                    </button>
                    <button class="header-action d-md-none" id="mobileSidebarToggle">
                        <i class="bi bi-list"></i>
                    </button>
                </div>
            </header>
            
            <!-- Main Content Area -->
            <div class="main-content">
                <!-- Page Header -->
                <div class="page-header">
                    <h2 class="page-title">Dashboard</h2>
                    <div class="breadcrumbs">
                        <div class="breadcrumb-item">
                            <a href="#">Inicio</a>
                        </div>
                        <span class="breadcrumb-divider">
                            <i class="bi bi-chevron-right"></i>
                        </span>
                        <div class="breadcrumb-item">
                            Dashboard
                        </div>
                    </div>
                </div>
                
                <!-- Stats Cards Row -->
                <div class="stats-row">
                    <!-- Total Leads Card -->
                    <div class="stat-card fade-in">
                        <div class="stat-header">
                            <div class="stat-info">
                                <h3>Total Registros</h3>
                            </div>
                            <div class="stat-icon">
                                <i class="bi bi-people"></i>
                            </div>
                        </div>
                        <h2 class="stat-value"><?php echo $totalRegistros; ?></h2>
                        <div class="stat-change positive">
                            <i class="bi bi-arrow-up"></i>
                            <span><?php echo $crecimiento; ?>% este mes</span>
                        </div>
                    </div>
                    
                    <!-- Today's Leads Card -->
                    <div class="stat-card fade-in delay-1">
                        <div class="stat-header">
                            <div class="stat-info">
                                <h3>Registros de Hoy</h3>
                            </div>
                            <div class="stat-icon">
                                <i class="bi bi-calendar-check"></i>
                            </div>
                        </div>
                        <h2 class="stat-value"><?php echo $registrosHoy; ?></h2>
                        <div class="stat-change positive">
                            <i class="bi bi-arrow-up"></i>
                            <span>15% vs. ayer</span>
                        </div>
                    </div>
                    
                    <!-- Conversion Rate Card -->
                    <div class="stat-card fade-in delay-2">
                        <div class="stat-header">
                            <div class="stat-info">
                                <h3>Tasa de Conversión</h3>
                            </div>
                            <div class="stat-icon">
                                <i class="bi bi-graph-up"></i>
                            </div>
                        </div>
                        <h2 class="stat-value">32%</h2>
                        <div class="stat-change positive">
                            <i class="bi bi-arrow-up"></i>
                            <span>8% vs. mes pasado</span>
                        </div>
                    </div>
                </div>
                
                <!-- Chart Row -->
                <div class="card fade-in delay-2">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="bi bi-bar-chart-line me-2"></i>
                            Registros por Mes
                        </h3>
                        <div class="card-actions">
                            <button class="btn btn-outline btn-sm">
                                <i class="bi bi-download me-2"></i>
                                Exportar
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="chart-container">
                            <canvas id="registrosChart"></canvas>
                        </div>
                    </div>
                </div>
                
                <!-- Data Table -->
                <div class="card fade-in delay-3">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="bi bi-table me-2"></i>
                            Registros Recientes
                        </h3>
                        <div class="card-actions">
                            <button class="btn btn-outline btn-sm" id="refreshBtn">
                                <i class="bi bi-arrow-repeat me-2"></i>
                                Actualizar
                            </button>
                            <button class="btn btn-primary btn-sm" id="exportBtn">
                                <i class="bi bi-download me-2"></i>
                                Exportar
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <?php if(!empty($datos)): ?>
                        <div class="table-container">
                            <table class="data-table" id="registrosTable">
                                <thead>
                                    <tr>
                                        <th><i class="bi bi-person me-2"></i>Nombre</th>
                                        <th><i class="bi bi-envelope me-2"></i>Correo</th>
                                        <th><i class="bi bi-telephone me-2"></i>Teléfono</th>
                                        <th><i class="bi bi-chat-text me-2"></i>Comentario</th>
                                        <th><i class="bi bi-calendar me-2"></i>Fecha</th>
                                        <th><i class="bi bi-gear me-2"></i>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($datos as $lead): ?>
                                    <tr>
                                        <td>
                                            <div class="user-cell">
                                                <img src="https://ui-avatars.com/api/?name=<?php echo urlencode($lead['nombre']); ?>&background=0D8ABC&color=fff" alt="User">
                                                <?php echo htmlspecialchars($lead['nombre']); ?>
                                            </div>
                                        </td>
                                        <td><?php echo htmlspecialchars($lead['correo']); ?></td>
                                        <td><?php echo htmlspecialchars($lead['telefono']); ?></td>
                                        <td><?php echo strlen($lead['comentario']) > 30 ? htmlspecialchars(substr($lead['comentario'], 0, 30)) . '...' : htmlspecialchars($lead['comentario']); ?></td>
                                        <td><?php echo htmlspecialchars($lead['fecha_registro']); ?></td>
                                        <td>
                                            <div class="action-buttons">
                                                <button class="action-btn view-btn" title="Ver detalle">
                                                    <i class="bi bi-eye"></i>
                                                </button>
                                                <button class="action-btn edit-btn" title="Editar">
                                                    <i class="bi bi-pencil"></i>
                                                </button>
                                                <button class="action-btn delete-btn" title="Eliminar">
                                                    <i class="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <?php endforeach; ?>
                                </tbody>
                            </table>
                        </div>
                        <?php else: ?>
                        <div class="alert alert-info">
                            <i class="bi bi-info-circle me-2"></i>
                            No hay registros para mostrar.
                        </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.1/js/dataTables.bootstrap5.min.js"></script>
    
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        // Loading Screen
        const dashboardLoader = document.getElementById('dashboard-loader');
        setTimeout(() => {
            if (dashboardLoader) {
                dashboardLoader.classList.add('hidden');
                setTimeout(() => {
                    dashboardLoader.style.display = 'none';
                }, 500);
            }
        }, 1000);
        
        // Sidebar Toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
        const sidebar = document.querySelector('.sidebar');
        const contentWrapper = document.querySelector('.content-wrapper');
        
        function toggleSidebar() {
            sidebar.classList.toggle('show');
            contentWrapper.classList.toggle('sidebar-open');
            
            const isCollapsed = sidebar.classList.contains('show');
            if (sidebarToggle) {
                sidebarToggle.innerHTML = isCollapsed ? 
                    '<i class="bi bi-chevron-right"></i>' : 
                    '<i class="bi bi-chevron-left"></i>';
            }
        }
        
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', toggleSidebar);
        }
        
        if (mobileSidebarToggle) {
            mobileSidebarToggle.addEventListener('click', toggleSidebar);
        }
        
        // Initialize DataTables
        if ($.fn.DataTable && document.getElementById('registrosTable')) {
            $('#registrosTable').DataTable({
                responsive: true,
                language: {
                    url: '//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json'
                },
                pageLength: 5,
                lengthMenu: [[5, 10, 25, -1], [5, 10, 25, "Todos"]]
            });
        }
        
        // Initialize Chart
        if (window.Chart && document.getElementById('registrosChart')) {
            const ctx = document.getElementById('registrosChart').getContext('2d');
            
            // Datos simulados para el gráfico
            const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct'];
            const data = {
                labels: labels,
                datasets: [{
                    label: 'Registros por Mes',
                    data: [65, 59, 80, 81, 56, 55, 72, 88, 95, <?php echo $totalRegistros; ?>],
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
                    plugins: {
                        legend: {
                            labels: {
                                color: 'rgba(255, 255, 255, 0.7)'
                            }
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
        
        // Logout Button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
                    // Eliminar cookie de sesión
                    document.cookie = 'jwt_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                    
                    // Redireccionar al login
                    window.location.href = '../pages/login.html';
                }
            });
        }
        
        // Refresh Button Animation
        const refreshBtn = document.getElementById('refreshBtn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', function() {
                const icon = this.querySelector('i');
                icon.classList.add('rotating');
                
                // Simular actualización
                setTimeout(() => {
                    icon.classList.remove('rotating');
                    location.reload();
                }, 1000);
            });
        }
        
        // Add animation class to style
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rotating {
                from {
                    transform: rotate(0deg);
                }
                to {
                    transform: rotate(360deg);
                }
            }
            
            .rotating {
                animation: rotating 1s linear infinite;
            }
        `;
        document.head.appendChild(style);
    });
    </script>
</body>
</html>
