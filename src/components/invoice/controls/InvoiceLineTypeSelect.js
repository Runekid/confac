import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {t} from '../../util.js';
import {SimpleSelect} from '../../controls/Select.js';


export const invoiceLineTypes = ['hourly', 'daily', 'km', 'items', 'section', 'other'];


export class InvoiceLineTypeSelect extends Component {
  static propTypes = {
    type: PropTypes.oneOf(invoiceLineTypes).isRequired,
    onChange: PropTypes.func.isRequired,
  }
  static defaultProps = {type: 'hourly'}

  render() {
    const {type, ...props} = this.props;
    return (
      <SimpleSelect
        transFn={key => t('rates.types.' + key)}
        value={type}
        options={invoiceLineTypes}
        clearable={false}
        {...props}
      />
    );
  }
}
