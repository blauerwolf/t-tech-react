// listarUsuarios.js

import admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert('./secrets/t-tech-react-firebase-adminsdk.json')
});

const db = admin.firestore();

async function listarUsuariosConRol() {
  try {
    let nextPageToken;
    do {
      // Listar hasta 1000 usuarios por página
      const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
      listUsersResult.users.forEach(userRecord => {
        const email = userRecord.email || 'Sin email';
        const uid = userRecord.uid;
        // Leer custom claims
        const claims = userRecord.customClaims || {};
        const esAdmin = claims.admin === true;
        console.log(`UID: ${uid} | Email: ${email} | Admin: ${esAdmin ? 'Sí' : 'No'}`);
      });
      nextPageToken = listUsersResult.pageToken;
    } while (nextPageToken);
  } catch (error) {
    console.error('Error listando usuarios:', error);
  }
}

listarUsuariosConRol();