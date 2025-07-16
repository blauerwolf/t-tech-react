# Talento Tech - Entrega Final e-commerce

## Instalación de paquetes
Para instalar los componentes necesarios, ejecutar:  
```
npm install
```

## Configuraciones
Copiar example.env a .env y completar las variables de entorno con la configuración de firebase solicitada. 

Descargar el archivo de configuración de proyecto de firebase y colocarlo en la carpeta
```
/secrets
```
(dentro de la carpeta principal del proyecto)  

## Usuarios administradores
A continuación se puede crear un primer usuario administrador:
```
npm run create-admin-user -- usuario@ejemplo.com
```
Para listar los usuarios disponibles en el sistema se puede ejecutar:  
```
npm run  list-users
```

## Carga inicial de información en Firestore
Luego ejecutar la carga inicial de productos en firebase:  
```
npm run populate:db
```
Para limpiar la base de datos y dejarla en el estado inicial, ejecutar:  
```
npm run clear:db
```

## Ejecución local
Para ejecutar la versión de desarrollo:  
```
npm run dev
```

## Generar Build para producción
Para generar el build de instalación:  
```
npm run build
```

## Panel de administrador versión online
Usuario: admin@galashop.com
Password: 0303456

### Limitaciones conocidas
Los términos de búsqueda son identificados en firestore si la palabra es la del comienzo del nombre del producto.