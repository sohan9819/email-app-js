import { useDispatch, useSelector } from 'react-redux';
import './EmailCard.style.css';
import { selectEmail } from '../../slice/emailDetail';
import { setRead } from '../../slice/user';

const EmailCard = ({ email }) => {
  const dispatch = useDispatch();
  const date = new Date(email?.date);
  const { readed } = useSelector((state) => state.user);

  return (
    <article
      className={`email__card ${readed.includes(email.id) ? 'readed' : ''}`}
      onClick={() => {
        if (!readed.includes(email.id)) {
          dispatch(setRead({ type: 'read', id: email.id }));
        }
        dispatch(selectEmail({ ...email }));
      }}
    >
      <div className='email__profile'>
        <div className='email__profile__image'>F</div>
      </div>
      <div className='email__content'>
        <p className='email__info'>
          From :{' '}
          <b>
            {email?.from?.name} {`<${email?.from?.email}>`}
          </b>
        </p>
        <p className='email__info'>
          Subject : <b>{email?.subject}</b>
        </p>
        <p className='email__body'>{email?.short_description}</p>
        <p className='email__timestamp'>{date.toLocaleString()}</p>
      </div>
    </article>
  );
};

export default EmailCard;
