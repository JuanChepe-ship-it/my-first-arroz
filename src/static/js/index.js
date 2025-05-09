document.addEventListener('DOMContentLoaded', function() {
  // Funcionalidad de pestañas
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remover clase active de todas las pestañas
      tabs.forEach(t => t.classList.remove('active'));
      
      // Añadir clase active a la pestaña actual
      tab.classList.add('active');
      
      // Ocultar todos los contenidos de pestañas
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Mostrar el contenido de la pestaña seleccionada
      const tabId = tab.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Sistema de calificación con estrellas
  const stars = document.querySelectorAll('.star');
  const ratingText = document.getElementById('rating-text');
  
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const rating = star.getAttribute('data-rating');
      
      // Resetear todas las estrellas
      stars.forEach(s => s.classList.remove('active'));
      
      // Activar las estrellas hasta la seleccionada
      stars.forEach(s => {
        if (parseInt(s.getAttribute('data-rating')) <= parseInt(rating)) {
          s.classList.add('active');
        }
      });
      
      // Actualizar el texto de calificación
      ratingText.textContent = `¡Gracias por tu valoración de ${rating} estrellas!`;
      
      // Opcional: Guardar la calificación en localStorage
      localStorage.setItem('recipeRating', rating);
    });
    
    // Efecto hover
    star.addEventListener('mouseover', () => {
      const rating = star.getAttribute('data-rating');
      
      stars.forEach(s => {
        if (parseInt(s.getAttribute('data-rating')) <= parseInt(rating)) {
          s.style.color = '#ffc107';
        } else {
          s.style.color = '#ddd';
        }
      });
    });
    
    star.addEventListener('mouseout', () => {
      stars.forEach(s => {
        if (!s.classList.contains('active')) {
          s.style.color = '#ddd';
        } else {
          s.style.color = '#ffc107';
        }
      });
    });
  });
  
  // Cargar calificación guardada
  const savedRating = localStorage.getItem('recipeRating');
  if (savedRating) {
    stars.forEach(s => {
      if (parseInt(s.getAttribute('data-rating')) <= parseInt(savedRating)) {
        s.classList.add('active');
      }
    });
    ratingText.textContent = `¡Gracias por tu valoración de ${savedRating} estrellas!`;
  }
  
  // Funcionalidad de impresión
  const printBtn = document.querySelector('.print-btn');
  printBtn.addEventListener('click', () => {
    window.print();
  });
  
  // Funcionalidad de compartir
  const shareButtons = document.querySelectorAll('.share-btn');
  
  shareButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const recipeTitle = "Arroz con Leche - Receta Tradicional";
      const recipeUrl = window.location.href;
      
      switch(index) {
        case 0: // WhatsApp
          window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(recipeTitle + ' ' + recipeUrl)}`, '_blank');
          break;
        case 1: // Email
          window.open(`mailto:?subject=${encodeURIComponent(recipeTitle)}&body=${encodeURIComponent('¡Mira esta deliciosa receta! ' + recipeUrl)}`, '_blank');
          break;
        case 2: // Facebook
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(recipeUrl)}`, '_blank');
          break;
      }
    });
  });
  
  // Funcionalidad de comentarios
  const commentForm = document.querySelector('.comment-form');
  const commentsContainer = document.querySelector('.comments-container');
  const commentTextarea = document.getElementById('new-comment');
  const submitCommentBtn = document.querySelector('.submit-comment');
  
  submitCommentBtn.addEventListener('click', () => {
    const commentText = commentTextarea.value.trim();
    
    if (commentText) {
      // Crear nuevo comentario
      const newComment = document.createElement('div');
      newComment.className = 'comment';
      
      // Obtener fecha actual
      const now = new Date();
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      const formattedDate = now.toLocaleDateString('es-ES', options);
      
      // Estructura del comentario
      newComment.innerHTML = `
        <div class="comment-header">
          <div class="comment-author">Usuario</div>
          <div class="comment-date">${formattedDate}</div>
        </div>
        <p>${commentText}</p>
      `;
      
      // Añadir el comentario al principio
      commentsContainer.insertBefore(newComment, commentsContainer.firstChild);
      
      // Limpiar el textarea
      commentTextarea.value = '';
      
      // Actualizar contador de comentarios
      const commentsTitle = document.querySelector('.comments-card h2');
      const currentCount = parseInt(commentsTitle.textContent.match(/\d+/)[0]);
      commentsTitle.textContent = `Comentarios (${currentCount + 1})`;
      
      // Efecto de aparición
      newComment.style.opacity = '0';
      newComment.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        newComment.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        newComment.style.opacity = '1';
        newComment.style.transform = 'translateY(0)';
      }, 10);
    }
  });
  
  // Funcionalidad de ingredientes tachados
  const ingredientCheckboxes = document.querySelectorAll('.ingredient-item input[type="checkbox"]');
  
  ingredientCheckboxes.forEach(checkbox => {
    // Cargar estado guardado
    const ingredientId = checkbox.id;
    const isChecked = localStorage.getItem(ingredientId) === 'true';
    
    if (isChecked) {
      checkbox.checked = true;
    }
    
    checkbox.addEventListener('change', () => {
      // Guardar estado en localStorage
      localStorage.setItem(ingredientId, checkbox.checked);
    });
  });
  
  // Animación de scroll suave para anclajes internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Efecto de aparición al hacer scroll
  const cards = document.querySelectorAll('.card');
  
  function checkScroll() {
    cards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (cardTop < windowHeight - 100) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Inicializar cards con opacidad 0
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // Comprobar scroll inicial y añadir listener
  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Comprobar al cargar la página
});