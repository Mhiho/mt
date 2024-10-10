import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { adresse } from '../config';
import { getUser } from '../src/services/auth';

function logoutCurrent() {
  return <h2>Wylogowałeś się z tej przeglądarki</h2>;
}

export default logoutCurrent;
