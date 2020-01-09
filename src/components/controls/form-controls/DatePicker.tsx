import React from 'react';
import moment from 'moment';
import {default as ReactDatePicker} from 'react-datepicker';
import {t} from '../../utils';
import {EnhanceInputWithLabel} from '../../enhancers/EnhanceInputWithLabel';
import {BaseInputProps} from './inputs/BaseInput';

type DatePickerProps = BaseInputProps<moment.Moment | null> & {
  showMonthYearPicker?: boolean;
  dateFormat?: string;
};

export const DatePicker = EnhanceInputWithLabel((props: DatePickerProps) => {
  return (
    <ReactDatePicker
      className="form-control"
      selected={props.value ? props.value.toDate() : undefined}
      onChange={dateString => props.onChange(dateString ? moment(dateString) : null)}
      locale="nl"
      dateFormat={props.dateFormat || 'dd/MM/yyyy'}
      peekNextMonth={false}
      todayButton={t('controls.today')}
      showMonthYearPicker={props.showMonthYearPicker}
    />
  );
});
