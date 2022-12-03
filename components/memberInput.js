export default function MemberInput({ register, index, uid }) {
  return (
    <div>
      <label>Name</label>
      <input {...register(`name-${uid}`)} />
      <label>Email</label>
      <input {...register(`email-${uid}`)} />
    </div>
  );
}
