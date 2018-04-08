import React from 'react';
import PropTypes from 'prop-types';

const GuestInputForm = props =>

                    <form onSubmit={props.newGuestSubmitHandler}>
                        <input type="text" value={props.pendingGuest} placeholder="Invite Someone" onChange={props.handleNameInput.bind(this)}/>
                        <button type="submit" name="submit" value="submit">Submit</button>
                    </form>


GuestInputForm.propTypes = {
  newGuestSubmitHandler: PropTypes.func.isRequired,
  handleNameInput: PropTypes.string.isRequired,
  pendingGuest: PropTypes.func.isRequired,
}

export default GuestInputForm;
