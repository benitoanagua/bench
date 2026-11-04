# Balloon Help

**Spec §4.4** · tier (c) · demo: `#demo-balloon-help`

El _balloon help_ es la ayuda extendida de una etiqueta: un texto más largo
que el tooltip, que aparece junto al control y se lee sin perder el contexto.

## Con qué se compone

- `bch-tooltip` para el texto extendido (con `text` y `placement`).
- `bch-button` o `bch-icon-button` como disparador.
- `bch-dialog` cuando la ayuda necesita scroll o un ejemplo.

## Reglas

- Un tooltip es **una frase**; un balloon help es un párrafo. Si el texto no
  cabe en una frase, no es un tooltip.
- El balloon help se abre por foco o por hover, y se puede fijar con clic
  cuando contiene un enlace o un ejemplo.
- No esconde información necesaria para completar la tarea: si el usuario
  necesita leerlo para avanzar, es un hint (`hint` del campo) o un aviso
  visible, no un balloon.
- Nunca se usa para critiques de diseño ni mensajes de error: esos son
  `bch-alert`.

## Ejemplo

```html
<bch-tooltip
  text="El número de factura es inmutable una vez emitido. Para corregirlo, emite una nota de crédito."
  placement="bottom"
>
  <bch-icon-button name="information" label="Ayuda sobre el número de factura"></bch-icon-button>
</bch-tooltip>
```

## Lo que la app decide

El contenido del texto y de qué controles tienen ayuda. La demo del showcase
muestra un tooltip largo junto a un campo y un balloon fijado con información
de proceso.
