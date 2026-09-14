import * as React from 'react';
import '@bench/components';

export type BchButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'secondary'|'tertiary'|'danger'; size?: 'small'|'medium'|'large'; loading?: boolean; fullWidth?: boolean };
export type BchInputProps = React.InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string; error?: string };
export type BchTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; hint?: string; error?: string };
export type BchIconProps = React.HTMLAttributes<HTMLElement> & { name: string; size?: string; label?: string; decorative?: boolean };
export type BchIconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { name: string; label: string; size?: 'small'|'medium'|'large'; loading?: boolean };
export type BchCardProps = React.HTMLAttributes<HTMLElement> & { interactive?: boolean };
export type BchBadgeProps = React.HTMLAttributes<HTMLElement> & { tone?: string };
export type BchAvatarProps = React.HTMLAttributes<HTMLElement> & { src?: string; name?: string; size?: 'small'|'medium'|'large'; shape?: 'circle'|'square'; status?: 'online'|'offline'|'busy'|'away' };
export type BchProgressProps = React.HTMLAttributes<HTMLElement> & { value?: number; indeterminate?: boolean; label?: string; tone?: 'action'|'success'|'danger'|'warning' };
export type BchSkeletonProps = React.HTMLAttributes<HTMLElement> & { variant?: 'text'|'circle'|'rect'; width?: string; height?: string };
export type BchSliderProps = Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> & { value?: number; min?: number; max?: number; step?: number; label?: string; disabled?: boolean; showValue?: boolean; onBchInput?: (e: CustomEvent<number>) => void; onBchChange?: (e: CustomEvent<number>) => void };
export type BchPaginationProps = React.HTMLAttributes<HTMLElement> & { page?: number; pageCount?: number; siblingCount?: number; label?: string; onBchChange?: (e: CustomEvent<number>) => void };
export type BchBreadcrumbsProps = React.HTMLAttributes<HTMLElement> & { label?: string; maxItems?: number };
export type BchBreadcrumbItemProps = React.HTMLAttributes<HTMLElement> & { href?: string; current?: boolean };
export type BchMenuProps = React.HTMLAttributes<HTMLElement> & { open?: boolean; label?: string; placement?: 'bottom-start'|'bottom-end'; onBchOpenChange?: (e: CustomEvent<boolean>) => void; onBchSelect?: (e: CustomEvent<string>) => void };
export type BchMenuItemProps = React.HTMLAttributes<HTMLElement> & { value?: string; disabled?: boolean; tone?: 'default'|'danger'; onBchSelect?: (e: CustomEvent<string>) => void };
export type BchSegmentedControlProps = React.HTMLAttributes<HTMLElement> & { value?: string; label?: string; onBchChange?: (e: CustomEvent<string>) => void };
export type BchSegmentedItemProps = React.HTMLAttributes<HTMLElement> & { value?: string; disabled?: boolean; selected?: boolean };
export type BchToastRegionProps = React.HTMLAttributes<HTMLElement> & { placement?: 'top'|'bottom'; maxVisible?: number };
export type BchComboboxProps = React.HTMLAttributes<HTMLElement> & { label?: string; name?: string; value?: string; placeholder?: string; hint?: string; error?: string; required?: boolean; disabled?: boolean; allowCustomValue?: boolean; noResultsText?: string; onBchChange?: (e: CustomEvent<string>) => void; onBchInput?: (e: CustomEvent<string>) => void };
export type BchComboboxOptionProps = React.HTMLAttributes<HTMLElement> & { value?: string };
export type BchDatePickerProps = React.HTMLAttributes<HTMLElement> & { label?: string; name?: string; value?: string; min?: string; max?: string; locale?: string; firstDayOfWeek?: 0|1; hint?: string; error?: string; required?: boolean; disabled?: boolean; placeholder?: string; onBchChange?: (e: CustomEvent<string>) => void; onBchInput?: (e: CustomEvent<string>) => void };
export type BchTimePickerProps = React.HTMLAttributes<HTMLElement> & { label?: string; name?: string; value?: string; min?: string; max?: string; step?: number; hint?: string; error?: string; required?: boolean; disabled?: boolean; onBchChange?: (e: CustomEvent<string>) => void; onBchInput?: (e: CustomEvent<string>) => void };
export type BchFileUploadProps = React.HTMLAttributes<HTMLElement> & { label?: string; name?: string; accept?: string; multiple?: boolean; disabled?: boolean; required?: boolean; hint?: string; error?: string; maxSizeBytes?: number; dropzoneText?: string; browseText?: string; onBchFilesChange?: (e: CustomEvent<File[]>) => void; onBchFileError?: (e: CustomEvent) => void };

export const BchButton = React.forwardRef<HTMLElement, BchButtonProps>((props, ref) => <bch-button ref={ref as React.Ref<any>} {...props} />);
export const BchIcon = React.forwardRef<HTMLElement, BchIconProps>((props, ref) => <bch-icon ref={ref} {...props} />);
export const BchIconButton = React.forwardRef<HTMLElement, BchIconButtonProps>((props, ref) => <bch-icon-button ref={ref as React.Ref<any>} {...props} />);
export const BchInput = React.forwardRef<HTMLElement, BchInputProps>((props, ref) => <bch-input ref={ref as React.Ref<any>} {...props} />);
export const BchTextarea = React.forwardRef<HTMLElement, BchTextareaProps>((props, ref) => <bch-textarea ref={ref as React.Ref<any>} {...props} />);
export const BchCheckbox = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { label?: string; checked?: boolean }>((props, ref) => <bch-checkbox ref={ref} {...props} />);
export const BchRadio = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { label?: string; checked?: boolean }>((props, ref) => <bch-radio ref={ref} {...props} />);
export const BchSwitch = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { label?: string; checked?: boolean }>((props, ref) => <bch-switch ref={ref} {...props} />);
export type BchSelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'value'> & { label?: string; hint?: string; error?: string; value?: string };
export const BchSelect = React.forwardRef<HTMLElement, BchSelectProps>((props, ref) => <bch-select ref={ref as React.Ref<any>} {...props} />);
export const BchCard = React.forwardRef<HTMLElement, BchCardProps>((props, ref) => <bch-card ref={ref} {...props} />);
export const BchBadge = React.forwardRef<HTMLElement, BchBadgeProps>((props, ref) => <bch-badge ref={ref} {...props} />);
export const BchAvatar = React.forwardRef<HTMLElement, BchAvatarProps>((props, ref) => <bch-avatar ref={ref} {...props} />);
export const BchProgress = React.forwardRef<HTMLElement, BchProgressProps>((props, ref) => <bch-progress ref={ref} {...props} />);
export const BchSkeleton = React.forwardRef<HTMLElement, BchSkeletonProps>((props, ref) => <bch-skeleton ref={ref} {...props} />);
export const BchSlider = React.forwardRef<HTMLElement, BchSliderProps>((props, ref) => <bch-slider ref={ref as React.Ref<any>} {...props} />);
export const BchPagination = React.forwardRef<HTMLElement, BchPaginationProps>((props, ref) => <bch-pagination ref={ref} {...props} />);
export const BchBreadcrumbs = React.forwardRef<HTMLElement, BchBreadcrumbsProps>((props, ref) => <bch-breadcrumbs ref={ref} {...props} />);
export const BchBreadcrumbItem = React.forwardRef<HTMLElement, BchBreadcrumbItemProps>((props, ref) => <bch-breadcrumb-item ref={ref} {...props} />);
export const BchMenu = React.forwardRef<HTMLElement, BchMenuProps>((props, ref) => <bch-menu ref={ref} {...props} />);
export const BchMenuItem = React.forwardRef<HTMLElement, BchMenuItemProps>((props, ref) => <bch-menu-item ref={ref} {...props} />);
export const BchSegmentedControl = React.forwardRef<HTMLElement, BchSegmentedControlProps>((props, ref) => <bch-segmented-control ref={ref} {...props} />);
export const BchSegmentedItem = React.forwardRef<HTMLElement, BchSegmentedItemProps>((props, ref) => <bch-segmented-item ref={ref} {...props} />);
export const BchToastRegion = React.forwardRef<HTMLElement, BchToastRegionProps>((props, ref) => <bch-toast-region ref={ref} {...props} />);
export const BchCombobox = React.forwardRef<HTMLElement, BchComboboxProps>((props, ref) => <bch-combobox ref={ref} {...props} />);
export const BchComboboxOption = React.forwardRef<HTMLElement, BchComboboxOptionProps>((props, ref) => <bch-combobox-option ref={ref} {...props} />);
export const BchDatePicker = React.forwardRef<HTMLElement, BchDatePickerProps>((props, ref) => <bch-date-picker ref={ref} {...props} />);
export const BchTimePicker = React.forwardRef<HTMLElement, BchTimePickerProps>((props, ref) => <bch-time-picker ref={ref} {...props} />);
export const BchFileUpload = React.forwardRef<HTMLElement, BchFileUploadProps>((props, ref) => <bch-file-upload ref={ref} {...props} />);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'bch-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BchButtonProps;
      'bch-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BchIconProps;
      'bch-icon-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BchIconButtonProps;
      'bch-input': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BchInputProps;
      'bch-textarea': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BchTextareaProps;
      'bch-checkbox': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { label?: string; checked?: boolean };
      'bch-radio': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { label?: string; checked?: boolean };
      'bch-switch': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { label?: string; checked?: boolean };
      'bch-select': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { label?: string; value?: string; disabled?: boolean };
      'bch-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { interactive?: boolean };
      'bch-badge': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { tone?: string };
      'bch-avatar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BchAvatarProps;
      'bch-progress': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BchProgressProps;
      'bch-skeleton': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BchSkeletonProps;
      'bch-slider': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BchSliderProps;
      'bch-pagination': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BchPaginationProps;
      'bch-breadcrumbs': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BchBreadcrumbsProps;
      'bch-breadcrumb-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BchBreadcrumbItemProps;
      'bch-menu': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BchMenuProps;
      'bch-menu-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BchMenuItemProps;
      'bch-segmented-control': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BchSegmentedControlProps;
      'bch-segmented-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BchSegmentedItemProps;
      'bch-toast-region': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BchToastRegionProps;
      'bch-combobox': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BchComboboxProps;
      'bch-combobox-option': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BchComboboxOptionProps;
      'bch-date-picker': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BchDatePickerProps;
      'bch-time-picker': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BchTimePickerProps;
      'bch-file-upload': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BchFileUploadProps;
    }
  }
}
