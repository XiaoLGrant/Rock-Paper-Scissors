document.querySelector('#rock').addEventListener('click', makeReq)
document.querySelector('#paper').addEventListener('click', makeReq);
document.querySelector('#scissor').addEventListener('click', makeReq);

//const buttons = document.querySelectorAll('button')
//Array.from(buttons).forEach(button => button..addEventListener('click', makeReq)

async function makeReq(event){
  const res = await fetch(`/api?choice=${event.target.textContent.toLowerCase()}`)
  const data = await res.text();
  console.log(data);
  document.querySelector("#result").textContent = data;
}
