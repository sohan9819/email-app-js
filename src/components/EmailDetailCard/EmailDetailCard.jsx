import './EmailDetailCard.style.css';
import { useDispatch, useSelector } from 'react-redux';
import { deSelectEmail } from '../../slice/emailDetail';
import { useEffect } from 'react';
import { fetchEmailDetail } from '../../slice/emailDetail';

const EmailDetailCard = () => {
  const { data, detail, isLoading } = useSelector((state) => state.emailDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data.id) {
      dispatch(fetchEmailDetail(data.id));
    }
  }, [data.id]);

  const date = new Date(data?.date);

  return (
    <div className='email__detail'>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className='email__profile'>
            <div className='email__profile__image'>F</div>
          </div>
          <div className='email__content'>
            <div className='email__head'>
              <h1 className='email__subject'>{data.subject}</h1>
              <span className='email__actions'>
                <button
                  className='email__fav-btn'
                  onClick={() => {
                    dispatch(deSelectEmail());
                  }}
                >
                  Close
                </button>
                <button className='email__fav-btn'>Mark as favorite</button>
              </span>
            </div>
            <p className='email__timestamp'>{date.toLocaleString()}</p>
            <p>{detail ? detail : data.short_description}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default EmailDetailCard;
