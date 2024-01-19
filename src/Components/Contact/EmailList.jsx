import React, { useState, useEffect } from 'react';
import { db } from '../../firebase-config';
import { collection, getDocs } from "firebase/firestore";
import { Header } from '../Header/header';
import './emailList.css'

const EmailList = () => {
  const [allEmails, setAllEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to get all emails from Firebase
  const getAllEmailsFromFirebase = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'email'));
      const emails = querySnapshot.docs.map((doc) => doc.data());
      setAllEmails(emails);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching emails from Firebase:', error);
      setLoading(false);
    }
  };

  // Call the function to get all emails when the component is rendered
  useEffect(() => {
    getAllEmailsFromFirebase();
  }, []);

  if (loading) {
    return (
      <div>
        <Header />
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className='email-list-ctn'>
      <Header />
      <br /><br /><br /><br /><br /><br />
      <h2>All Emails:</h2>
      <table className="table-container">
        <thead>
          <tr>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {allEmails.map((emailData) => (
            <tr key={emailData.timestamp}>
              <td>{emailData.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmailList;
