/* Certification title normalization */
(function(){
  function normalizeCertificationTitles(){
    const section=document.querySelector('.certifications-grid');
    if(!section) return;
    const target='Conversion Optimization Certification Exam';
    const replacement='Conversion Optimization Certification';
    const walker=document.createTreeWalker(section,NodeFilter.SHOW_TEXT);
    const nodes=[];
    let node;
    while((node=walker.nextNode())) nodes.push(node);
    nodes.forEach(textNode=>{
      if(textNode.nodeValue.includes(target)){
        textNode.nodeValue=textNode.nodeValue.replaceAll(target,replacement);
      }
    });
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',normalizeCertificationTitles,{once:true});
  }else{
    normalizeCertificationTitles();
  }
})();
