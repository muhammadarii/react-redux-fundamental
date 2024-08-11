import PropTypes from "prop-types";

function Parent2({ name }) {
  return (
    <>
      <div>Parent2</div>
      <h1>{name}</h1>
    </>
  );
}

Parent2.propTypes = {
  name: PropTypes.string,
};

export default Parent2;
