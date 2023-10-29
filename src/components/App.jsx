import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { Form } from './Form/Form';
import ContactList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';

export function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    if (contacts.find(contact => contact.name === data.name)) {
      alert(`${data.name} is already exist in the phonebook!`);
      return;
    }

    const newContact = { name: data.name, number: data.number, id: nanoid() };

    setContacts([...contacts, newContact]);
  };

  const handleFilter = ({ currentTarget }) => {
    setFilter(currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const getFilteredContacts = () => {
    const normalazedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalazedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div>
      <h2>Phonebook</h2>
      <Form onSubmit={formSubmitHandler}></Form>

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilter} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}

// export class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   formSubmitHandler = data => {
//     if (this.state.contacts.find(contact => contact.name === data.name)) {
//       alert(`${data.name} is already exist in the phonebook!`);
//       return;
//     }

//     const newContact = { name: data.name, number: data.number, id: nanoid() };

//     this.setState(({ contacts }) => ({
//       contacts: [...contacts, newContact],
//     }));
//   };

//   handleFilter = e => {
//     this.setState({
//       filter: e.currentTarget.value,
//     });
//   };

//   deleteContact = contactId => {
//     this.setState(({ contacts }) => ({
//       contacts: contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   getFilteredContacts = () => {
//     const { contacts, filter } = this.state;

//     const normalazedFilter = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalazedFilter)
//     );
//   };

//   render() {
//     const { filter } = this.state;
//     const filteredContacts = this.getFilteredContacts();

//     return (
//       <div>
//         <h2>Phonebook</h2>
//         <Form onSubmit={this.formSubmitHandler}></Form>

//         <h2>Contacts</h2>
//         <Filter value={filter} onChange={this.handleFilter} />
//         <ContactList
//           contacts={filteredContacts}
//           onDeleteContact={this.deleteContact}
//         />
//       </div>
//     );
//   }
// }
