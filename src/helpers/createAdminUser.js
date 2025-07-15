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

    await admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });
    console.log(`✅ Rol admin asignado a ${email}`);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();