import { useState } from 'react';
import css from './Form.module.css'

export function Form({onSubmit}) {
  const [name, setName] = useState()
  const [number, setNumber] = useState()

  const handleInput = e => {
    const { name, value } = e.currentTarget;
      
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        console.log('ERROR');
    }
   
    // this.setState({
    //   [e.currentTarget.name]: e.currentTarget.value,
    // });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    onSubmit({name, number});
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };


    return (
      <div className={css.formdiv}>
        <form className={css.form} onSubmit={handleFormSubmit}>
          <label>
            <p>Name:</p>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInput}
              required
            />
          </label>
          <label>
            <p>Number:</p>
            <input
              type="tel"
              name="number"
              value={number}
              onChange={handleInput}
              pattern="[0-9\-]+"
              required
            />
          </label>
          <button className={css.btn} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }



// export default class Form extends Component {
//   state = {
//     name: '',
//     number: '',
//   };

//   handleInput = e => {
//     this.setState({
//       [e.currentTarget.name]: e.currentTarget.value,
//     });
//   };

//   handleFormSubmit = e => {
//     e.preventDefault();

//     this.props.onSubmit(this.state);
//     this.reset();
//   };

//   reset = () => {
//     this.setState({
//       name: '',
//       number: '',
//     });
//   };

//   render() {
 

//     return (
//       <div className={css.formdiv}>
//         <form className={css.form} onSubmit={this.handleFormSubmit}>
//           <label>
//             <p>Name:</p>
//             <input
//               type="text"
//               name="name"
//               value={this.state.name}
//               onChange={this.handleInput}
//               required
//             />
//           </label>
//           <label>
//             <p>Number:</p>
//             <input
//               type="tel"
//               name="number"
//               value={this.state.number}
//               onChange={this.handleInput}
//               pattern="[0-9\-]+"
//               required
//             />
//           </label>
//           <button className={css.btn} type="submit">
//             Add contact
//           </button>
//         </form>
//       </div>
//     );
//   }
// }
