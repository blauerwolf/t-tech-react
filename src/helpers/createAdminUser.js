import admin from 'firebase-admin';
import readlineSync from 'readline-sync';

// Inicializa Firebase Admin SDK
admin.initializeApp({
  //credential: admin.credential.applicationDefault()
  // o: credential: admin.credential.cert('./ruta/credenciales.json')
  credential: admin.credential.cert('./secrets/t-tech-react-firebase-adminsdk.json')
});

// Leer email desde argumentos
const email = process.argv[2];
if (!email) {
  console.error('❌ Debes indicar el email: npm run create-admin-user -- email@example.com');
  process.exit(1);
}

// Leer contraseña SIN mostrarla
const password = readlineSync.question('Introduce la Password: ', { hideEchoBack: true });
const passwordRepeat = readlineSync.question('Repite la Password: ', { hideEchoBack: true });

if (!password || password !== passwordRepeat) {
  console.error('❌ Las passwords no coinciden o están vacías.');
  process.exit(1);
}

(async () => {
  try {
    const userRecord = await admin.auth().createUser({ email, password });
    console.log(`✅ Usuario creado con UID: ${userRecord.uid}`);

    // Asignar el Custom Claim de administrador:
    await admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });
    console.log(`✅ Rol admin asignado a ${email}`);

    // Revocar los tokens de refresco para asegurar que el próximo login obtenga el token con los claims actualizados
    // Esto es especialmente útil si se modifican claims de un usuario existente que ya está logueado.
    // Para un usuario nuevo, asegura que desde el primer login el token sea correcto.
    await admin.auth().revokeRefreshTokens(userRecord.uid);
    console.log(`✅ Tokens de sesión revocados para el usuario ${userRecord.uid}.`);
    console.log('✨ El usuario podrá iniciar sesión con su rol de administrador.');

  } catch (error) {
    console.error('❌ Error al crear usuario o asignar rol:', error.message);
    // Añadir manejo específico para errores comunes
    if (error.code === 'auth/email-already-exists') {
        console.error('Ya existe un usuario con este email.');
    } else if (error.code === 'auth/invalid-password') {
        console.error('La contraseña debe tener al menos 6 caracteres.');
    }
    process.exit(1);
  }
})();