<template>
  <Story title="Components/Skeleton">
    <Variant name="Texto">
      <bch-skeleton variant="text" width="60%"></bch-skeleton>
      <bch-skeleton variant="text" width="100%"></bch-skeleton>
    </Variant>
    <Variant name="Círculo">
      <bch-skeleton variant="circle"></bch-skeleton>
    </Variant>
    <Variant name="Rectángulo">
      <bch-skeleton variant="rect" width="200px" height="100px"></bch-skeleton>
    </Variant>
    <Variant name="Tarjeta placeholder">
      <bch-card style="width: 280px">
        <bch-skeleton variant="circle" style="margin-bottom: 12px"></bch-skeleton>
        <bch-skeleton variant="text" width="90%" style="margin-bottom: 8px"></bch-skeleton>
        <bch-skeleton variant="text" width="60%"></bch-skeleton>
      </bch-card>
    </Variant>
  </Story>
</template>
