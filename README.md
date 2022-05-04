#Objetivo: 
Definir una API para gestionar nuestro equipo Pokémon

#Acciones:
- Identificarnos
- Añadir pokémon a nuestro equipo
- Eliminar pokémon de nuestro equipo
- Consultar información de nuestro equipo
- Intercambiar el orden de nuestros Pokémon

#REST Design:
- Añadir Pokémon: POST /team/pokemons                   Añadimos un pokemon a nuestro equipo
- Consultar Equipo: GET /team                           Consultamos nuestro equipo
- Eliminar Pokémon: DELETE /team/pokemons/:id           Eliminamos un pokemon de nuestro equipo
- Intercambiar el orden de nuestro pokémon: PUT /team   Te puedo meter todo el objeto y lo que envie tendras que guardar en el recurso
- Sistema de credenciales