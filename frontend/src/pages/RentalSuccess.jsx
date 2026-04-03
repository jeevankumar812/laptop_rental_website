import { useParams } from "react-router-dom";

const RentalSuccess = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Payment Successful 🎉</h1>
      <p>Your rental has been confirmed.</p>
      <p>Rental ID: {id}</p>
    </div>
  );
};

export default RentalSuccess;
