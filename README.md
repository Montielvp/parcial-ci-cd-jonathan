Parte 1

Diferencia entre CI y CD
CI (Integración Continua) es el proceso de integrar código frecuentemente,
ejecutando automáticamente análisis, linting, pruebas y verificación de calidad
para detectar errores rápidamente.
CD (Despliegue Continuo) automatiza el proceso después de CI,
permitiendo que el software esté siempre listo para ser desplegado
y que los cambios lleguen a producción de manera segura y controlada.

Lenguaje, linter y herramienta de cobertura
El proyecto usa JavaScript con Node.js por su simpleza y compatibilidad con Jest.
Se utiliza ESLint porque es el estándar más usado para asegurar estilo consistente,
prevenir errores y soporta múltiples reglas personalizables.
Para la cobertura se usa NYC Istanbul ya que se integra automáticamente con Jest
y permite medir porcentaje de líneas, funciones, statements y branches.

Umbral mínimo de cobertura
El umbral definido es 80% porque garantiza calidad aceptable sin exigir
un nivel tan alto que limite la velocidad de desarrollo. Este valor es común
en proyectos profesionales y asegura que la mayor parte del código es verificada.

parte 2:
Workflow CI/CD
Se creó el archivo `.github/workflows/ci-quality.yml`, el cual ejecuta:

- Checkout del repositorio
- Instalación de dependencias
- Ejecución del linter
- Build del proyecto
- Pruebas unitarias con Jest
- Generación de cobertura con NYC
- Validación del umbral definido

El workflow se ejecuta automáticamente en push y pull_request.
Si alguna etapa falla, el pipeline se detiene de inmediato.

mi archivo yml:
name: CI - Calidad

on:
  push:
    branches: ["**"]
  pull_request:
    branches: ["**"]

jobs:
  ci-quality:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Ejecutar Linter
        run: npm run lint

      - name: Build
        run: npm run build
      
      - name: Ejecutar pruebas con cobertura
        run: npm run test

      - name: Verificar umbral cobertura
        run: npm run check-coverage


Parte 3:
Uso de nektos/act:
Act es una herramienta que permite ejecutar workflows de GitHub Actions localmente sin necesidad de realizar un push.
Simula un runner de GitHub mediante contenedores de Docker y ejecuta los mismos pasos definidos en los workflows de CI/CD.
Qué hace:
Ejecuta el workflow exactamente igual que GitHub Actions.
Permite depurar errores de linter, pruebas y scripts sin necesidad de subir cambios.
Ahorra tiempo en el desarrollo del pipeline.

Requisitos:
Act necesita Docker, ya que ejecuta los jobs dentro de contenedores.
Por lo tanto, es obligatorio tener Docker instalado antes de usarlo.

Ejecutar el workflow completo:
act
Ejecutar únicamente el job ci-quality:
act -j ci-quality


Parte 4:

Pruebas exitosas
<img width="558" height="321" alt="Captura de pantalla 2025-11-20 193722" src="https://github.com/user-attachments/assets/258351f1-9183-470e-864e-5c2831da6ca7" />

Pipeline fallido
<img width="1341" height="618" alt="Captura de pantalla 2025-11-20 204818" src="https://github.com/user-attachments/assets/45e5eb6b-06fa-4c11-92d9-fb4d6d1591f6" />

Vista de los workflows
<img width="1321" height="465" alt="Captura de pantalla 2025-11-20 205606" src="https://github.com/user-attachments/assets/2cc3819c-2fde-4675-afb9-b551a2bc2922" />

Error detallado del job
<img width="1327" height="615" alt="Captura de pantalla 2025-11-20 210335" src="https://github.com/user-attachments/assets/425d93cd-8008-44f9-92b8-5188a62ee83a" />


Parte 5:
Cómo identificar fallos en los logs:
Cuando se ejecuta el workflow en GitHub Actions, cada paso deja un log. Para saber dónde falló:

Linter ESLint:
Si hay errores de estilo o código mal escrito, en el log aparece algo como ESLint found X errors y se muestran las líneas donde falla.

Pruebas Jest:
Si una prueba falla, el log muestra qué test no pasó, qué esperaba y qué resultado obtuvo. Dice algo como Test failed o Expected but received.

Cobertura nyc/istanbul:
Cuando el porcentaje es menor al mínimo configurado, aparece un error tipo Coverage threshold not met.

Run fallido:
Para generar uno, dejé a propósito un error en una función y desactivé un test. En el historial de acciones se ve el workflow con un y el paso exacto donde falló. Los logs muestran mensajes de error del linter o de los tests.

Run exitoso:
Luego corregí el código y volví a ejecutar el workflow. Esta vez todo pasa correctamente: aparece un verde y los logs muestran All tests passed y No ESLint errors.

La diferencia principal es que en el run fallido los logs muestran claramente el paso donde se detuvo y el error exacto, mientras que en el exitoso todos los pasos dicen completed successfully.

Parte 5:

Métodos para detectar código generado por IA:

Análisis de patrones y estilo del código:
Herramientas como GPTZero, CodeSquire Detector o analizadores de estilo revisan si el código tiene patrones repetitivos, nombres muy genéricos o estructuras muy "perfectas" que suelen venir de modelos de IA.

Comparación con bases de datos de entrenamiento o fingerprinting:
Algunos detectores comparan el código con patrones típicos de modelos como ChatGPT o Copilot, ya que estas IA tienden a repetir ciertas formas de escribir.

No se puede garantizar totalmente si un código fue hecho por IA porque:
Un estudiante puede escribir código muy ordenado que parezca de IA.
La IA puede producir código imperfecto que parezca humano.
Un usuario puede modificar ligeramente la salida de la IA y ya cambia el estilo.
No existe una huella única que permita identificar con certeza la fuente.
Por eso solo se pueden dar probabilidades, no conclusiones absolutas.

Propongo estas políticas que me parecen equilibradas:
Se puede usar IA solo como apoyo, no para entregar trabajos completos.
El estudiante debe admitir cuándo usó IA y en qué parte.
La IA se puede usar para explicar conceptos, depurar errores o generar ejemplos.
El código final debe ser entendible por el estudiante; si no lo puede explicar, no se acepta.
Los trabajos deben incluir una sección breve sobre si hubo o no ayuda de IA.
