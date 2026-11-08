<template>
  <Story title="Components/Accordion">
    <Variant name="Por defecto (único abierto)">
      <bch-accordion>
        <bch-accordion-item value="a" label="Primera">Contenido de la primera sección</bch-accordion-item>
        <bch-accordion-item value="b" label="Segunda">Contenido de la segunda sección</bch-accordion-item>
        <bch-accordion-item value="c" label="Tercera">Contenido de la tercera sección</bch-accordion-item>
      </bch-accordion>
    </Variant>
    <Variant name="Múltiples abiertos">
      <bch-accordion multiple>
        <bch-accordion-item value="a" label="Primera" open>Contenido A</bch-accordion-item>
        <bch-accordion-item value="b" label="Segunda" open>Contenido B</bch-accordion-item>
        <bch-accordion-item value="c" label="Tercera">Contenido C</bch-accordion-item>
      </bch-accordion>
    </Variant>
  </Story>
</template>
