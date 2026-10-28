import { Component, Prop, h } from '@stencil/core';

/**
 * Regla 8 (§2.3): el borde del default es sólido — estado persistido. Solo
 * cuando el contenido se muestra como *provisional, aún no confirmado*
 * (ej.: plantilla no guardada, borrador) se marca `provisional` y el borde
 * pasa a dashed vía el token --bch-line-provisional. El dashed decorativo
 * "porque queda bien" está prohibido.
 */
@Component({ tag: 'bch-empty-state', styleUrl: 'empty-state.css', shadow: false, scoped: true })
export class BchEmptyState {
  @Prop() heading = '';
  @Prop() description = '';
  @Prop() provisional = false;

  render() {
    return (
      <section class={this.provisional ? 'bch-empty-state is-provisional' : 'bch-empty-state'}>
        <div class="bch-empty-state__icon">
          <slot name="icon">
            <bch-icon name="inbox" aria-label=""></bch-icon>
          </slot>
        </div>
        <h3>{this.heading}</h3>
        {this.description ? <p>{this.description}</p> : null}
        <div class="bch-empty-state__actions">
          <slot name="actions" />
        </div>
      </section>
    );
  }
}
