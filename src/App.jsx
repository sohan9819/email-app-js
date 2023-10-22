import { useEffect } from 'react'
import './App.css'
import { useDispatch , useSelector } from 'react-redux'
import {fetchEmails} from "./slice/email"
import EmailCard from './components/EmailCard/EmailCard'
import EmailDetailCard from './components/EmailDetailCard/EmailDetailCard'


function App() {
  const dispatch = useDispatch()
  const email = useSelector(state => state.email)
  const emailDetail = useSelector(state => state.emailDetail)


  useEffect(() => {
    dispatch(fetchEmails())
  },[dispatch])

  if(email.isLoading){
    return <h1>Loading...</h1>
  }



  return (
    <>
    <div className="App">
      <header className='filter__container'>
        <h2 className='filter__title'>Filter By : </h2>
        <button className='filter__buttons'>Uread</button>
        <button className='filter__buttons active'>Read</button>
        <button className='filter__buttons'>Favourites</button>
      </header>

      <main className={`container ${emailDetail.data ? "selected" : ""}`}>
      <div className='email__list'>
      {email.data?.map((eml) => <EmailCard key={eml.id} email={eml} />) 
      }
      </div>
        {
          email.data && emailDetail.data ? <EmailDetailCard /> : ""
        }
      </main>
    </div>
    </>
  )
}

export default App
