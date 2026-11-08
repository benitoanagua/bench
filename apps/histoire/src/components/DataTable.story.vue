<template>
  <Story title="Components/DataTable">
    <Variant name="Por defecto">
      <bch-data-table label="Registros" caption="Lista de elementos" page-size="10">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Elemento A</td>
              <td>Activo</td>
              <td>2026-01-10</td>
            </tr>
            <tr>
              <td>Elemento B</td>
              <td>Inactivo</td>
              <td>2026-01-11</td>
            </tr>
          </tbody>
        </table>
      </bch-data-table>
    </Variant>
  </Story>
</template>
