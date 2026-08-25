let rules=[];
async function load(){rules=await (await fetch('/api/rules')).json();render();clearEditor();}
function render(){document.getElementById('count').textContent='('+rules.length+')';
document.getElementById('rules').innerHTML=rules.map(r=>`<div class="rule">
<input class="check" type="checkbox" data-id="${r.id}" ${r.status!=='ACTIVE'?'disabled':''}>
<div><span class="rid">${esc(r.id)}</span> <b>${esc(r.name)}</b><br><span style="color:#8290a0">${esc(r.description)}</span></div>
<div class="level">${esc(r.level)}</div><div class="actions2"><span class="status ${r.status==='ACTIVE'?'activeStatus':'inactiveStatus'}">${r.status}</span>
<button class="icon" onclick="editRule('${r.id}')">Edit</button><button class="icon" onclick="toggleRule('${r.id}')">↕</button><button class="icon" onclick="deleteRule('${r.id}')">×</button></div></div>`).join('');}
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
function editRule(id){let r=rules.find(x=>x.id===id);rid.value=r.id;name.value=r.name;description.value=r.description;level.value=r.level;priority.value=r.priority;trigger.value=r.trigger;conditions.value=(r.conditions||[]).join('\\n');reactions.value=(r.reactions||[]).join('\\n');}
function clearEditor(){['rid','name','description','trigger','conditions','reactions'].forEach(x=>document.getElementById(x).value='');level.value='Logical';priority.value=5;}
function newRule(){clearEditor();name.focus();}
async function saveRule(){let body={name:name.value,description:description.value,level:level.value,priority:priority.value,trigger:trigger.value,conditions:conditions.value.split('\\n').map(x=>x.trim()).filter(Boolean),reactions:reactions.value.split('\\n').map(x=>x.trim()).filter(Boolean)};
let id=rid.value;let res=await fetch(id?'/api/rules/'+id:'/api/rules',{method:id?'PUT':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});if(!res.ok){alert('Unable to save rule');return}await load();}
async function deleteRule(id){if(!confirm('Delete '+id+'?'))return;await fetch('/api/rules/'+id,{method:'DELETE'});await load();}
async function toggleRule(id){await fetch('/api/rules/'+id+'/toggle',{method:'POST'});await load();}
function selected(){return [...document.querySelectorAll('.check:checked')].map(x=>x.dataset.id);}
async function inject(){let ids=selected();if(!ids.length){alert('Select at least one active rule.');return}let d=await (await fetch('/api/inject',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ids})})).json();injectResult.innerHTML=`<b>INJECTED</b> · ${d.count} rule(s) · ${d.injection_id}<br><span style="font-family:monospace">${d.hash}</span>`;}
async function test(){let ids=selected();let p=prompt.value.trim();if(!ids.length||!p){alert('Select rules and enter a test prompt.');return}let d=await (await fetch('/api/test',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ids,prompt:p})})).json();testResult.innerHTML=`<b>${d.decision}</b> · ${esc(d.reason)}<br>${esc(d.response)}<br><span class="tag">Triggered: ${d.triggered.join(', ')||'none'}</span>`;}
load();
