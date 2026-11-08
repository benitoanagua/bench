<template>
  <Story title="Components/Omnibar">
    <Variant name="Por defecto">
      <bch-omnibar placeholder="Buscar funciones…"></bch-omnibar>
    </Variant>
    <Variant name="Sintaxis de filtro">
      <bch-combobox label="Comando" name="cmd" placeholder="campo:valor">
        <bch-combobox-option value="estado:activo">estado:activo</bch-combobox-option>
        <bch-combobox-option value="tipo:reporte">tipo:reporte</bch-combobox-option>
      </bch-combobox>
    </Variant>
    <Variant name="Índice vacío">
      <bch-omnibar placeholder="No hay resultados"></bch-omnibar>
    </Variant>
  </Story>
</template>
