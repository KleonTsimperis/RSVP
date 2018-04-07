import React, { Component } from 'react';
import './App.css';
import GuestList from './GuestList';
import Counter from './Counter';

class App extends Component {

  state = {
    isFiltered:false,
    pendingGuest:"",
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

  removeGuestAt = index =>
    this.setState({
      guests:[
        ...this.state.guests.slice(0,index),
        ...this.state.guests.slice(index+1)
      ]
    });

  toggleEditingAt = index =>
    this.toggleGuestPropertyAt("isEditing", index);


  setNameAt = (name,indexToChange) =>
    this.setState({
      guests:this.state.guests.map((guest,index)=>{
        if (index === indexToChange){ {/* I want to make a change only if the index matches */}
          return {
            ...guest,
            name
          }
        }
        return guest;  {/* if the index doesn't match I return the same object and leaving it untouched */}
      })
    });

  toggleFilter = () =>
    this.setState({
      isFiltered: !this.state.isFiltered
    });


  newGuestSubmitHandler = e => {
    e.preventDefault();
    this.setState({
      guests:[
        {
          name:this.state.pendingGuest,
          isConfirmed:false,
          isEditing:false
        },
        ...this.state.guests
      ],
      pendingGuest:""
    });
  }

  getTotalInvitied = () => this.state.guests.length;

  getAttendingGuests = () =>
   this.state.guests
    .reduce((total,guest)=>guest.isConfirmed?total+1 : total,
    0);




  handleNameInput(e){
    this.setState({
      pendingGuest:e.target.value
    });
  }

  render() {
    const totalInvited = this.getTotalInvitied();
    const numberAttending = this.getAttendingGuests();
    const numberUnconfirmed = totalInvited - numberAttending;
    return (
      <div className="App">
        <header>
          <h1>RSVP</h1>
          <p>My App</p>
          <form onSubmit={this.newGuestSubmitHandler}>
              <input type="text" value={this.state.pendingGuest} placeholder="Invite Someone" onChange={this.handleNameInput.bind(this)}/>
              <button type="submit" name="submit" value="submit">Submit</button>
          </form>
        </header>
        <div className="main">
          <div>
            <h2>Invitees</h2>
            <label>
              <input
               type="checkbox"
               onChange={this.toggleFilter}
               checked={this.state.isFiltered}
               /> Hide those who havent responded
            </label>
          </div>
          <Counter
           totalInvited={totalInvited}
           numberAttending={numberAttending}
           numberUnconfirmed={numberUnconfirmed}
           />

          <GuestList
           guests ={this.state.guests}
           toggleConfirmationAt = {this.toggleConfirmationAt}
           toggleEditingAt = {this.toggleEditingAt}
           setNameAt={this.setNameAt}
           isFiltered={this.state.isFiltered}
           removeGuestAt={this.removeGuestAt}
           pendingGuest={this.state.pendingGuest}
          />
        </div>
      </div>
    );
  }
}

export default App;
