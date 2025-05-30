import React from 'react'
import ProfileInfo from './profile-info';
import NewDM from './new-dm';
import AllContacts from './all-contacts';
import CreateChannel from './create-channel'
import AllGroups from './all-groups';

const ContactsContainer = () => {
  return (
    <div className='h-full md:w-[35vw] lg:w-[30vw] flex flex-col justify-between items-center xl:w-[20vw] bg-gray-500 border-r-2 border-black w-full'>
      <div className="w-full">
        <div className="w-full pt-3">
          <p className='w-full flex justify-center items-center text-green-300 text-3xl font-bold '>Baatchit</p>
        </div>

        <div className="my-5 max-h-[50%] ">
          <div className="flex  justify-between items-center gap-10 pr-10">
            <Title text={"Messages"} />
            <NewDM/>
          </div>
          <div className="w-full my-5 overflow-y-auto">
            <AllContacts/>
          </div>
        </div>

        <div className="my-5 max-h-[50%] overflow-y-auto">
          <div className="flex justify-between items-center pr-10">
            <Title text={"Groups"} />
            <CreateChannel/>
          </div>
          <div className="w-full my-5 overflow-y-auto">
            <AllGroups/>
          </div>
        </div>
      </div>
      <ProfileInfo />
    </div>
  )
}

export default ContactsContainer


const Title = ({ text }) => {
  return (
    <h6 className='uppercase pl-10 text-2xl '> {text}</h6>
  );
};