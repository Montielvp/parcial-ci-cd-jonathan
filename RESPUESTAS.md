# RESPUESTAS DEL PARCIAL – Calidad de Software Avanzado

**Autor:** Jonathan Montiel Villegas

---

## 1. Diferencia entre CI y CD

### CI (Integración Continua)
Proceso donde cada cambio del repositorio dispara:
- build
- pruebas
- linter
- cobertura

Objetivo: detectar errores temprano.

### CD (Entrega/Despliegue Continuo)
Automatiza enviar el software a entornos:
- staging
- producción

La CD depende de una CI estable.

---

## 2. Lenguaje, linter y cobertura escogidos

- **Lenguaje:** JavaScript  
  Rápido, simple y perfecto para pipelines de CI.

- **Linter:** ESLint  
  Amplio soporte, reglas configurables y estándar industrial.

- **Cobertura:** NYC/Istanbul  
  Genera reportes LCOV, HTML y texto. Integración perfecta con Jest.

---

## 3. Justificación del umbral del 80%
80% es un estándar común en empresas.  
Balance ideal:  
- No tan bajo (riesgo de bugs)  
- No tan alto (bloquea desarrollo simple)

---

## 4. Cómo identificar fallos en logs

### Fallo de Linter
```
error: Missing semicolon
```

### Fallo de Tests
```
FAIL  test/index.test.js
Expected: 10  Received: 5
```

### Fallo de Cobertura
```
ERROR: Coverage below threshold
```

---

## 5. Run fallido vs exitoso

### Run exitoso
- Todas las etapas muestran **OK**
- Tests: `PASS`
- Cobertura >= 80%
- Linter sin errores

### Run fallido
- Workflow se detiene en el primer error
- Puede fallar en lint, test o coverage

---

## 6. IA y Ética

### Dos métodos de detección de IA
1. Estilometría (análisis de estilo del autor)
2. Watermarking o firmas ocultas

### Por qué no se puede asegurar autoría 100%
- Humanos pueden modificar outputs
- Detectores tienen falsos positivos
- Los modelos cambian

### Política de uso de IA
- Declarar qué se usó
- Pruebas orales de conocimiento
- Mantener linters, tests y CI obligatorios
