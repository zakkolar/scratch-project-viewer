export default function(input){
  if(!input){
    return null;
  }
  const matches = input.match(/https:\/\/scratch\.mit\.edu\/projects\/([0-9]+).*/);

  if(matches == null || matches.length<2){
    return null;
  }

  return matches[1];
}
