export default function User({
  username,
  firstName,
  lastName,
  total,
  completed,
  pending,
}) {
  return (
    <div className="border border-solid  rounded-2xl p-5">
      <div className="text-center">
        <div className="flex justify-center">
          <div className="border border-black rounded-full bg-black w-12 h-12 mr-3">
            <div className="text-white mt-2 text-xl">
              {firstName[0].toUpperCase() + lastName[0].toUpperCase()}
            </div>
          </div>
          <div className="mt-2.25 text-2xl font-bold">
            {firstName.charAt(0).toUpperCase() +
              firstName.slice(1) +
              " " +
              lastName.charAt(0).toUpperCase() +
              lastName.slice(1)}
          </div>
        </div>
        <div className="ml-10">username: {username}</div>
      </div>
      <div className="flex justify-center text-2xl ml-5">
        <div className="m-5">
          <div>Total</div>
          <div className="m-4">{total}</div>
        </div>
        <div className="m-5">
          <div>Completed</div>
          <div className="m-4 ml-12.5">{completed}</div>
        </div>
        <div className="m-5">
          <div>Pending</div>
          <div className="m-4 ml-8.5">{pending}</div>
        </div>
      </div>
    </div>
  );
}
