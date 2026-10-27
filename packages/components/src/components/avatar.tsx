import { Component, Prop, State, h } from '@stencil/core';

function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

@Component({ tag: 'bch-avatar', styleUrl: 'avatar.css', shadow: false, scoped: true })
export class BchAvatar {
  @Prop() src?: string;
  @Prop() name = '';
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';
  @Prop() shape: 'circle' | 'square' = 'circle';
  /** Optional presence dot. */
  @Prop() status?: 'online' | 'offline' | 'busy' | 'away';
  @State() private imageFailed = false;

  render() {
    const showImage = Boolean(this.src) && !this.imageFailed;
    return (
      <span class={{ 'bch-avatar': true, [`is-${this.size}`]: true, [`is-${this.shape}`]: true }}>
        {showImage ? (
          <img
            src={this.src}
            alt={this.name}
            onError={() => {
              this.imageFailed = true;
            }}
          />
        ) : (
          <span class="bch-avatar__initials" aria-hidden={this.name ? undefined : 'true'}>
            {this.name ? initialsFrom(this.name) : <bch-icon name="user" aria-hidden="true" />}
          </span>
        )}
        {this.status ? (
          <span
            class={`bch-avatar__status is-${this.status}`}
            aria-label={`Status: ${this.status}`}
            role="img"
          />
        ) : null}
      </span>
    );
  }
}
