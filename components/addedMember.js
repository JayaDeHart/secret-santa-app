export default function AddedMember(props) {
  const { name, email } = props.member;
  return (
    <div>
      <span>{name} : </span>
      <span> {email}</span>
      <button
        className="x"
        onClick={() => {
          props.removeMember(props.member);
        }}
      >
        X
      </button>
    </div>
  );
}
