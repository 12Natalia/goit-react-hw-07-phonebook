import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  selectError,
  selectFilteredContacts,
  selectIsLoading,
} from 'redux/selectors';
import { fetchContacts, deleteContact } from 'redux/operations';
import { Message, List, Item, Contact, Button } from './ContactList.styled';
import { LoadingIndicator } from 'components/LoadingIndicator';

export const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <>
      {isLoading && <LoadingIndicator />}

      {!filteredContacts?.length && !error && !isLoading && (
        <Message>There are no contacts.</Message>
      )}

      {error && <Message>{error}</Message>}
      <List>
        {filteredContacts.map(({ id, name, phone }) => (
          <Item key={id}>
            <Contact>
              {name}: {phone}
            </Contact>
            <Button type="button" onClick={() => onDeleteContact(id)}>
              Delete
            </Button>
          </Item>
        ))}
      </List>
    </>
  );
};
