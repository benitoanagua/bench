import type { App, Plugin } from 'vue';
import { defineCustomElements } from '@bench/components/loader';
import type {
  BchAccordionItemProps,
  BchAccordionProps,
  BchAlertProps,
  BchAvatarProps,
  BchBadgeProps,
  BchBreadcrumbItemProps,
  BchBreadcrumbsProps,
  BchButtonProps,
  BchCardProps,
  BchCheckboxProps,
  BchComboboxOptionProps,
  BchComboboxProps,
  BchComponent,
  BchDataTableProps,
  BchDatePickerProps,
  BchDialogProps,
  BchDrawerProps,
  BchEmptyStateProps,
  BchFileUploadProps,
  BchFormFieldProps,
  BchIconButtonProps,
  BchIconProps,
  BchInputProps,
  BchMenuItemProps,
  BchMenuProps,
  BchMetricCardProps,
  BchModeBadgeProps,
  BchNavItemProps,
  BchNavProps,
  BchOmnibarProps,
  BchPaginationProps,
  BchProgressProps,
  BchRadioProps,
  BchSegmentedControlProps,
  BchSegmentedItemProps,
  BchSelectProps,
  BchSkeletonProps,
  BchSliderProps,
  BchSpinnerProps,
  BchSplitterProps,
  BchStatusBarProps,
  BchStatusProps,
  BchSwitchProps,
  BchTabPanelProps,
  BchTabProps,
  BchTabsProps,
  BchTextareaProps,
  BchTimePickerProps,
  BchToastRegionProps,
  BchToolbarProps,
  BchTooltipProps,
  BchTreeItemProps,
  BchTreeProps,
} from './types';

/**
 * Registering the custom elements is a module side effect of the adapter:
 * importing `@bench/vue` is enough to make every `bch-*` tag usable without
 * separately touching the loader. Idempotent per process; the loader no-ops
 * without `window`, so this is safe in SSR (Nuxt) builds.
 */
let registered = false;
function registerElements(): void {
  if (registered || typeof window === 'undefined') return;
  registered = true;
  void defineCustomElements(window);
}
registerElements();

/**
 * Coverage: all 52 tags exported by `@bench/components` are declared in
 * `GlobalComponents` with their real `@Prop` surface and `onBch*` event
 * handlers. The Vue compiler is configured to treat `bch-*` as native custom
 * elements; the declarations exist for template prop checking, while the
 * registry is written by `@bench/components/loader` (see `registerElements`
 * above).
 */
export const BenchVue: Plugin = {
  install(app: App) {
    app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('bch-');
  },
};

declare module 'vue' {
  interface GlobalComponents {
    'bch-accordion': BchComponent<BchAccordionProps>;
    'bch-accordion-item': BchComponent<BchAccordionItemProps>;
    'bch-alert': BchComponent<BchAlertProps>;
    'bch-avatar': BchComponent<BchAvatarProps>;
    'bch-badge': BchComponent<BchBadgeProps>;
    'bch-breadcrumb-item': BchComponent<BchBreadcrumbItemProps>;
    'bch-breadcrumbs': BchComponent<BchBreadcrumbsProps>;
    'bch-button': BchComponent<BchButtonProps>;
    'bch-card': BchComponent<BchCardProps>;
    'bch-checkbox': BchComponent<BchCheckboxProps>;
    'bch-combobox': BchComponent<BchComboboxProps>;
    'bch-combobox-option': BchComponent<BchComboboxOptionProps>;
    'bch-data-table': BchComponent<BchDataTableProps>;
    'bch-date-picker': BchComponent<BchDatePickerProps>;
    'bch-dialog': BchComponent<BchDialogProps>;
    'bch-drawer': BchComponent<BchDrawerProps>;
    'bch-empty-state': BchComponent<BchEmptyStateProps>;
    'bch-file-upload': BchComponent<BchFileUploadProps>;
    'bch-form-field': BchComponent<BchFormFieldProps>;
    'bch-icon': BchComponent<BchIconProps>;
    'bch-icon-button': BchComponent<BchIconButtonProps>;
    'bch-input': BchComponent<BchInputProps>;
    'bch-menu': BchComponent<BchMenuProps>;
    'bch-menu-item': BchComponent<BchMenuItemProps>;
    'bch-metric-card': BchComponent<BchMetricCardProps>;
    'bch-mode-badge': BchComponent<BchModeBadgeProps>;
    'bch-nav': BchComponent<BchNavProps>;
    'bch-nav-item': BchComponent<BchNavItemProps>;
    'bch-omnibar': BchComponent<BchOmnibarProps>;
    'bch-pagination': BchComponent<BchPaginationProps>;
    'bch-progress': BchComponent<BchProgressProps>;
    'bch-radio': BchComponent<BchRadioProps>;
    'bch-segmented-control': BchComponent<BchSegmentedControlProps>;
    'bch-segmented-item': BchComponent<BchSegmentedItemProps>;
    'bch-select': BchComponent<BchSelectProps>;
    'bch-skeleton': BchComponent<BchSkeletonProps>;
    'bch-slider': BchComponent<BchSliderProps>;
    'bch-spinner': BchComponent<BchSpinnerProps>;
    'bch-splitter': BchComponent<BchSplitterProps>;
    'bch-status': BchComponent<BchStatusProps>;
    'bch-status-bar': BchComponent<BchStatusBarProps>;
    'bch-switch': BchComponent<BchSwitchProps>;
    'bch-tab': BchComponent<BchTabProps>;
    'bch-tab-panel': BchComponent<BchTabPanelProps>;
    'bch-tabs': BchComponent<BchTabsProps>;
    'bch-textarea': BchComponent<BchTextareaProps>;
    'bch-time-picker': BchComponent<BchTimePickerProps>;
    'bch-toast-region': BchComponent<BchToastRegionProps>;
    'bch-toolbar': BchComponent<BchToolbarProps>;
    'bch-tooltip': BchComponent<BchTooltipProps>;
    'bch-tree': BchComponent<BchTreeProps>;
    'bch-tree-item': BchComponent<BchTreeItemProps>;
  }
}
