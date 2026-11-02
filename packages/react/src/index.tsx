import * as React from 'react';
import '@bench/components';
import { createWrapper } from './create-wrapper';

/**
 * Coverage: every component in packages/components/src/components/*.tsx now
 * has a typed React wrapper below (accordion/accordion-item, dialog, drawer,
 * form-field, nav/nav-item, spinner, tab/tab-panel/tabs, tooltip were the
 * last 12 added — `toast.tsx` implements the `bch-toast-region` tag, already
 * covered by `BchToastRegion`, so it was never actually a 13th gap). The
 * same 12 are still missing from @bench/vue — see that package's index.ts.
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
    }
  }
}
