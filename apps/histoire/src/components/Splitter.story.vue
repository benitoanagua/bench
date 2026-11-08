<template>
  <Story title="Components/Splitter">
    <Variant name="Horizontal">
      <bch-splitter orientation="horizontal" style="height: 200px; border: 1px solid">
        <div style="padding: 8px; background: #eef0f2">Panel izquierdo</div>
        <div style="padding: 8px; background: #dfe3e6">Panel derecho</div>
      </bch-splitter>
    </Variant>
    <Variant name="Vertical">
      <bch-splitter orientation="vertical" style="width: 100%; height: 300px; border: 1px solid">
        <div style="padding: 8px; background: #eef0f2">Panel superior</div>
        <div style="padding: 8px; background: #dfe3e6">Panel inferior</div>
      </bch-splitter>
    </Variant>
  </Story>
</template>
