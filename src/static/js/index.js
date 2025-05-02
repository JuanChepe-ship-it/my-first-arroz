// Funcionalidad para las pestañas
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      // Desactivar todas las pestañas
      document.querySelectorAll('.tab').forEach(t => {
        t.classList.remove('active');
      });
      
      // Ocultar todos los contenidos
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      // Activar la pestaña seleccionada
      tab.classList.add('active');
      
      // Mostrar el contenido correspondiente
      const tabId = tab.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Funcionalidad para marcar ingredientes
  document.querySelectorAll('.ingredient-item input').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const label = this.nextElementSibling;
      if (this.checked) {
        label.classList.add('checked');
      } else {
        label.classList.remove('checked');
      }
    });
  });
  
  // Sistema de calificación por estrellas
  const stars = document.querySelectorAll('.star');
  const ratingText = document.getElementById('rating-text');
  
  stars.forEach(star => {
    // Resaltar estrellas al pasar el mouse
    star.addEventListener('mouseover', () => {
      const rating = parseInt(star.getAttribute('data-rating'));
      highlightStars(rating);
    });
    
    // Volver al estado anterior al quitar el mouse
    star.addEventListener('mouseout', () => {
      const activeRating = document.querySelector('.star.active');
      const rating = activeRating ? parseInt(activeRating.getAttribute('data-rating')) : 0;
      highlightStars(rating);
    });
    
    // Establecer calificación al hacer clic
    star.addEventListener('click', () => {
      const rating = parseInt(star.getAttribute('data-rating'));
      setRating(rating);
      
      // Actualizar texto según la calificación
      const ratingTexts = [
        "Califica esta receta",
        "No me gustó",
        "Podría mejorar",
        "Está bien",
        "Me gustó",
        "¡Excelente receta!"
      ];
      
      ratingText.textContent = ratingTexts[rating];
      
      // Añadir efecto de animación
      ratingText.classList.add('pulse');
      setTimeout(() => {
        ratingText.classList.remove('pulse');
      }, 2000);
    });
  });
  
  function highlightStars(rating) {
    stars.forEach(s => {
      const starRating = parseInt(s.getAttribute('data-rating'));
      if (starRating <= rating) {
        s.classList.add('hover');
      } else {
        s.classList.remove('hover');
      }
    });
  }
  
  function setRating(rating) {
    stars.forEach(s => {
      const starRating = parseInt(s.getAttribute('data-rating'));
      if (starRating <= rating) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });
  }
  
  // Botón de imprimir
  document.querySelector('.print-btn').addEventListener('click', () => {
    window.print();
  });
  
  // Funcionalidad para botones de compartir
  document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      alert('¡Compartiendo receta! Esta funcionalidad estaría conectada a redes sociales en una implementación real.');
    });
  });
  
  // Animación al cargar la página
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.card').forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
      }, 100 * index);
    });
  });
  
  // Formulario de comentarios
  document.querySelector('.comment-form .btn').addEventListener('click', function() {
    const textarea = document.querySelector('.comment-form textarea');
    const comment = textarea.value.trim();
    
    if (comment) {
      // Crear nuevo comentario
      const newComment = document.createElement('div');
      newComment.className = 'comment';
      
      const author = document.createElement('div');
      author.className = 'comment-author';
      author.textContent = 'Usuario';
      
      const date = document.createElement('div');
      date.className = 'comment-date';
      
      // Obtener fecha actual
      const now = new Date();
      const day = now.getDate();
      const month = now.toLocaleString('es', { month: 'long' });
      const year = now.getFullYear();
      date.textContent = `${day} ${month}, ${year}`;
      
      const commentText = document.createElement('p');
      commentText.textContent = comment;
      
      // Añadir elementos al comentario
      newComment.appendChild(author);
      newComment.appendChild(date);
      newComment.appendChild(commentText);
      
      // Añadir el comentario a la sección de comentarios
      const commentsSection = document.querySelector('.comments');
      commentsSection.insertBefore(newComment, document.querySelector('.comment-form'));
      
      // Limpiar el textarea
      textarea.value = '';
      
      // Actualizar contador de comentarios
      const commentsTitle = document.querySelector('.comments h2');
      const currentCount = parseInt(commentsTitle.textContent.match(/\d+/)[0]);
      commentsTitle.textContent = commentsTitle.textContent.replace(/\d+/, currentCount + 1);
      
      // Animar el nuevo comentario
      newComment.style.opacity = '0';
      setTimeout(() => {
        newComment.style.opacity = '1';
        newComment.style.transition = 'opacity 0.5s ease';
      }, 50);
    }
  });
  
  // Función para cambiar el modo (claro/oscuro)
  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  }
  
  // Comprobar preferencia guardada
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
  
  // Crear botón flotante para el modo oscuro
  const darkModeBtn = document.createElement('button');
  darkModeBtn.innerHTML = '🌙';
  darkModeBtn.className = 'dark-mode-toggle';
  darkModeBtn.title = 'Cambiar modo claro/oscuro';
  darkModeBtn.onclick = toggleDarkMode;
  document.body.appendChild(darkModeBtn);
  
  // Estilo para el botón de modo oscuro
  const style = document.createElement('style');
  style.textContent = `
    .dark-mode-toggle {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: var(--color-primary);
      color: white;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      z-index: 1000;
      transition: all 0.3s ease;
    }
    
    .dark-mode-toggle:hover {
      transform: scale(1.1);
    }
    
    .dark-mode {
      --color-primary: #9b59b6;
      --color-secondary: #3498db;
      --color-accent: #e67e22;
      --color-light: #34495e;
      --color-dark: #ecf0f1;
      background-color: #2c3e50;
    }
    
    .dark-mode .card {
      background-color: #34495e;
      color: #ecf0f1;
    }
    
    .dark-mode footer {
      background-color: #2c3e50;
      color: #ecf0f1;
    }
    
    .dark-mode .comment {
      background-color: #2c3e50;
    }
    
    .dark-mode .tab {
      background-color: #2c3e50;
      color: #ecf0f1;
    }
    
    .dark-mode .tab.active {
      background-color: #9b59b6;
    }
    
    .dark-mode .nutrition-facts th {
      background-color: #34495e;
      color: #ecf0f1;
    }
    
    .dark-mode textarea {
      background-color: #2c3e50;
      color: #ecf0f1;
      border-color: #34495e;
    }
    
    @media print {
      .dark-mode-toggle, .share-buttons, .rating, .comments, .comment-form {
        display: none;
      }
      
      body {
        background-color: white !important;
        color: black !important;
      }
      
      .card {
        box-shadow: none !important;
        margin: 0 !important;
        padding: 10px !important;
      }
      
      header {
        background-color: white !important;
        color: black !important;
        box-shadow: none !important;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Reloj de temporizador para la receta
  class CookingTimer {
    constructor() {
      this.timerContainer = document.createElement('div');
      this.timerContainer.className = 'cooking-timer';
      this.timerContainer.innerHTML = `
        <h3>Temporizador de Cocina</h3>
        <div class="timer-display">00:00</div>
        <div class="timer-controls">
          <button class="timer-btn" data-time="5">5 min</button>
          <button class="timer-btn" data-time="10">10 min</button>
          <button class="timer-btn" data-time="20">20 min</button>
          <button class="timer-btn" data-time="30">30 min</button>
          <button class="timer-btn timer-custom">Personalizado</button>
        </div>
        <button class="timer-start-btn">Iniciar</button>
        <button class="timer-reset-btn">Reiniciar</button>
      `;
      
      // Añadir estilos para el temporizador
      const timerStyle = document.createElement('style');
      timerStyle.textContent = `
        .cooking-timer {
          background-color: var(--color-light);
          padding: 15px;
          border-radius: var(--radius);
          margin: 20px 0;
          text-align: center;
        }
        
        .timer-display {
          font-size: 2rem;
          font-weight: bold;
          margin: 10px 0;
        }
        
        .timer-controls {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin-bottom: 10px;
        }
        
        .timer-btn {
          padding: 5px 10px;
          background-color: var(--color-secondary);
          color: white;
          border: none;
          border-radius: var(--radius);
          cursor: pointer;
        }
        
        .timer-start-btn, .timer-reset-btn {
          padding: 8px 15px;
          margin: 5px;
          background-color: var(--color-primary);
          color: white;
          border: none;
          border-radius: var(--radius);
          cursor: pointer;
        }
        
        .timer-start-btn.paused {
          background-color: var(--color-accent);
        }
        
        .timer-ring {
          animation: ring 2s infinite;
        }
        
        @keyframes ring {
          0% { transform: rotate(0); }
          5% { transform: rotate(15deg); }
          10% { transform: rotate(-15deg); }
          15% { transform: rotate(15deg); }
          20% { transform: rotate(-15deg); }
          25% { transform: rotate(0); }
          100% { transform: rotate(0); }
        }
      `;
      document.head.appendChild(timerStyle);
      
      // Insertar el temporizador después de la sección de preparación
      const preparationTab = document.getElementById('preparation');
      preparationTab.appendChild(this.timerContainer);
      
      // Variables del temporizador
      this.timeLeft = 0;
      this.timerInterval = null;
      this.isRunning = false;
      this.display = this.timerContainer.querySelector('.timer-display');
      
      // Eventos de los botones
      this.timerContainer.querySelectorAll('.timer-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if (btn.classList.contains('timer-custom')) {
            const minutes = prompt('Ingresa los minutos:', '');
            if (minutes && !isNaN(minutes)) {
              this.timeLeft = parseInt(minutes) * 60;
            }
          } else {
            this.timeLeft = parseInt(btn.getAttribute('data-time')) * 60;
          }
          this.updateDisplay();
        });
      });
      
      this.timerContainer.querySelector('.timer-start-btn').addEventListener('click', () => {
        this.toggleTimer();
      });
      
      this.timerContainer.querySelector('.timer-reset-btn').addEventListener('click', () => {
        this.resetTimer();
      });
    }
    
    updateDisplay() {
      const minutes = Math.floor(this.timeLeft / 60).toString().padStart(2, '0');
      const seconds = (this.timeLeft % 60).toString().padStart(2, '0');
      this.display.textContent = `${minutes}:${seconds}`;
    }
    
    toggleTimer() {
      const startBtn = this.timerContainer.querySelector('.timer-start-btn');
      
      if (this.isRunning) {
        clearInterval(this.timerInterval);
        startBtn.textContent = 'Reanudar';
        startBtn.classList.add('paused');
      } else {
        if (this.timeLeft > 0) {
          this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            if (this.timeLeft <= 0) {
              clearInterval(this.timerInterval);
              this.isRunning = false;
              startBtn.textContent = 'Iniciar';
              startBtn.classList.remove('paused');
              
              // Alerta y animación cuando finaliza el tiempo
              this.display.classList.add('timer-ring');
              alert('¡Tiempo de cocción completado!');
              setTimeout(() => {
                this.display.classList.remove('timer-ring');
              }, 3000);
            }
          }, 1000);
          
          startBtn.textContent = 'Pausar';
          startBtn.classList.remove('paused');
        }
      }
      
      this.isRunning = !this.isRunning;
    }
    
    resetTimer() {
      clearInterval(this.timerInterval);
      this.timeLeft = 0;
      this.isRunning = false;
      this.updateDisplay();
      this.timerContainer.querySelector('.timer-start-btn').textContent = 'Iniciar';
      this.timerContainer.querySelector('.timer-start-btn').classList.remove('paused');
    }
  }
  
  // Inicializar temporizador
  const timer = new CookingTimer();
  
  // Calcular cantidad de ingredientes según número de porciones
  function createPortionCalculator() {
    const calculatorContainer = document.createElement('div');
    calculatorContainer.className = 'portion-calculator';
    calculatorContainer.innerHTML = `
      <h3>Ajustar ingredientes para:</h3>
      <div class="portion-controls">
        <button class="portion-btn decrease">-</button>
        <span class="portion-display">6</span>
        <button class="portion-btn increase">+</button>
        <span>personas</span>
      </div>
    `;
    
    const calculatorStyle = document.createElement('style');
    calculatorStyle.textContent = `
      .portion-calculator {
        background-color: var(--color-light);
        padding: 15px;
        border-radius: var(--radius);
        margin: 20px 0;
      }
      
      .portion-controls {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 10px;
      }
      
      .portion-btn {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: var(--color-primary);
        color: white;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .portion-display {
        font-size: 1.2rem;
        font-weight: bold;
      }
    `;
    document.head.appendChild(calculatorStyle);
    
    // Insertar calculadora al inicio de la sección de ingredientes
    const ingredientsTab = document.getElementById('ingredients');
    ingredientsTab.insertBefore(calculatorContainer, ingredientsTab.firstChild);
    
    // Base de 6 porciones
    const basePortions = 6;
    let currentPortions = 6;
    
    // Ingredientes originales (cantidades para 6 personas)
    const originalIngredients = [
      { id: 'ing1', base: '1', unit: 'taza de arroz' },
      { id: 'ing2', base: '2', unit: 'tazas de agua' },
      { id: 'ing3', base: '4', unit: 'tazas de leche' },
      { id: 'ing4', base: '1', unit: 'taza de azúcar' },
      { id: 'ing5', base: '1', unit: 'rama de canela' },
      { id: 'ing6', base: '1', unit: 'lata de leche condensada' },
      { id: 'ing7', base: '1', unit: 'cucharadita de esencia de vainilla' }
    ];
    
    // Actualizar cantidades según porciones
    function updateIngredients() {
      originalIngredients.forEach(ing => {
        const label = document.querySelector(`label[for="${ing.id}"]`);
        if (label) {
          const ratio = currentPortions / basePortions;
          const newAmount = parseFloat(ing.base) * ratio;
          // Formatear para evitar decimales largos
          const formattedAmount = newAmount % 1 === 0 ? newAmount : newAmount.toFixed(1);
          label.textContent = `${formattedAmount} ${ing.unit}`;
        }
      });
    }
    
    // Eventos para los botones de incremento/decremento
    const decreaseBtn = calculatorContainer.querySelector('.decrease');
    const increaseBtn = calculatorContainer.querySelector('.increase');
    const portionDisplay = calculatorContainer.querySelector('.portion-display');
    
    decreaseBtn.addEventListener('click', () => {
      if (currentPortions > 1) {
        currentPortions--;
        portionDisplay.textContent = currentPortions;
        updateIngredients();
      }
    });
    
    increaseBtn.addEventListener('click', () => {
      if (currentPortions < 20) {
        currentPortions++;
        portionDisplay.textContent = currentPortions;
        updateIngredients();
      }
    });
  }
  
  // Inicializar calculadora de porciones
  createPortionCalculator();
  
  // Crear índice de contenidos con anclajes
  function createTableOfContents() {
    const toc = document.createElement('div');
    toc.className = 'table-of-contents';
    toc.innerHTML = `
      <h3>Índice</h3>
      <ul class="toc-list">
        <li><a href="#ingredientes">Ingredientes</a></li>
        <li><a href="#preparacion">Preparación</a></li>
        <li><a href="#tips">Consejos y trucos</a></li>
        <li><a href="#variaciones">Variaciones regionales</a></li>
        <li><a href="#nutricion">Información nutricional</a></li>
        <li><a href="#historia">Historia del arroz con leche</a></li>
      </ul>
    `;
    
    const tocStyle = document.createElement('style');
    tocStyle.textContent = `
      .table-of-contents {
        background-color: var(--color-light);
        padding: 15px;
        border-radius: var(--radius);
        margin: 20px 0;
      }
      
      .toc-list {
        list-style: none;
        padding: 0;
      }
      
      .toc-list li {
        margin: 8px 0;
      }
      
      .toc-list a {
        color: var(--color-primary);
        text-decoration: none;
        transition: all 0.3s ease;
      }
      
      .toc-list a:hover {
        color: var(--color-accent);
        padding-left: 5px;
      }
    `;
    document.head.appendChild(tocStyle);
    
    // Añadir IDs a las secciones para los anclajes
    document.querySelectorAll('h2').forEach(heading => {
      const text = heading.textContent.toLowerCase();
      if (text.includes('ingredientes')) heading.id = 'ingredientes';
      if (text.includes('preparación')) heading.id = 'preparacion';
      if (text.includes('consejos')) heading.id = 'tips';
      if (text.includes('variaciones')) heading.id = 'variaciones';
      if (text.includes('nutricional')) heading.id = 'nutricion';
      if (text.includes('historia')) heading.id = 'historia';
    });
    
    // Insertar índice después del primer párrafo
    const firstParagraph = document.querySelector('.container > .card > p');
    if (firstParagraph) {
      firstParagraph.parentNode.insertBefore(toc, firstParagraph.nextSibling);
    }
  }
  
  // Inicializar índice de contenidos
  createTableOfContents();