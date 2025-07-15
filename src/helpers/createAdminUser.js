import admin from 'firebase-admin';
import promptSync from 'prompt-sync';

// Inicializa Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault()
  // o: credential: admin.credential.cert('./ruta/credenciales.json')
});

// Leer argumentos: email viene como primer argumento después de node script.js
const email = process.argv[2];

if (!email) {
  console.error('❌ Debes indicar el email: npm run create-admin-user -- email@example.com');
  process.exit(1);
}

// Inicializar prompt
const prompt = promptSync({ sigint: true, echo: '*' });

// Pedir contraseña
const password = prompt('Introduce la contraseña: ');
const passwordRepeat = prompt('Repite la contraseña: ');

if (!password || password !== passwordRepeat) {
  console.error('❌ Las contraseñas no coinciden o están vacías.');
  process.exit(1);
}

// Crear el usuario y asignar rol
(async () => {
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password
    });
    console.log(`✅ Usuario creado con UID: ${userRecord.uid}`);

    await admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });
    console.log(`✅ Rol admin asignado a ${email}`);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
