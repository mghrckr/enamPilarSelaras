import { useState } from 'react';

const DetailLogin = () => {


    const serverName = localStorage.getItem('access_server')
    const databaseName = localStorage.getItem('access_db')
    const username = localStorage.getItem('access_user')

    return (
            <div className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
              <img className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0" src="https://tailwindcss.com/img/erin-lindford.jpg" alt="Woman's Face" />
              <div className="text-center space-y-2 sm:text-left">
                <div className="space-y-0.5">
                  <p className="text-lg text-black font-semibold">
                    {username}
                  </p>
                  <p className="text-slate-500 font-medium">
                    {databaseName}
                  </p>
                  <p className="text-slate-500 font-medium">
                    {serverName}
                  </p>
                </div>
              </div>
            </div>
          );
};

export default DetailLogin;
