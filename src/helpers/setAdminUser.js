// setAdmin.js
import admin from 'firebase-admin';

// Asegúrate de que esta ruta sea correcta para tu archivo de claves de servicio
admin.initializeApp({
  credential: admin.credential.cert('../../secrets/t-tech-react-firebase-adminsdk.json')
});

const USER_UID_TO_MAKE_ADMIN = "Mr2Edo0dcHZmltkNlsu8fK1sHVv1"; // <-- ¡Cambia esto por el UID de tu usuario admin!

async function setAdminClaim() {
  try {
    await admin.auth().setCustomUserClaims(USER_UID_TO_MAKE_ADMIN, { admin: true });
    console.log(`Custom claim 'admin: true' establecido para el usuario con UID: ${USER_UID_TO_MAKE_ADMIN}`);

    // Opcional pero muy recomendado: Revocar tokens para forzar una actualización inmediata en el cliente
    // Esto desconectará al usuario, forzándolo a iniciar sesión de nuevo para obtener el token actualizado.
    await admin.auth().revokeRefreshTokens(USER_UID_TO_MAKE_ADMIN);
    console.log(`Tokens de sesión revocados para el usuario ${USER_UID_TO_MAKE_ADMIN}. Deberá iniciar sesión nuevamente.`);
    
  } catch (error) {
    console.error(`Error al establecer Custom Claim o revocar tokens para el usuario ${USER_UID_TO_MAKE_ADMIN}:`, error);
  }
}

setAdminClaim();