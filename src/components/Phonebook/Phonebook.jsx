import { Component } from "react";
import { nanoid } from 'nanoid';

export class Phonebook extends Component {
    state = {
        contacts: [
            {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
            {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
            {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
            {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
        ],
        filter: '',
        name: '',
        number: ''
    }

    addContact = (e) => {
        e.preventDefault()
        const newContact = {
            id: 'id-' + nanoid(5),
            name: e.target.name.value,
            number: e.target.number.value,
        }

        if(this.state.contacts.find(contact => contact.name === e.target.name.value)) {
            alert(`${newContact.name} is already in contacts.`)
            return
        }

        this.setState((prev) => ({
            name: e.target.name.value,
            number: e.target.number.value,
            contacts: [...prev.contacts, newContact]
            })
        ) 
        console.log(this.state)
    }

    onFilter = ({target: {value}}) => {
        this.setState({
            filter: value
        })
    }

    getContacts = () => {
        const {filter, contacts} = this.state
        return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
    }

    deleteContact = (e) => {
        const id = e.target.dataset.id
        this.setState((prev) => {
            return{
                contacts: prev.contacts.filter((contact) => contact.id !== id)
            }
        })
    }

    render() {
        return (
            <div>
                <h1>Phonebook</h1>
                <form action="form" onSubmit={this.addContact}>
                    <label>
                    Name
                        <input
                            type="text"
                            name="name"
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            required
                        />
                    </label>

                    <label>
                        Number
                        <input
                            type="tel"
                            name="number"
                            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                            required
                        />
                    </label>

                    <button type="submit">Додати контакт</button>
                </form>

                <h2>Contacts</h2>
                <label>
                    Name
                        <input
                            type="text"
                            name="filter"
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            onChange={this.onFilter}
                            value={this.state.filter}
                            required
                        />
                    </label>
                <ul>
                    {this.state.filter !== "" && <>
                        {this.getContacts().map(el => (
                            <li key={el.id}>
                                <p>{el.name}{el.number}</p>
                                <button data-id={el.id} type="button" onClick={this.deleteContact}>delete</button>
                            </li>
                        )
                        )}
                    </>
                    }
                </ul>
        </div>
        )
      }
}