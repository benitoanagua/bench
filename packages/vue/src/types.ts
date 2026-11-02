import type { DefineComponent } from 'vue';
import type {
  BchCellChangeDetail,
  BchFunctionEntry,
  BchOmnibarResult,
  BchPasteDetail,
  BchTableColumn,
  BchTableRow,
  BchTreeNode,
} from '@bench/components';

/**
 * Typed prop surface for the Vue `GlobalComponents` entries. Vue templates
 * bind custom-element events through the same `onBch*` prop names the React
 * adapter uses, so events are part of the interface rather than a separate
 * `emits` declaration.
 */
export type BchComponent<TProps> = DefineComponent<TProps & Record<string, unknown>>;

type BchEvent<T> = (event: CustomEvent<T>) => void;

export interface BchAccordionProps {
  multiple?: boolean;
  onBchChange?: BchEvent<string[]>;
}
export interface BchAccordionItemProps {
  open?: boolean;
  value?: string;
  label?: string;
  onBchToggle?: BchEvent<boolean>;
}
export interface BchAlertProps {
  tone?: 'info' | 'success' | 'warning' | 'danger';
  heading?: string;
  dismissible?: boolean;
  onBchDismiss?: BchEvent<void>;
}
export interface BchAvatarProps {
  src?: string;
  name?: string;
  size?: 'small' | 'medium' | 'large';
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'busy' | 'away';
}
export interface BchBadgeProps {
  tone?: 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'risk' | 'security';
}
export interface BchBreadcrumbItemProps {
  href?: string;
  current?: boolean;
}
export interface BchBreadcrumbsProps {
  label?: string;
  maxItems?: number;
}
export interface BchButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  onBchPress?: BchEvent<MouseEvent>;
}
export interface BchCardProps {
  interactive?: boolean;
  onBchPress?: BchEvent<MouseEvent | KeyboardEvent>;
}
export interface BchCheckboxProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  value?: string;
  required?: boolean;
  onBchChange?: BchEvent<boolean>;
}
export interface BchComboboxOptionProps {
  value?: string;
  matched?: boolean;
  active?: boolean;
  selected?: boolean;
  onBchSelect?: BchEvent<string>;
}
export interface BchComboboxProps {
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
  onBchChange?: BchEvent<string>;
  onBchInput?: BchEvent<string>;
}
export interface BchDataTableProps {
  columns?: BchTableColumn[];
  rows?: BchTableRow[];
  caption?: string;
  filterable?: boolean;
  filterPlaceholder?: string;
  pageSize?: number;
  showTotals?: boolean;
  onBchSortChange?: BchEvent<{ key: string; direction: 'asc' | 'desc' | 'none' }>;
  onBchFilterChange?: BchEvent<string>;
  onBchPageChange?: BchEvent<number>;
  onBchCellChange?: BchEvent<BchCellChangeDetail>;
  onBchPaste?: BchEvent<BchPasteDetail>;
}
export interface BchDatePickerProps {
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
  onBchChange?: BchEvent<string>;
  onBchInput?: BchEvent<string>;
}
export interface BchDialogProps {
  open?: boolean;
  label?: string;
  closeOnEscape?: boolean;
  tone?: 'standard' | 'critical';
  onBchOpen?: BchEvent<void>;
  onBchClose?: BchEvent<void>;
}
export interface BchDrawerProps {
  open?: boolean;
  label?: string;
  side?: 'left' | 'right' | 'start' | 'end';
  closeOnEscape?: boolean;
  onBchOpen?: BchEvent<void>;
  onBchClose?: BchEvent<void>;
}
export interface BchEmptyStateProps {
  heading?: string;
  description?: string;
  provisional?: boolean;
}
export interface BchFileUploadProps {
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
  onBchFilesChange?: BchEvent<File[]>;
  onBchFileError?: BchEvent<unknown[]>;
}
export interface BchFormFieldProps {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
}
export interface BchIconProps {
  name: string;
  size?: string;
  label?: string;
  decorative?: boolean;
}
export interface BchIconButtonProps {
  name: string;
  label: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  onBchPress?: BchEvent<MouseEvent>;
}
export interface BchInputProps {
  label?: string;
  name?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  autocomplete?: string;
  inputmode?: string;
  onBchInput?: BchEvent<string>;
  onBchChange?: BchEvent<string>;
}
export interface BchMenuProps {
  open?: boolean;
  label?: string;
  placement?: 'bottom-start' | 'bottom-end';
  onBchOpenChange?: BchEvent<boolean>;
  onBchSelect?: BchEvent<string>;
}
export interface BchMenuItemProps {
  value?: string;
  disabled?: boolean;
  tone?: 'default' | 'danger';
  onBchSelect?: BchEvent<string>;
}
export interface BchMetricCardProps {
  label?: string;
  value?: string;
  trend?: string;
  tone?: 'neutral' | 'positive' | 'negative';
}
export interface BchModeBadgeProps {
  mode?: 'normal' | 'select' | 'edit' | 'custom';
  label?: string;
}
export interface BchNavProps {
  orientation?: 'horizontal' | 'vertical';
}
export interface BchNavItemProps {
  href?: string;
  active?: boolean;
  disabled?: boolean;
  onBchNavigate?: BchEvent<string>;
}
export interface BchOmnibarProps {
  entries?: BchFunctionEntry[];
  placeholder?: string;
  onBchRun?: BchEvent<BchOmnibarResult>;
  onBchInput?: BchEvent<string>;
}
export interface BchPaginationProps {
  page?: number;
  pageCount?: number;
  siblingCount?: number;
  label?: string;
  onBchChange?: BchEvent<number>;
}
export interface BchProgressProps {
  value?: number;
  indeterminate?: boolean;
  label?: string;
  tone?: 'action' | 'success' | 'danger' | 'warning';
}
export interface BchRadioProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  value?: string;
  required?: boolean;
  onBchChange?: BchEvent<string>;
}
export interface BchSegmentedControlProps {
  value?: string;
  label?: string;
  onBchChange?: BchEvent<string>;
}
export interface BchSegmentedItemProps {
  value?: string;
  disabled?: boolean;
  selected?: boolean;
  onBchSelect?: BchEvent<string>;
}
export interface BchSelectProps {
  label?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  hint?: string;
  error?: string;
  onBchChange?: BchEvent<string>;
}
export interface BchSkeletonProps {
  variant?: 'text' | 'circle' | 'rect';
  width?: string;
  height?: string;
}
export interface BchSliderProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  disabled?: boolean;
  showValue?: boolean;
  onBchInput?: BchEvent<number>;
  onBchChange?: BchEvent<number>;
}
export interface BchSpinnerProps {
  label?: string;
}
export interface BchSplitterProps {
  orientation?: 'horizontal' | 'vertical';
  onBchDrag?: BchEvent<{ deltaPx: number }>;
}
export interface BchStatusBarProps {
  // Content-only component: the app fills its four slots.
}
export interface BchStatusProps {
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'risk' | 'security';
  label?: string;
}
export interface BchSwitchProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  onBchChange?: BchEvent<boolean>;
}
export interface BchTabProps {
  value: string;
  active?: boolean;
  disabled?: boolean;
  onBchPress?: BchEvent<string>;
}
export interface BchTabPanelProps {
  value: string;
}
export interface BchTabsProps {
  value?: string;
  onBchChange?: BchEvent<string>;
}
export interface BchTextareaProps {
  label?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  rows?: number;
  onBchInput?: BchEvent<string>;
  onBchChange?: BchEvent<string>;
}
export interface BchTimePickerProps {
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
  onBchChange?: BchEvent<string>;
  onBchInput?: BchEvent<string>;
}
export interface BchToastRegionProps {
  placement?: 'top' | 'bottom';
  maxVisible?: number;
}
export interface BchToolbarProps {
  // Content-only component: start/main/end slots.
}
export interface BchTooltipProps {
  text?: string;
  placement?: 'top' | 'bottom';
}
export interface BchTreeItemProps {
  value?: string;
  label?: string;
  expanded?: boolean;
  onBchSelect?: BchEvent<string>;
}
export interface BchTreeProps {
  items?: BchTreeNode[];
  onBchSelect?: BchEvent<string>;
}
