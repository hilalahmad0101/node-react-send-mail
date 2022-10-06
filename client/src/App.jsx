import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [sendMail, setSendMail] = useState({
    email: "",
    body: "",
  })

  const [isLoading, setIsLoading] = useState(false)

  const inputHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setSendMail({ ...sendMail, [name]: value })
  }

  const submitMail = async () => {
    const data = {
      email: sendMail.email,
      body: sendMail.body,
    }
    setIsLoading(true);
    const res = await (await fetch('http://localhost:5000/send-mail', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })).json()
    if (res.success) {
      alert(res.message);
      setIsLoading(false);
      setSendMail({
        email:'',
        body:''
      })

    } else {
      alert(res.message)
      setIsLoading(false);

    }
  }
  return (
    <div className="App">
      <div>
        <input type="email" onChange={inputHandler} value={sendMail.email} name="email" className='form-control' placeholder='Enter Email' />
        <input type="text" onChange={inputHandler} value={sendMail.body} name="body" className='form-control' placeholder='Enter body Content' />
        <button type='submit' className='btn' onClick={submitMail}>{isLoading ? 'Loading....':'Send mail'}</button>
      </div>
    </div>
  )
}

export default App
