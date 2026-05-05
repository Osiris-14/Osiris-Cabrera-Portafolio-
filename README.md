# Stack Tecnológico

Este proyecto utiliza el siguiente stack tecnológico:
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS


# Flujo de Desarrollo

1. Con base en los requisitos del usuario, ajustar el estilo visual en `src/index.css` y `tailwind.config.ts`
2. Según los requisitos del usuario, identificar y dividir las páginas que se deben implementar
3. Organizar las funcionalidades de cada página y crear la carpeta correspondiente en `pages/`, junto con su archivo de entrada `Index.tsx`
4. En `App.tsx`, configurar las rutas e importar los archivos de entrada `Index.tsx` creados anteriormente
5. Si los requisitos de una página son simples, todo el trabajo puede realizarse directamente en `Index.tsx`
6. Si los requisitos son complejos, la página puede dividirse en varios componentes con la siguiente estructura de directorios:
    - `Index.tsx` — Punto de entrada
    - `/components/` — Componentes
    - `/hooks/` — Hooks personalizados
    - `/stores/` — Si existe comunicación compleja entre componentes, se puede usar Zustand
7. Una vez completados los requisitos, ejecutar `pnpm i` para instalar las dependencias, luego verificar con `npm run lint & npx tsc --noEmit -p tsconfig.app.json --strict` y corregir cualquier problema encontrado

# Integración con el Backend
- Cuando se necesite agregar un nuevo endpoint o interactuar con Supabase, primero crear el archivo de API correspondiente en `src/api/`, exportando los tipos de datos necesarios. Se puede usar `src/demo.ts` como referencia. En el caso de Supabase, también se debe completar la implementación correspondiente.
- Tanto en el frontend como en la implementación con Supabase, se debe seguir estrictamente los tipos de datos definidos. Se debe evitar al máximo modificarlos; si se requiere algún cambio, revisar todos los archivos que hagan referencia a ese tipo.

