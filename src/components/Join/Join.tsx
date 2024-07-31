import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { CustomizedAlert } from '../';
import { db, analytics } from '../../libs';
import { useAlert } from '../../hooks';
import * as ROUTES from '../../routes';
import { ALERT_TYPE, CALL_TYPE } from '../../interfaces';
import { config } from '../../shared';
import { v4 as uuidv4 } from 'uuid';
import './Join.css';

const { logoCount } = config;

export const Join: React.FC = () => {
  const logoIndex = Math.floor(Math.random() * logoCount) + 1;

  const [name, setName] = useState<string>('');
  const [callID, setCallID] = useState<string>('');
  const { openAlert, setOpenAlert, alertMessage, alertType, fireAlert } = useAlert();
  const history = useHistory();

  const handleCreateCall = () => {
    if (name.trim() === '') {
      fireAlert('Please Identify Yourself.', ALERT_TYPE.error);
      return;
    }

    const _callID = db.collection('calls').doc().id;
    const _userID = uuidv4();
    analytics.logEvent('create_call', {
      name,
      callID: _callID,
      _userID: _userID,
    });

    const location = {
      pathname: ROUTES.ROOM,
      state: {
        name,
        callID: _callID,
        callType: CALL_TYPE.video,
        userID: _userID,
        action: 'call',
      },
    };
    history.push(location);
  };

  const handleJoinCall = async () => {
    if (name.trim() === '') {
      fireAlert('Please Identify Yourself.', ALERT_TYPE.error);
      return;
    }
    if (callID.trim() === '') {
      fireAlert('Invalid Call ID. Please try again with a valid one.', ALERT_TYPE.error);
      return;
    }

    const callDoc = db.collection('calls').doc(callID);
    const testCall = await callDoc.get();
    if (!testCall.exists) {
      fireAlert('Invalid Call ID. Please try again with a valid one.', ALERT_TYPE.error);
      return;
    }

    const _userID = uuidv4();
    analytics.logEvent('join_call', {
      name,
      callID,
      _userID: _userID,
    });

    const location = {
      pathname: ROUTES.ROOM,
      state: {
        name,
        callID,
        callType: CALL_TYPE.video,
        userID: _userID,
        action: 'answer',
      },
    };
    history.push(location);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#000000"
    >
      <div id="joinContainer">
        <div id="inputContainer">
          <Typography variant="h5" gutterBottom>
            <span id="brand">Meetify</span>
          </Typography>
          <label htmlFor="name">Display Name</label>
          <TextField
            id="name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <Button
            id="createCallBtn"
            variant="contained"
            onClick={handleCreateCall}
            disabled={callID.length > 0}
          >
            Create Call
          </Button>
          <label htmlFor="callID">Call ID</label>
          <TextField
            id="callID"
            variant="outlined"
            value={callID}
            onChange={(e) => setCallID(e.target.value)}
            fullWidth
          />
          <Button
            id="joinCallBtn"
            variant="contained"
            color="secondary"
            onClick={handleJoinCall}
            disabled={callID.length === 0}
          >
            Join Call
          </Button>
          <br />
          <Link to={ROUTES.HOW_TO} id="howToLink">How it works?</Link>
        </div>
        <div id="logoContainer">
          {/* Your logo or other content goes here */}
        </div>
      </div>
      <CustomizedAlert
        duration={5000}
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        alertMessage={alertMessage}
        alertType={alertType}
      />
    </Box>
  );
};
