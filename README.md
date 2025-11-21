# Parcial – Calidad de Software Avanzado  
## CI/CD con GitHub Actions + Linter + Tests + Cobertura + act

**Autor:** Jonathan Montiel Villegas

Este proyecto implementa un pipeline de **CI con GitHub Actions** que incluye:

- Linter (ESLint)  
- Pruebas unitarias (Jest)  
- Cobertura con nyc/Istanbul  
- Compilación (build dummy)
- Validación de cobertura mínima (80%)
- Ejecución del workflow localmente con nektos/act

---

## 🚀 Cómo correr el proyecto localmente

### 1. Instalar dependencias
```
npm ci
```

### 2. Ejecutar CI completo (igual que GitHub Actions)
```
npm run ci
```

Incluye:
- lint  
- build  
- test  
- check-coverage  

---

## 📘 Ejecutar GitHub Actions localmente con `act`

### ¿Qué es act?
Herramienta que permite ejecutar *localmente* tus GitHub Actions usando Docker.

### Requisitos
- Tener Docker instalado
- Instalar act:  
```
scoop install act     (Windows)
brew install act      (Mac)
```

### Ejecutar el workflow CI
```
act -j ci-quality
```

Si quieres usar una imagen más completa:
```
act -P ubuntu-latest=ghcr.io/catthehacker/ubuntu:full
```

---

## 📸 Logs Solicitados
Debes entregar:

- Un run **exitoso**
- Un run **fallido** (puedes romper un test o linter)
- Poner capturas de pantalla en el ZIP o repositorio.

---

## ✨ Cómo generar un fallo
### 1. Fallo de linter
Agregar una variable no usada:
```js
const x = 10;
```

### 2. Fallo de pruebas
Cambiar un resultado esperado:
```js
expect(sum(2, 3)).toBe(10);
```

### 3. Fallo de cobertura
Agregar código sin pruebas:
```js
function divide(a, b) { return a / b; }
```

---

## 📚 Autoría y uso de IA
### Métodos para detectar código generado por IA
1. Estilometría (análisis de estilo del autor)
2. Watermarking o firmas en modelos

### No se puede asegurar 100% la autoría porque:
- Los modelos cambian
- Un humano puede editar código generado por IA
- Los detectores tienen falsos positivos/negativos

### Política educativa sugerida
- Declarar uso de IA  
- Evaluar comprensión más que memorización  
- Usar linters, pruebas y pipelines para garantizar calidad  
