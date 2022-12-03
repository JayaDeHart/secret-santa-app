export default function emailTemplate(member) {
  return `<div>
        <h1>Hello from Jaya's Secret Santa Bot</h1>
        <h3>Beep Boop, I am a robot</h3>
        <h4>
         You are buying a present for: ${member.santa} If its Jaya, get him something extra
         nice 
        </h4>
    </div>`;
}
