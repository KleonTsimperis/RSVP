import React, { Component } from 'react';
import './App.css';
import GuestList from './GuestList';

class App extends Component {

  state = {
    guests:[
      {
        name: 'Kleon',
        isConfirmed:false,
        isEditing:false
      },
      {
        name: 'Angelica',
        isConfirmed:true,
        isEditing:false
      },
      {
        name: 'May',
        isConfirmed:true,
        isEditing:true
      }
    ]
  }



  toggleGuestPropertyAt = (property,indexToChange) =>
    this.setState({
      guests:this.state.guests.map((guest,index)=>{
        if (index === indexToChange){ {/* I want to make a change only if the index matches */}
          return {
            ...guest,
            [property]: !guest[property]
          }
        }
        return guest;  {/* if the index doesn't match I return the same object and leaving it untouched */}
      })
    });



  toggleConfirmationAt = index =>
    this.toggleGuestPropertyAt("isConfirmed", index);

  toggleEditingAt = index =>
    this.toggleGuestPropertyAt("isEditing", index);




  getTotalInvitied = () => this.state.guests.length;
  //getAttendingGuests = () =>
  //getUnconfirmedGuests = () =>

  render() {
    return (
      <div className="App">
        <header>
          <h1>RSVP</h1>
          <p>My App</p>
          <form>
              <input type="text" value="Safia" placeholder="Invite Someone"/>
              <button type="submit" name="submit" value="submit">Submit</button>
          </form>
        </header>
        <div className="main">
          <div>
            <h2>Invitees</h2>
            <label>
              <input type="checkbox"/> Hide those who havent responded
            </label>
          </div>
          <table className="counter">
            <tbody>
              <tr>
                <td>Attending:</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Unconfirmed:</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Total:</td>
                <td>3</td>
              </tr>
            </tbody>
          </table>
          <GuestList
           guests ={this.state.guests}
           toggleConfirmationAt = {this.toggleConfirmationAt}
           toggleEditingAt = {this.toggleEditingAt}
           />
        </div>
      </div>
    );
  }
}

export default App;
