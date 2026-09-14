import { Component, Prop, h } from '@stencil/core';
import { resolveCarbonIcon } from '@bench/icons';

/**
 * Bench 2.8 — Carbon icons are mostly filled/optically-corrected shapes (not
 * uniform 2px stroke like the Tabler set this replaced), so the root <svg>
 * no longer hardcodes `fill="none" stroke="currentColor"`. Fill defaults to
 * `currentColor` via icon.css; any node that genuinely needs a stroke
 * (terminal, copy, delete, link — see bench-design-system.md §2.8 "formas
 * mixtas") carries its own `fill`/`stroke`/`stroke-width` attributes in the
 * icon data itself. viewBox is Carbon's native 32×32 grid, not Tabler's 24×24.
 */
@Component({ tag: 'bch-icon', styleUrl: 'icon.css', shadow: false, scoped: true })
export class BchIcon {
  @Prop() name!: string;
  @Prop({ attribute: 'aria-label' }) ariaLabel?: string;

  render() {
    const nodes = resolveCarbonIcon(this.name);
    const labelled = Boolean(this.ariaLabel);

    return (
      <svg
        class="bch-icon"
        viewBox="0 0 32 32"
        aria-hidden={labelled ? undefined : 'true'}
        aria-label={labelled ? this.ariaLabel : undefined}
        role={labelled ? 'img' : undefined}
      >
        {nodes?.map(([tag, attrs]) => h(tag, attrs))}
      </svg>
    );
  }
}
