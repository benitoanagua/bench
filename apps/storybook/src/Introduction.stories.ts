import { stencilContent } from './story-helpers';

export default { title: 'BENCH/Introduction' };
export const Overview = {
  render: () =>
    stencilContent(
      `<div style="font-family:system-ui;padding:32px;max-width:760px"><h1>BENCH</h1><p>A new design system built from scratch with Stencil and Web Components.</p><p>STRATA is not a source of component logic, visual rules, tokens, or APIs.</p></div>`,
    ),
};
