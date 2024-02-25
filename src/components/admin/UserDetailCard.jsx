
const UserDetailCard = ({ uid, name, email, onMakeCreator }) => {

  console.log(uid.length);

    return (
      <div className=" bg-slate-600 rounded-md shadow-md p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white mb-2">{name}</h2>
          <p className="text-sm text-white">{email}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xs text-white">User ID: {uid.slice(0,8)}*********{uid.slice(20,27)}</p>
          <button
            onClick={() => onMakeCreator(uid)}
            className="bg-slate-800 hover:bg-slate-900 transition-all
             text-white py-1 px-2 rounded-md text-xs focus:outline-none
              focus:ring focus:ring-yellow-300 shadow-md shadow-white"
          >
            Make Creator
          </button>
        </div>
      </div>
    );
  };
  

export default UserDetailCard