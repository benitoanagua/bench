import { stencilContent } from './story-helpers';

export default { title: 'BENCH/Components/Forms' };
export const Fields = { render: () => stencilContent(`<div style="display:grid;gap:16px;max-width:420px"><bch-input label="Email" placeholder="you@example.com"></bch-input><bch-textarea label="Message"></bch-textarea><bch-checkbox label="Remember me"></bch-checkbox><bch-radio name="plan" value="basic" label="Basic"></bch-radio><bch-switch label="Notifications"></bch-switch><bch-select label="Country"><option value="bo">Bolivia</option><option value="ar">Argentina</option></bch-select></div>`) };
