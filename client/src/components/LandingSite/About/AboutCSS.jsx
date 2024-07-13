import PropTypes from "prop-types";

Card.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    designation: PropTypes.string.isRequired,
  }).isRequired,
};

function Card({ member }) {
  return (
    <div className="rounded-lg shadow-lg p-5 bg-gray-600">
      <div className="relative overflow-hidden rounded-full w-80 h-80 mx-auto mb-4">
        <img
          className="absolute inset-0 w-full h-full object-cover object-center rounded-full"
          src={member.image}
          alt={member.name}
        />
      </div>
      <div className="text-center">
        <h3 className="text-xl font-medium text-white mb-2">{member.name}</h3>
        <div className="text-gray-400 text-sm mb-4" >{member.designation}</div>
        <a
  href="https://www.linkedin.com/in/amarpreetsinghh/"
  className="bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded cursor-pointer"
>
  LinkedIn Profile
</a>

      </div>
    </div>
  );
}

export { Card };
