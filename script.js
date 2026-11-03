const d=window.SCHOOL_DATA,$=id=>document.getElementById(id);
$("address").textContent=d.address;$("year").textContent=new Date().getFullYear();
const panel=$("chatPanel"),messages=$("chatMessages");
$("chatLauncher").onclick=()=>{panel.classList.add("open");$("chatInput").focus()};
let voiceOn=true,utterance=null;
function stopVoice(){if("speechSynthesis"in window)window.speechSynthesis.cancel();utterance=null}
$("chatClose").onclick=()=>{stopVoice();panel.classList.remove("open")};
$("voiceToggle").onclick=()=>{voiceOn=!voiceOn;$("voiceToggle").textContent=voiceOn?"🔊":"🔇";$("voiceToggle").classList.toggle("active",voiceOn);$("chatFoot").textContent=voiceOn?"🔊 Spoken answers are on · Browser voice":"🔇 Voice off · Text answers remain";if(!voiceOn)stopVoice()};
function speak(text){if(!voiceOn||!("speechSynthesis"in window))return;stopVoice();let u=new SpeechSynthesisUtterance(text);u.lang="en-IN";u.rate=.93;let vs=speechSynthesis.getVoices();u.voice=vs.find(v=>/en-IN/i.test(v.lang))||vs.find(v=>/^en/i.test(v.lang))||null;utterance=u;speechSynthesis.speak(u)}
function add(text,who){let el=document.createElement("div");el.className="msg "+who;messages.appendChild(el);if(who==="bot"){let i=0;function tick(){if(i<text.length){el.textContent+=text[i++];messages.scrollTop=messages.scrollHeight;setTimeout(tick,15)}}tick();speak(text)}else el.textContent=text;messages.scrollTop=messages.scrollHeight}
const norm=s=>s.toLowerCase().replace(/[’']/g,"").replace(/[^a-z0-9₹\s-]/g," ").replace(/\s+/g," ").trim();
const has=(q,arr)=>arr.some(x=>q.includes(x));
function reply(raw){
 let q=norm(raw);
 let teacher=d.teachers.map(t=>`${t.name} teaches ${t.subjects.join(", ")} and has ${t.experience} of teaching experience.`).join("\n");
 let strength=d.classStrength.map(c=>`Class ${c.class}: ${c.students} students`).join("\n");
 let fees=d.fees.map(f=>`${f.classes}: ${f.amount}`).join("\n");
 if(has(q,["hello","hi","hey","namaste","good morning"]))return `Hello! Welcome to ${d.name}. I can answer school questions, science questions and India general knowledge.`;
 if(has(q,["school name","name of school"]))return `The school name is ${d.name}.`;
 if(has(q,["address","location","where is school","school located"]))return `The school address is ${d.address}.`;
 if(has(q,["principal","headmistress"]))return `The principal is ${d.principal}.`;
 if(has(q,["director"]))return `The director is ${d.director}.`;
 if(has(q,["receptionist","reception"]))return `The receptionist is ${d.receptionist}.`;
 if(has(q,["computer operator"]))return `The computer operator is ${d.computerOperator}.`;
 if(has(q,["accountant","accountant experience"]))return `${d.accountant} is the accountant and has ${d.accountantExperience} of work experience.`;
 if(has(q,["all teachers","teacher list","staff","faculty"]))return `Here is the teaching team:\n${teacher}`;
 if(has(q,["english teacher","who teaches english"]))return "Abishek Singh teaches English and has 6 years of teaching experience.";
 if(has(q,["maths teacher","math teacher","mathematics teacher"]))return "Satyam Singh teaches Mathematics and has 7 years of teaching experience.";
 if(has(q,["science teacher","computer teacher","hindi teacher","jsp sir","jay shankar"]))return "Jay Shankar Prasad, also known as JSP Sir, teaches Science, Computer and Hindi. He has 5 years of teaching experience.";
 if(has(q,["experience","years teaching"]))return `Teaching experience:\n${teacher}\nDev Jyoti Sinha, the accountant, has 28 years of work experience.`;
 if(has(q,["school timing","school time","opening time","closing time"]))return `School timing is ${d.schoolTiming}.`;
 if(has(q,["lunch","lunch break"]))return `Lunch break is ${d.lunchTiming}.`;
 if(has(q,["fee","fees","fee structure","how much"]))return `The fee details provided are:\n${fees}\nPlease confirm payment frequency and any additional charges with the school office.`;
 if(has(q,["class strength","students in class","student count","how many students","class 6","class 7","class 8","class 9"])){let m=q.match(/class\s*(6|7|8|9)/);if(m){let c=d.classStrength.find(x=>x.class===m[1]);return `Class ${c.class} has ${c.students} students.`}return `Class-wise strength:\n${strength}\nTotal for Classes 6 to 9: 111 students.`}
 if(has(q,["building","buildings","school blocks"]))return `The school has three buildings: ${d.buildings.join(", ")}.`;
 if(has(q,["uniform","dress code","dress colour","dress color"]))return `Girls: ${d.girlsUniform}\nBoys: ${d.boysUniform}\nColours: ${d.uniformColours}`;
 if(has(q,["capital of india","capital india"]))return "The capital of India is New Delhi.";
 if(has(q,["national animal"]))return "The national animal of India is the Bengal tiger.";
 if(has(q,["national bird"]))return "The national bird of India is the Indian peafowl, commonly called the peacock.";
 if(has(q,["national flower"]))return "The national flower of India is the lotus.";
 if(has(q,["national anthem"]))return "India's national anthem is Jana Gana Mana, written by Rabindranath Tagore.";
 if(has(q,["national song"]))return "India's national song is Vande Mataram, written by Bankim Chandra Chatterjee.";
 if(has(q,["independence day"]))return "India celebrates Independence Day on 15 August. India became independent in 1947.";
 if(has(q,["republic day"]))return "India celebrates Republic Day on 26 January. The Constitution came into effect in 1950.";
 if(has(q,["states in india","how many states"]))return "India has 28 states and 8 Union Territories.";
 if(has(q,["isro","space agency"]))return "ISRO stands for Indian Space Research Organisation. It is India's national space agency.";
 if(has(q,["chandrayaan"]))return "Chandrayaan is India's lunar exploration programme. Chandrayaan-3 achieved a soft landing on the Moon on 23 August 2023.";
 if(has(q,["photosynthesis"]))return "Photosynthesis is the process by which green plants use sunlight, water and carbon dioxide to make food. Oxygen is released.";
 if(has(q,["gravity"]))return "Gravity is the force of attraction between objects with mass. Earth's gravity pulls objects towards the ground.";
 if(has(q,["solar system","planets"]))return "Our solar system has eight planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune.";
 if(has(q,["largest planet"]))return "Jupiter is the largest planet in our solar system.";
 if(has(q,["smallest planet"]))return "Mercury is the smallest planet in our solar system.";
 if(has(q,["red planet"]))return "Mars is called the Red Planet because iron-rich minerals on its surface give it a reddish colour.";
 if(has(q,["water formula","formula of water","h2o"]))return "The chemical formula of water is H two O. Each molecule has two hydrogen atoms and one oxygen atom.";
 if(has(q,["states of matter"]))return "The three common states of matter are solid, liquid and gas. A solid keeps its shape, a liquid flows, and a gas spreads to fill available space.";
 if(has(q,["atom"]))return "An atom is the smallest unit of an element that retains its chemical properties. It contains protons, neutrons and electrons.";
 if(has(q,["heart"]))return "The heart is a muscular organ that pumps blood around the body.";
 if(has(q,["lungs","breathing"]))return "The lungs help us breathe. They take oxygen into the blood and remove carbon dioxide.";
 if(has(q,["help","what can you do","topics"]))return "Ask me about school staff, subjects, experience, fees, timings, lunch, class strength, buildings, uniform, India general knowledge or basic science. I can also speak my answers aloud.";
 if(has(q,["thank","thanks"]))return "You're welcome! Keep learning and stay curious.";
 return "I don't have a reliable prepared answer for that question yet. Try asking about school information, India general knowledge or a basic science topic. For unlisted school details, please contact the school office.";
}
function send(q){if(!q.trim())return;add(q,"user");add(reply(q),"bot")}
$("chatForm").addEventListener("submit",e=>{e.preventDefault();let q=$("chatInput").value;$("chatInput").value="";send(q)});
document.querySelectorAll("[data-q]").forEach(b=>b.onclick=()=>send(b.dataset.q));
