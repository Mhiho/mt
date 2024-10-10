import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { adresse } from '../config';
import { getUser } from '../src/services/auth';

function logoutAll() {
  return <h2>Wylogowałeś się ze wszystkich przeglądarek</h2>;
}

export default logoutAll;
