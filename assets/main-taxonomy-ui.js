// Seasonal selection shares references with their permanent family.
document.querySelector('[data-menu-action="christmas"]')?.addEventListener('click',()=>{
  clearAllFilters();
  searchInput.value='navidad';
  commitSearch();
});
