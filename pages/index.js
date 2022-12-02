import assignPartners from '../util/assign-partners';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import MemberInput from '../components/memberInput';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [elements, setElements] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  function addMember() {
    setElements([...elements, uuidv4()]);
  }

  console.log(elements);

  return (
    <div>
      <h1>Secret Santa Helper</h1>
      <h3>Set up Secret Santa remotely without anyone knowing all the pairs</h3>
      <h4>SSH will email you your secret santa!</h4>

      <h2>Add Members</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {elements.map((element, index) => (
          <MemberInput register={register} index={index} key={element} />
        ))}
      </form>
      <button onClick={addMember}>+</button>
    </div>
  );
}
