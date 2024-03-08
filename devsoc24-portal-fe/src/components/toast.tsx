export const InvalidCredentials = () => {
  return (
    <div className="">
      <h2 className="font-semibold">Unable to login</h2>
      <p>Please check your credentials and try again!</p>
    </div>
  );
};

export const ServerError = () => {
  return (
    <div className="">
      <h2 className="font-semibold">Something went wrong!</h2>
      <p>Please try again later.</p>
    </div>
  );
};

export const BadRequest = () => {
  return (
    <div className="">
      <h2 className="font-semibold">Bad Request!</h2>
      <p>Please check your input and try again.</p>
    </div>
  );
};
