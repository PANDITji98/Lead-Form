import { useState } from 'react';
import './App.css';
import FormInput from './components/FormInput';

function App() {
const [ values, setValues ] = useState({
  username: '',
  email: '',
  phoneNumber: '',
})

const inputs = [{
  id: 1,
  name: 'username',
  type: 'text',
  placeholder: 'Username',
  errorMessage: 'Username should be atleast 4-16 charactors',
  label: 'Username',
  pattern: '^[A-Za-z0-9]{4,16}$',                   //should start with and min charactors
  required: true,
},{
  id: 2,
  name: 'email',
  type: 'email',
  placeholder: 'Email',
  errorMessage: 'It should be a valid Email',
  label: 'Email',
  required: true,
},{
  id: 3,
  name: 'phoneNumber',
  type: 'text',
  placeholder: 'Phone-Number',
  errorMessage: 'It should be a valid contact number',
  label: 'Phone-Number',
  required: true,
},

]

const handleSubmit = async (e) => {
  e.preventDefault();            //toprevent it from refreshing the page

  const {username,email,phoneNumber} = values;                     //destructuring

  if(username && email && phoneNumber) {

    const res = await fetch('https://lead-form-960cb-default-rtdb.firebaseio.com/lead-form.json', {                      //CREATED DATA BASE ON FIREBASE
     method: 'POST',
     headers : {
      "Contecnt-Type" : "application/json",
     },
     body: JSON.stringify({
      username,
      email,
      phoneNumber,
     }),
  }
  );

  if(res){
    setValues({
      username: '',
      email: '',
      phoneNumber: '',
    });

    console.log('Data stored on firebase');
  }

} else {
    alert ('Please fill up all the details')
  }
};
 
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <div className='app'>
    <form onSubmit={handleSubmit}>
      <h1>Lead Form</h1>
      {inputs.map((input) => (
        <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
      ))}
      <button>Submit</button>
    </form>
    </div>
  );
}

export default App;
