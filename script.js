
    (() => {
      'use strict'

      const form = document.getElementById('contactForm');
      const successMessage = document.getElementById('successMessage');

      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!form.checkValidity()) {
          form.classList.add('was-validated');
          return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
          const response = await fetch('http://localhost:3000/submit-form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });

          const result = await response.json();

          if (result.success) {
            successMessage.classList.remove('d-none');
            form.reset();
            form.classList.remove('was-validated');

            setTimeout(() => {
              successMessage.classList.add('d-none');
            }, 7000);
          } else {
            alert('❌ Erreur lors de l’envoi');
          }
        } catch (error) {
          alert('❌ Le serveur ne répond pas');
        }
      });
    })()
