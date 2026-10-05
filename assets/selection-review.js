// ===== GMA V19 selected-review workflow =====
(function(){
try{GMAStorage.removeItem('gmaVisitIndex')}catch(e){}

  const selectedChip=document.getElementById('selectedChip');
  selectedChip?.addEventListener('click',(event)=>{
    event.preventDefault();
    event.stopPropagation();
    if(!favIds().length && !selectedOnly){
      showToast('Aún no has seleccionado productos');
      return;
    }

    selectedOnly = !selectedOnly;

    if(selectedOnly){
      // “Seleccionados” is a global review mode: previous catalogue filters
      // must not hide products that the commercial has already chosen.
      currentDept = 'all';
      onlyNew = false;
      countryFilter = ''; regionFilter = ''; familyFilter = '';
      searchTerm = '';
      const search = document.getElementById('searchInput');
      if(search) search.value = '';
      document.getElementById('clearSearch')?.classList.remove('show');
      document.getElementById('newChip')?.classList.remove('active');
      // section/family filters are reset for a global selected-products review.
      updateFilterBadge();
      resetOpenState();
    } else {
      resetOpenState();
    }

    selectedChip.classList.toggle('active',selectedOnly);
    document.body.classList.toggle('selected-review',selectedOnly);
    updateOriginCounts();
render();
    scrollToResults();
  });



  // Small haptic confirmation on supported phones.
  document.addEventListener('click',e=>{if(e.target.closest('.add-btn,#productSelectBtn')&&navigator.vibrate)navigator.vibrate(18);},{passive:true});

  // Navigate product sheet from keyboard without closing it.
  document.addEventListener('keydown',e=>{
    if(!productOpen)return;
    if(e.key==='ArrowRight') document.getElementById('productNextBtn')?.click();
    if(e.key==='ArrowLeft') document.getElementById('productPrevBtn')?.click();
  });
})();
