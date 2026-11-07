import * as React from 'react';
import { defineCustomElements } from '@bench/components/loader';
import type {
  BchCellChangeDetail,
  BchFunctionEntry,
  BchOmnibarResult,
  BchPasteDetail,
  BchTableColumn,
  BchTableRow,
  BchTreeNode,
} from '@bench/components';
import { createWrapper } from './create-wrapper';

/**
 * Registering the custom elements is a module side effect of the adapter:
 * importing `@bench/react` is enough to make every `bch-*` tag usable.
 * Defined once per process: the loader itself no-ops without `window`
 * (SSR-safe) and the flag keeps repeated imports cheap.
 */
let registered = false;
function registerElements(): void {
  if (registered || typeof window === 'undefined') return;
  registered = true;
  void defineCustomElements(window);
}
registerElements();

/**
 * Coverage: all 52 tags exported by `@bench/components` have a typed React
 * wrapper below, including the six composite showcase components
 * (`bch-alert`, `bch-data-table`, `bch-empty-state`, `bch-metric-card`,
 * `bch-status`, `bch-toolbar`). `toast.tsx` implements the
 * `bch-toast-region` tag, exposed as `BchToastRegion`. Event handlers are
 * typed as `onBch*` and bridged to `addEventListener` by `createWrapper`
 * (React 18 does not bind unknown custom-element event props itself).
 */

export type BchButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  fullWidth?: boolean;
};
export type BchInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};
export type BchTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
  error?: string;
};
export type BchIconProps = React.HTMLAttributes<HTMLElement> & {
  name: string;
  size?: string;
  label?: string;
  decorative?: boolean;
};
export type BchIconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  name: string;
  label: string;
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
};
export type BchCardProps = React.HTMLAttributes<HTMLElement> & { interactive?: boolean };
export type BchBadgeProps = React.HTMLAttributes<HTMLElement> & { tone?: string };
export type BchAvatarProps = React.HTMLAttributes<HTMLElement> & {
  src?: string;
  name?: string;
  size?: 'small' | 'medium' | 'large';
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'busy' | 'away';
};
export type BchProgressProps = React.HTMLAttributes<HTMLElement> & {
  value?: number;
  indeterminate?: boolean;
  label?: string;
  tone?: 'action' | 'success' | 'danger' | 'warning';
};
export type BchSkeletonProps = React.HTMLAttributes<HTMLElement> & {
  variant?: 'text' | 'circle' | 'rect';
  width?: string;
  height?: string;
};
export type BchSliderProps = Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> & {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  disabled?: boolean;
  showValue?: boolean;
  onBchInput?: (e: CustomEvent<number>) => void;
  onBchChange?: (e: CustomEvent<number>) => void;
};
export type BchPaginationProps = React.HTMLAttributes<HTMLElement> & {
  page?: number;
  pageCount?: number;
  siblingCount?: number;
  label?: string;
  onBchChange?: (e: CustomEvent<number>) => void;
};
export type BchBreadcrumbsProps = React.HTMLAttributes<HTMLElement> & {
  label?: string;
  maxItems?: number;
};
export type BchBreadcrumbItemProps = React.HTMLAttributes<HTMLElement> & {
  href?: string;
  current?: boolean;
};
export type BchMenuProps = React.HTMLAttributes<HTMLElement> & {
  open?: boolean;
  label?: string;
  placement?: 'bottom-start' | 'bottom-end';
  onBchOpenChange?: (e: CustomEvent<boolean>) => void;
  onBchSelect?: (e: CustomEvent<string>) => void;
};
export type BchMenuItemProps = React.HTMLAttributes<HTMLElement> & {
  value?: string;
  disabled?: boolean;
  tone?: 'default' | 'danger';
  onBchSelect?: (e: CustomEvent<string>) => void;
};
export type BchSegmentedControlProps = React.HTMLAttributes<HTMLElement> & {
  value?: string;
  label?: string;
  onBchChange?: (e: CustomEvent<string>) => void;
};
export type BchSegmentedItemProps = React.HTMLAttributes<HTMLElement> & {
  value?: string;
  disabled?: boolean;
  selected?: boolean;
};
export type BchToastRegionProps = React.HTMLAttributes<HTMLElement> & {
  placement?: 'top' | 'bottom';
  maxVisible?: number;
};
export type BchComboboxProps = React.HTMLAttributes<HTMLElement> & {
  label?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  allowCustomValue?: boolean;
  noResultsText?: string;
  onBchChange?: (e: CustomEvent<string>) => void;
  onBchInput?: (e: CustomEvent<string>) => void;
};
export type BchComboboxOptionProps = React.HTMLAttributes<HTMLElement> & { value?: string };
export type BchDatePickerProps = React.HTMLAttributes<HTMLElement> & {
  label?: string;
  name?: string;
  value?: string;
  min?: string;
  max?: string;
  locale?: string;
  firstDayOfWeek?: 0 | 1;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onBchChange?: (e: CustomEvent<string>) => void;
  onBchInput?: (e: CustomEvent<string>) => void;
};
export type BchTimePickerProps = React.HTMLAttributes<HTMLElement> & {
  label?: string;
  name?: string;
  value?: string;
  min?: string;
  max?: string;
  step?: number;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  onBchChange?: (e: CustomEvent<string>) => void;
  onBchInput?: (e: CustomEvent<string>) => void;
};
export type BchFileUploadProps = React.HTMLAttributes<HTMLElement> & {
  label?: string;
  name?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  hint?: string;
  error?: string;
  maxSizeBytes?: number;
  dropzoneText?: string;
  browseText?: string;
  onBchFilesChange?: (e: CustomEvent<File[]>) => void;
  onBchFileError?: (e: CustomEvent) => void;
};
export type BchAccordionProps = React.HTMLAttributes<HTMLElement> & {
  multiple?: boolean;
  onBchChange?: (e: CustomEvent<string[]>) => void;
};
export type BchAccordionItemProps = React.HTMLAttributes<HTMLElement> & {
  open?: boolean;
  value?: string;
  label?: string;
  onBchToggle?: (e: CustomEvent<boolean>) => void;
};
export type BchDialogProps = React.HTMLAttributes<HTMLElement> & {
  open?: boolean;
  label?: string;
  closeOnEscape?: boolean;
  tone?: 'standard' | 'critical';
  onBchOpen?: (e: CustomEvent<void>) => void;
  onBchClose?: (e: CustomEvent<void>) => void;
};
export type BchDrawerProps = React.HTMLAttributes<HTMLElement> & {
  open?: boolean;
  label?: string;
  side?: 'left' | 'right' | 'start' | 'end';
  closeOnEscape?: boolean;
  onBchOpen?: (e: CustomEvent<void>) => void;
  onBchClose?: (e: CustomEvent<void>) => void;
};
export type BchFormFieldProps = React.HTMLAttributes<HTMLElement> & {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
};
export type BchNavProps = React.HTMLAttributes<HTMLElement> & {
  orientation?: 'horizontal' | 'vertical';
};
export type BchNavItemProps = React.HTMLAttributes<HTMLElement> & {
  href?: string;
  active?: boolean;
  disabled?: boolean;
  onBchNavigate?: (e: CustomEvent<string>) => void;
};
export type BchSpinnerProps = React.HTMLAttributes<HTMLElement> & { label?: string };
export type BchTabProps = React.HTMLAttributes<HTMLElement> & {
  value: string;
  active?: boolean;
  disabled?: boolean;
  onBchPress?: (e: CustomEvent<string>) => void;
};
export type BchTabPanelProps = React.HTMLAttributes<HTMLElement> & { value: string };
export type BchTabsProps = React.HTMLAttributes<HTMLElement> & {
  value?: string;
  onBchChange?: (e: CustomEvent<string>) => void;
};
export type BchTooltipProps = React.HTMLAttributes<HTMLElement> & {
  text?: string;
  placement?: 'top' | 'bottom';
};
export type BchTreeProps = React.HTMLAttributes<HTMLElement> & {
  /** Data-driven API; slotted `bch-tree-item` children win when both are present. */
  items?: BchTreeNode[];
  onBchSelect?: (e: CustomEvent<string>) => void;
};
export type BchTreeItemProps = React.HTMLAttributes<HTMLElement> & {
  value?: string;
  label?: string;
  expanded?: boolean;
  onBchSelect?: (e: CustomEvent<string>) => void;
};
export type BchSplitterProps = React.HTMLAttributes<HTMLElement> & {
  /** `horizontal` = the divider splits columns (vertical line, col-resize). */
  orientation?: 'horizontal' | 'vertical';
  onBchDrag?: (e: CustomEvent<{ deltaPx: number }>) => void;
};
export type BchStatusBarProps = React.HTMLAttributes<HTMLElement>;
export type BchModeBadgeProps = React.HTMLAttributes<HTMLElement> & {
  mode?: 'normal' | 'select' | 'edit' | 'custom';
  label?: string;
};
export type BchOmnibarProps = React.HTMLAttributes<HTMLElement> & {
  entries?: BchFunctionEntry[];
  placeholder?: string;
  onBchRun?: (e: CustomEvent<BchOmnibarResult>) => void;
  onBchInput?: (e: CustomEvent<string>) => void;
};
export type BchAlertProps = React.HTMLAttributes<HTMLElement> & {
  tone?: 'info' | 'success' | 'warning' | 'danger';
  heading?: string;
  dismissible?: boolean;
  onBchDismiss?: (e: CustomEvent<void>) => void;
};
export type BchStatusProps = React.HTMLAttributes<HTMLElement> & {
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'risk' | 'security';
  label?: string;
};
export type BchMetricCardProps = React.HTMLAttributes<HTMLElement> & {
  label?: string;
  value?: string;
  trend?: string;
  tone?: 'neutral' | 'positive' | 'negative';
};
export type BchEmptyStateProps = React.HTMLAttributes<HTMLElement> & {
  heading?: string;
  description?: string;
  provisional?: boolean;
};
export type BchDataTableProps = React.HTMLAttributes<HTMLElement> & {
  columns?: BchTableColumn[];
  rows?: BchTableRow[];
  caption?: string;
  filterable?: boolean;
  filterPlaceholder?: string;
  pageSize?: number;
  showTotals?: boolean;
  onBchSortChange?: (e: CustomEvent<{ key: string; direction: 'asc' | 'desc' | 'none' }>) => void;
  onBchFilterChange?: (e: CustomEvent<string>) => void;
  onBchPageChange?: (e: CustomEvent<number>) => void;
  onBchCellChange?: (e: CustomEvent<BchCellChangeDetail>) => void;
  onBchPaste?: (e: CustomEvent<BchPasteDetail>) => void;
};
export type BchToolbarProps = React.HTMLAttributes<HTMLElement>;

export const BchButton = createWrapper<BchButtonProps>('bch-button');
export const BchIcon = createWrapper<BchIconProps>('bch-icon');
export const BchIconButton = createWrapper<BchIconButtonProps>('bch-icon-button');
export const BchInput = createWrapper<BchInputProps>('bch-input');
export const BchTextarea = createWrapper<BchTextareaProps>('bch-textarea');
export const BchCheckbox = createWrapper<
  React.HTMLAttributes<HTMLElement> & { label?: string; checked?: boolean }
>('bch-checkbox');
export const BchRadio = createWrapper<
  React.HTMLAttributes<HTMLElement> & { label?: string; checked?: boolean }
>('bch-radio');
export const BchSwitch = createWrapper<
  React.HTMLAttributes<HTMLElement> & { label?: string; checked?: boolean }
>('bch-switch');
export type BchSelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'value'> & {
  label?: string;
  hint?: string;
  error?: string;
  value?: string;
};
export const BchSelect = createWrapper<BchSelectProps>('bch-select');
export const BchCard = createWrapper<BchCardProps>('bch-card');
export const BchBadge = createWrapper<BchBadgeProps>('bch-badge');
export const BchAvatar = createWrapper<BchAvatarProps>('bch-avatar');
export const BchProgress = createWrapper<BchProgressProps>('bch-progress');
export const BchSkeleton = createWrapper<BchSkeletonProps>('bch-skeleton');
export const BchSlider = createWrapper<BchSliderProps>('bch-slider');
export const BchPagination = createWrapper<BchPaginationProps>('bch-pagination');
export const BchBreadcrumbs = createWrapper<BchBreadcrumbsProps>('bch-breadcrumbs');
export const BchBreadcrumbItem = createWrapper<BchBreadcrumbItemProps>('bch-breadcrumb-item');
export const BchMenu = createWrapper<BchMenuProps>('bch-menu');
export const BchMenuItem = createWrapper<BchMenuItemProps>('bch-menu-item');
export const BchSegmentedControl = createWrapper<BchSegmentedControlProps>('bch-segmented-control');
export const BchSegmentedItem = createWrapper<BchSegmentedItemProps>('bch-segmented-item');
export const BchToastRegion = createWrapper<BchToastRegionProps>('bch-toast-region');
export const BchCombobox = createWrapper<BchComboboxProps>('bch-combobox');
export const BchComboboxOption = createWrapper<BchComboboxOptionProps>('bch-combobox-option');
export const BchDatePicker = createWrapper<BchDatePickerProps>('bch-date-picker');
export const BchTimePicker = createWrapper<BchTimePickerProps>('bch-time-picker');
export const BchFileUpload = createWrapper<BchFileUploadProps>('bch-file-upload');
export const BchAccordion = createWrapper<BchAccordionProps>('bch-accordion');
export const BchAccordionItem = createWrapper<BchAccordionItemProps>('bch-accordion-item');
export const BchDialog = createWrapper<BchDialogProps>('bch-dialog');
export const BchDrawer = createWrapper<BchDrawerProps>('bch-drawer');
export const BchFormField = createWrapper<BchFormFieldProps>('bch-form-field');
export const BchNav = createWrapper<BchNavProps>('bch-nav');
export const BchNavItem = createWrapper<BchNavItemProps>('bch-nav-item');
export const BchSpinner = createWrapper<BchSpinnerProps>('bch-spinner');
export const BchTab = createWrapper<BchTabProps>('bch-tab');
export const BchTabPanel = createWrapper<BchTabPanelProps>('bch-tab-panel');
export const BchTabs = createWrapper<BchTabsProps>('bch-tabs');
export const BchTooltip = createWrapper<BchTooltipProps>('bch-tooltip');
export const BchTree = createWrapper<BchTreeProps>('bch-tree');
export const BchTreeItem = createWrapper<BchTreeItemProps>('bch-tree-item');
export const BchSplitter = createWrapper<BchSplitterProps>('bch-splitter');
export const BchStatusBar = createWrapper<BchStatusBarProps>('bch-status-bar');
export const BchModeBadge = createWrapper<BchModeBadgeProps>('bch-mode-badge');
export const BchOmnibar = createWrapper<BchOmnibarProps>('bch-omnibar');
export const BchAlert = createWrapper<BchAlertProps>('bch-alert');
export const BchStatus = createWrapper<BchStatusProps>('bch-status');
export const BchMetricCard = createWrapper<BchMetricCardProps>('bch-metric-card');
export const BchEmptyState = createWrapper<BchEmptyStateProps>('bch-empty-state');
export const BchDataTable = createWrapper<BchDataTableProps>('bch-data-table');
export const BchToolbar = createWrapper<BchToolbarProps>('bch-toolbar');

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'bch-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchButtonProps;
      'bch-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchIconProps;
      'bch-icon-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchIconButtonProps;
      'bch-input': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchInputProps;
      'bch-textarea': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchTextareaProps;
      'bch-checkbox': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        label?: string;
        checked?: boolean;
      };
      'bch-radio': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        label?: string;
        checked?: boolean;
      };
      'bch-switch': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        label?: string;
        checked?: boolean;
      };
      'bch-select': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        label?: string;
        value?: string;
        disabled?: boolean;
      };
      'bch-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        interactive?: boolean;
      };
      'bch-badge': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        tone?: string;
      };
      'bch-avatar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchAvatarProps;
      'bch-progress': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchProgressProps;
      'bch-skeleton': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchSkeletonProps;
      'bch-slider': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchSliderProps;
      'bch-pagination': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchPaginationProps;
      'bch-breadcrumbs': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchBreadcrumbsProps;
      'bch-breadcrumb-item': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > &
        BchBreadcrumbItemProps;
      'bch-menu': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchMenuProps;
      'bch-menu-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchMenuItemProps;
      'bch-segmented-control': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > &
        BchSegmentedControlProps;
      'bch-segmented-item': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > &
        BchSegmentedItemProps;
      'bch-toast-region': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchToastRegionProps;
      'bch-combobox': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchComboboxProps;
      'bch-combobox-option': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > &
        BchComboboxOptionProps;
      'bch-date-picker': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchDatePickerProps;
      'bch-time-picker': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchTimePickerProps;
      'bch-file-upload': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchFileUploadProps;
      'bch-accordion': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchAccordionProps;
      'bch-accordion-item': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > &
        BchAccordionItemProps;
      'bch-dialog': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchDialogProps;
      'bch-drawer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchDrawerProps;
      'bch-form-field': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchFormFieldProps;
      'bch-nav': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchNavProps;
      'bch-nav-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchNavItemProps;
      'bch-spinner': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchSpinnerProps;
      'bch-tab': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchTabProps;
      'bch-tab-panel': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchTabPanelProps;
      'bch-tabs': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchTabsProps;
      'bch-tooltip': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchTooltipProps;
      'bch-tree': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchTreeProps;
      'bch-tree-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchTreeItemProps;
      'bch-splitter': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchSplitterProps;
      'bch-status-bar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchStatusBarProps;
      'bch-mode-badge': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchModeBadgeProps;
      'bch-omnibar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchOmnibarProps;
      'bch-alert': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchAlertProps;
      'bch-status': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchStatusProps;
      'bch-metric-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchMetricCardProps;
      'bch-empty-state': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchEmptyStateProps;
      'bch-data-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchDataTableProps;
      'bch-toolbar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> &
        BchToolbarProps;
    }
  }
}
