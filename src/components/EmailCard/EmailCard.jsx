import { useDispatch } from 'react-redux';
import './EmailCard.style.css';
import { selectEmail } from '../../slice/emailDetail';

const EmailCard = ({ email }) => {
  const dispatch = useDispatch();

  const date = new Date(email?.date);

  return (
    <article
      className='email__card'
      onClick={() => {
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
            {email?.from?.name} {`<${email.from.email}>`}
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
