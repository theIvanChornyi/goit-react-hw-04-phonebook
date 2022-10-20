import { useState, useEffect } from 'react';

import { Section } from './Section';
import { Box } from './Box';
import { Contacts } from './Contacts';
import { PhonebookForm } from './PhonebookForm';
import { Filter } from './Contacts/Filter';

const INITIAL_CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [filter, setFilter] = useState('');
  const [filtredContacts, setFiltredContacts] = useState([]);
  const [contacts, setContacts] = useState(() => {
    const fromMemContacts = JSON.parse(window.localStorage.getItem('contacts'));
    return fromMemContacts ?? INITIAL_CONTACTS;
  });

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const filtredArr = contacts.filter(contact => {
      const normalizedName = contact.name.toLowerCase();
      return normalizedName.includes(filter);
    });
    setFiltredContacts([...filtredArr]);
  }, [contacts, filter]);

  const addContact = newContact => {
    setContacts(prev => [...prev, ...[newContact]]);
  };

  const deleteContact = contactId => {
    setContacts([...contacts.filter(contact => contact.id !== contactId)]);
  };
  return (
    <Box as="main">
      <Section tittle="Phonebook">
        <PhonebookForm onAddContact={addContact} initState={contacts} />
      </Section>

      <Section tittle="Contacts">
        <Filter onFilterContacts={setFilter} inputValue={filter} />
        <Contacts contacts={filtredContacts} onDeleteContact={deleteContact} />
      </Section>
    </Box>
  );
};
