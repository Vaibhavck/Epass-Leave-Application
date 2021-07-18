import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out the features of this Application!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              text='Application for Students'
              label='Students Application'
              path='/studentStatus'
            />
            <CardItem
              src='images/img-2.jpg'
              text='Application for teachers'
              label='Teachers Application'
              path='/studentApplication'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text='Students leave application status'
              label='Students Application Status'
              path='/status'
            />
            <CardItem
              src='images/img-4.jpg'
              text='Teachers leave application status'
              label='Teachers Application Status'
              path='/status'
            />
            <CardItem
              src='images/img-8.jpg'
              text='You can signup here to save your application history in our system.'
              label='Sign Up for Students and Teachers'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;