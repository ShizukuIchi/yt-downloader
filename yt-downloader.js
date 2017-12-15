javascript: 
QsCdn = () => new Promise(resolve => { 
  let queryString = document.createElement('script'); 
  queryString.src = 'https://cdnjs.cloudflare.com/ajax/libs/qs/6.5.1/qs.js'; 
  document.head.appendChild(queryString); 
  return setTimeout(resolve, 1000); 
}); 
getVideo = async () => { 
  await QsCdn(); 
  if (typeof Qs !== 'undefined'){ 
    console.log('Qs cdn imported.'); 
  } else { 
    alert('Wait for a second and try again~');
    return; 
  } 
  player = document.querySelector('#player'); 
  if(!player){ 
    alert('Something wrong! Refresh and try again!'); 
    return; 
  } 
  script = player.querySelectorAll('script')[1]; 
  if(!script){ 
    alert('Something wrong! Refresh and try again!'); 
    return; 
  } 
  json = script.innerHTML.match('ytplayer.config = ({.*?});')[1]; 
  if(!json){ 
    alert('Something wrong! Refresh and try again!'); 
    return; 
  } 
  let urlsObject; 
  try { 
    urlsObject = JSON.parse(json); 
  } catch(err) { 
    console.log(err); 
  } 
  let urls; 
  try { 
    urls = Qs.parse(urlsObject.args.url_encoded_fmt_stream_map); 
  } catch(err) { 
    console.log(err); 
  } 
  downloadSrc = urls.url; 
  if (typeof downloadSrc !== 'string'){ 
    downloadSrc = urls.url[0]; 
  } 
  dl = document.createElement('a'); 
  dl.href = downloadSrc; 
  dl.download = urlsObject.args.title; 
  dl.click(); 
}; 
getVideo()
  .then(()=>console.log('Have a nice day.'))
  .catch(e=>console.log(e));