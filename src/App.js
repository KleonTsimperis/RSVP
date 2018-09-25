import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import MainContent from './MainContent';




class App extends Component {

    state = {
      isFiltered:false,
      pendingGuest:"",
      guests:[],

    };

  lastGuestId = 0;

  newGuestId = () => {
    const id = this.lastGuestId;
    this.lastGuestId += 1;
    return id;
  };



  toggleGuestPropertyAt = (property,id) =>
    this.setState({
      guests:this.state.guests.map(guest => {
        if (id === guest.id){
          return {
            ...guest,
            [property]: !guest[property]
          };
        }
        return guest;
      })
    });

  toggleConfirmationAt = id =>
    this.toggleGuestPropertyAt("isConfirmed", id);

  toggleEditingAt = id =>
    this.toggleGuestPropertyAt("isEditing", id);

  removeGuestAt = id =>
    this.setState({
      guests: this.state.guests.filter(guest => id !== guest.id)
    });


  setNameAt = (name,id) =>
    this.setState({
      guests:this.state.guests.map(guest=>{
        if (id === guest.id){
          return {
            ...guest,
            name
          };
        }
        return guest;
      })
    });

  toggleFilter = () =>
    this.setState({
      isFiltered: !this.state.isFiltered
    });


    newGuestSubmitHandler = e => {
      e.preventDefault();
      const id = this.newGuestId();
      this.setState({
        guests:[
          {
            name:this.state.pendingGuest,
            isConfirmed:false,
            isEditing:false,
            id:id
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


  handleNameInput = e =>
    this.setState({
      pendingGuest:e.target.value
    });


  render() {
    const totalInvited = this.getTotalInvitied();
    const numberAttending = this.getAttendingGuests();
    const numberUnconfirmed = totalInvited - numberAttending;
    return (
      <div className="App">

        <Header
         newGuestSubmitHandler={this.newGuestSubmitHandler}
         pendingGuest={this.state.pendingGuest}
         handleNameInput = {this.handleNameInput}
        />

        <MainContent
         toggleFilter={this.toggleFilter}
         isFiltered={this.state.isFiltered}
         totalInvited={totalInvited}
         numberAttending={numberAttending}
         numberUnconfirmed={numberUnconfirmed}
         guests={this.state.guests}
         toggleConfirmationAt={this.toggleConfirmationAt}
         toggleEditingAt={this.toggleEditingAt}
         setNameAt={this.setNameAt}
         removeGuestAt={this.removeGuestAt}
         pendingGuest={this.state.pendingGuest}
        />



      </div>
    );
  }
}

export default App;
