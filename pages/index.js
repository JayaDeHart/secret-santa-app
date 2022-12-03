import assignPartners from '../util/assign-partners';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import MemberInput from '../components/memberInput';
import { v4 as uuidv4 } from 'uuid';
import { requestToBodyStream } from 'next/dist/server/body-streams';

export default function Home() {
  const [members, setMembers] = useState([]);

  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    setMembers([...members, data]);
    setFocus('name');
    reset();
  }

  function sendEmails() {
    const partners = assignPartners(members);
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(partners),
    }).then((res) => {
      alert('emails sent!');
    });
  }

  return (
    <div>
      <h1>Secret Santa Helper</h1>
      <h3>Set up Secret Santa remotely without anyone knowing all the pairs</h3>
      <h3>SSH will email you your secret santa!</h3>

      <h2>Add Members</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input {...register('name')} />
        <label>Email</label>
        <input {...register('email')} />
        <button type="submit">Add</button>
      </form>
      <button onClick={sendEmails}>Securely Send Secret Santa Suitors</button>
      {members.map((member) => (
        <div>{JSON.stringify(member)}</div>
      ))}
    </div>
  );
}
