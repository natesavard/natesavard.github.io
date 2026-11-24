/* Journal live posts: reads public JSON published by Pages CMS.
   No credentials or GitHub tokens appear in visitors' browsers. */
(function(){
'use strict';
const FEED='/journal-feed.json';
const MAX_POSTS=200;
const safeMedia=(value)=>{
  if(typeof value!=='string'||!value.trim())return '';
  try{
    const url=new URL(value,location.origin);
    if(url.protocol!=='https:'&&url.origin!==location.origin)return '';
    if(url.origin!==location.origin)return '';
    return url.pathname+url.search;
  }catch{return ''}
};
const safeYouTube=(input)=>{
  if(typeof input!=='string')return '';
  try{
    const url=new URL(input);
    if(url.protocol!=='https:')return '';
    let id='';
    if(['youtube.com','www.youtube.com','m.youtube.com','youtube-nocookie.com','www.youtube-nocookie.com'].includes(url.hostname)){
      if(url.pathname==='/watch')id=url.searchParams.get('v')||'';
      else if(/^\/(shorts|embed|live)\//.test(url.pathname))id=url.pathname.split('/')[2]||'';
    }else if(url.hostname==='youtu.be')id=url.pathname.slice(1).split('/')[0];
    return /^[A-Za-z0-9_-]{11}$/.test(id)?'https://www.youtube-nocookie.com/embed/'+id:'';
  }catch{return ''}
};
function addInline(parent,raw){
  const text=String(raw||'');
  // Supported lightweight Markdown: links, bold and italic, as plain safe DOM nodes.
  const token=/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(\*\*([^*]+)\*\*)|(\*([^*\n]+)\*)/g;
  let end=0,m;
  while((m=token.exec(text))){
    if(m.index>end)parent.append(document.createTextNode(text.slice(end,m.index)));
    if(m[1]&&m[2]){
      const a=document.createElement('a');a.textContent=m[1];a.href=m[2];a.rel='noopener noreferrer';a.target='_blank';parent.append(a);
    }else if(m[4]){const b=document.createElement('strong');b.textContent=m[4];parent.append(b)}
    else if(m[6]){const i=document.createElement('em');i.textContent=m[6];parent.append(i)}
    end=token.lastIndex;
  }
  if(end<text.length)parent.append(document.createTextNode(text.slice(end)));
}
function bodyInto(container,value){
  const raw=String(value||'').replace(/\r\n/g,'\n').trim();
  if(!raw){const p=document.createElement('p');p.textContent='';container.append(p);return}
  const blocks=raw.split(/\n\s*\n/).slice(0,100);
  for(const block of blocks){
    const p=document.createElement('p');
    addInline(p,block.replace(/^#{1,6}\s+/,'').replace(/^[-*]\s+/gm,'• '));
    container.append(p);
  }
}
function makePost(post,index){
  const entry=document.createElement('article');
  entry.className='entry ns-live-journal-entry '+(index%2?'right':'left');
  entry.id='journal-live-'+(index+1);
  const photo=safeMedia(post.image);
  // Uses the existing Journal's photo plane and editorial overlays.
  if(photo){
    entry.style.setProperty('--photo','url("'+encodeURI(photo).replace(/"/g,'%22')+'")');
    entry.style.setProperty('--image-ratio','0.7');
  }else{
    entry.style.setProperty('--photo','none');
    entry.style.setProperty('--image-ratio','0.7');
  }
  const bg=document.createElement('div');bg.className='entry-photo';bg.setAttribute('aria-hidden','true');entry.append(bg);
  const content=document.createElement('div');content.className='entry-content';
  const meta=document.createElement('div');meta.className='meta';
  for(const t of ['NS / JOURNAL',String(post.date||'').slice(0,10),'LIVE / '+String(index+1).padStart(3,'0')]){
    const span=document.createElement('span');span.textContent=t;meta.append(span)
  }
  const h2=document.createElement('h2');h2.textContent=String(post.title||'Untitled').slice(0,180);
  const writing=document.createElement('div');writing.className='writing';bodyInto(writing,post.body);
  content.append(meta,h2,writing);
  const video=safeMedia(post.video), youtube=safeYouTube(post.youtube);
  if(youtube||video){
    const frame=document.createElement('div');frame.className='ns-journal-post-media';
    if(youtube){const iframe=document.createElement('iframe');iframe.src=youtube;iframe.title='Journal video: '+h2.textContent;iframe.loading='lazy';iframe.allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share';iframe.allowFullscreen=true;frame.append(iframe)}
    else {const player=document.createElement('video');player.src=video;player.controls=true;player.preload='metadata';player.playsInline=true;frame.append(player)}
    content.append(frame);
  }
  entry.append(content);
  const number=document.createElement('span');number.className='edge-number';number.textContent='NEW';entry.append(number);
  return entry;
}
window.nsJournalPostsReady=(async()=>{
  try{
    const response=await fetch(FEED,{cache:'no-store'});
    if(!response.ok)throw new Error('Journal feed unavailable: '+response.status);
    const data=await response.json();
    if(!Array.isArray(data))throw new Error('Expected list of journal posts');
    const posts=data.filter(p=>p&&typeof p==='object'&&p.published!==false&&p.title)
      .slice(0,MAX_POSTS)
      .sort((a,b)=>String(b.date||'').localeCompare(String(a.date||'')));
    const track=document.getElementById('journal-track');
    if(!track)return;
    // Append before original entries, before the original Journal script captures
    // and clones them for its existing infinite motion loop.
    const frag=document.createDocumentFragment();
    posts.forEach((post,index)=>frag.append(makePost(post,index)));
    track.insertBefore(frag,track.firstChild);
  }catch(error){console.warn('Journal publishing feed was not loaded; original entries retained.',error)}
})();
})();
