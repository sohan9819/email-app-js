import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmails } from './slice/email';
import EmailCard from './components/EmailCard/EmailCard';
import EmailDetailCard from './components/EmailDetailCard/EmailDetailCard';

function App() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.email);
  const emailDetail = useSelector((state) => state.emailDetail);
  const { readed, favourites } = useSelector((state) => state.user);

  const [filter, setFilter] = useState(null);

  useEffect(() => {
    dispatch(fetchEmails());
  }, [dispatch]);

  if (email.isLoading) {
    return <h1>Loading...</h1>;
  }

  const filterEmails = (emails) => {
    switch (filter) {
      case 'read':
        return emails.filter((email) => readed.includes(email.id));
      case 'unread':
        return emails.filter((email) => !readed.includes(email.id));
      case 'favourites':
        return emails.filter((email) => favourites.includes(email.id));

      default:
        return emails;
    }
  };

  return (
    <>
      <div className='App'>
        <header className='filter__container'>
          <h2 className='filter__title'>Filter By : </h2>
          <button
            className={`filter__buttons ${filter === 'unread' ? 'active' : ''}`}
            onClick={() =>
              setFilter((prev) => (prev === 'unread' ? null : 'unread'))
            }
          >
            Uread
          </button>
          <button
            className={`filter__buttons ${filter === 'read' ? 'active' : ''}`}
            onClick={() =>
              setFilter((prev) => (prev === 'read' ? null : 'read'))
            }
          >
            Read
          </button>
          <button
            className={`filter__buttons ${
              filter === 'favourites' ? 'active' : ''
            }`}
            onClick={() =>
              setFilter((prev) => (prev === 'favourites' ? null : 'favourites'))
            }
          >
            Favourites
          </button>
        </header>

        <main className={`container ${emailDetail.data ? 'selected' : ''}`}>
          <div className='email__list'>
            {filter === null
              ? email.data?.map((eml) => <EmailCard key={eml.id} email={eml} />)
              : filterEmails(email.data)?.map((eml) => (
                  <EmailCard key={eml.id} email={eml} />
                ))}
          </div>
          {email.data && emailDetail.data ? <EmailDetailCard /> : ''}
        </main>
      </div>
    </>
  );
}

export default App;
