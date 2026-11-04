---
'@bench/icons': patch
---

Resolver la clase `fill:none` de los iconos de Carbon al generar los datos. El
generador descartaba el bloque `<style>` de los SVG oficiales sin trasladar su
regla al elemento: el rectángulo transparente de 32x32 que Carbon usa como caja
de encuadre heredaba el color del icono y **cada glifo se pintaba como un
cuadrado sólido**.

Ahora `tooling/icons/generate.mjs` extrae las reglas `fill` de los `<style>` y
las fija como atributo explícito (`fill="none"`), eliminando además la clase
que solo servía de enganche al estilo descartado. Los datos regenerados
conservan el resto de la geometría intacta.
