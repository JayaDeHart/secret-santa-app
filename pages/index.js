import assignPartners from '../util/assign-partners';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import AddedMember from '../components/addedMember';
import { GiPresent } from 'react-icons/gi';

export default function Home() {
  const [members, setMembers] = useState([]);
  const [err, setErr] = useState(null);

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

  function removeMember(member) {
    const filtered = members.filter((m) => m.name !== member.name);
    console.log(filtered);
    setMembers(filtered);
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
    })
      .then((res) => {
        alert('emails sent!');
      })
      .catch((err) => {
        setErr(err || err.message);
      });
  }

  const backgroundStyle = {
    backgroundColor: '#d49a9a',
    backgroundImage: `url(
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='24' viewBox='0 0 20 12'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='charlie-brown' fill='%233a8b30' fill-opacity='0.4'%3E%3Cpath d='M9.8 12L0 2.2V.8l10 10 10-10v1.4L10.2 12h-.4zm-4 0L0 6.2V4.8L7.2 12H5.8zm8.4 0L20 6.2V4.8L12.8 12h1.4zM9.8 0l.2.2.2-.2h-.4zm-4 0L10 4.2 14.2 0h-1.4L10 2.8 7.2 0H5.8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
    )`,
  };

  return (
    <div className="main" style={backgroundStyle}>
      {err && <p>{err}</p>}
      <div className="brain">
        <h1>
          <GiPresent color="red" />
          Secret Santa Helper
          <GiPresent color="green" />
        </h1>
        <h2>
          Set up Secret Santa remotely without anyone knowing all the pairs. SSH
          will email you your secret santa!
        </h2>
        <h3>Add Members</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Name</label>
          <input {...register('name')} />
          <label>Email</label>
          <input {...register('email')} />
          <button className="penis" type="submit">
            Add
          </button>
        </form>
        <br></br>
        {members.map((member) => (
          <AddedMember
            member={member}
            removeMember={removeMember}
            key={member.name}
          />
        ))}
        <br></br>
        <button
          className="penis"
          onClick={sendEmails}
          disabled={members.length < 2}
        >
          Securely Send Secret Santa Suitors
        </button>
      </div>
    </div>
  );
}
