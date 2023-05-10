import PropTypes from "prop-types";
// import cssContList from "./ContactList.module.css";

export function ContactList ({filterValue, getContacts, deleteContact}) {
    return (
        filterValue !== "" &&
            getContacts.map(el => (
                <li key={el.id}>
                    <p>{el.name}{el.number}</p>
                    <button data-id={el.id} type="button" onClick={deleteContact}>delete</button>
                </li>
            ))
    )

}
                    

ContactList.propTypes = {
    filterValue: PropTypes.string,
    getContacts: PropTypes.array,
    deleteContact: PropTypes.func,
}