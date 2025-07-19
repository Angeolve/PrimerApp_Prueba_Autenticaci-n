$('#logueo').click(async () => {
  try {
    const { signInWithPopup } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js');
    const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');

    const result = await signInWithPopup(window.auth, window.provider);
    
    // Guardar datos en Firestore
    await setDoc(doc(window.db, "usuarios", result.user.uid), {
      nombre: result.user.displayName,
      email: result.user.email,
      foto: result.user.photoURL || null,
      ultimoAcceso: new Date().toISOString()
    });

    // Mostrar foto del usuario
    if (result.user.photoURL) {
      $('#foto').html(`<img src="${result.user.photoURL}" alt="Foto de perfil" class="user-photo">`);
    } else {
      $('#foto').html('<div class="default-photo">👤</div>');
    }

    // Mostrar otros datos del usuario
    $('#principal').html(`
      <h2>¡Bienvenido ${result.user.displayName || 'Usuario'}!</h2>
      <p>Email: ${result.user.email}</p>
    `);

  } catch (error) {
    console.error("Error:", error);
    if (error.code === 'auth/popup-blocked') {
      alert("Por favor permite popups para este sitio");
    } else {
      alert("Error al iniciar sesión: " + error.message);
    }
  }
});

// Botón Recordarme sin funcionalidad
$('#guardar').click(() => {
  console.log("Botón Recordarme clickeado");
});