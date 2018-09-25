import React from 'react';
import ConfirmedFilter from './ConfirmedFilter';
import GuestList from './GuestList';
import Counter from './Counter';

const MainContent = props =>

  <div className="main">

    <ConfirmedFilter
    toggleFilter={props.toggleFilter}
    checked={props.cheked}
    />

    <Counter
     totalInvited={props.totalInvited}
     numberAttending={props.numberAttending}
     numberUnconfirmed={props.numberUnconfirmed}
     />

    <GuestList
     guests ={props.guests}
     toggleConfirmationAt = {props.toggleConfirmationAt}
     toggleEditingAt = {props.toggleEditingAt}
     setNameAt={props.setNameAt}
     isFiltered={props.isFiltered}
     removeGuestAt={props.removeGuestAt}
     pendingGuest={props.pendingGuest}
    />

  </div>;

export default MainContent;
