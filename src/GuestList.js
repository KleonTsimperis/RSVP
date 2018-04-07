import React from 'react';
import PropTypes from 'prop-types';
import Guest from './Guest';
import PendingGuest from './PendingGuest';

const GuestList = props =>
   <ul>
   <PendingGuest name={props.pendingGuest}/>
   {/*when isFiltered is false, checkbox is not selected and all guests appear. Currently isFiltered is set to false from the App component so now I use !props.isFiltered to reverse console.log(require('util').inspect(, { depth: null }));*/}
   {props.guests
        .filter(guest=> !props.isFiltered || guest.isConfirmed)
        .map((guest,index) =>
          <Guest
          key={index}
          name={guest.name}
          isConfirmed={guest.isConfirmed}
          isEditing={guest.isEditing}
          handleConfirmation={()=>props.toggleConfirmationAt(index)}
          handleToggleEditing={()=>props.toggleEditingAt(index)}
          setName={text=>props.setNameAt(text,index)}
          handleRemove={()=>props.removeGuestAt(index)}
         />
    )}
  </ul>;


  GuestList.propTypes = {
    guests: PropTypes.array.isRequired,
    toggleConfirmationAt: PropTypes.func.isRequired,
    toggleEditingAt: PropTypes.func.isRequired,
    setNameAt: PropTypes.func.isRequired,
    isFiltered:PropTypes.bool.isRequired,
    removeGuestAt:PropTypes.func.isRequired,
    pendingGuest:PropTypes.string.isRequired,

  }

export default GuestList;
