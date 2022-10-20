import PropTypes from 'prop-types';
import { FormLabel } from 'components/PhonebookForm/FormInput';
import { Input } from './Filter.styled';

export const Filter = ({ onFilterContacts, inputValue }) => {
  const onInputChange = e => onFilterContacts(e.target.value.toLowerCase());

  return (
    <label>
      <FormLabel>Find contacts by name</FormLabel>
      <Input
        type="text"
        name="filter"
        value={inputValue}
        onChange={onInputChange}
      ></Input>
    </label>
  );
};

Filter.propTypes = {
  inputValue: PropTypes.string.isRequired,
  onFilterContacts: PropTypes.func.isRequired,
};
