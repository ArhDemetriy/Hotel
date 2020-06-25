$('.datepicker-here').datepicker({
  clearButton: true,
  setButton: true,
  altFieldDateFormat: 'dd.mm.yyyy',
  multipleDatesSeparator: ' - ',
  prevHtml: '<span class="datepicker__nav_arrow material-icons-outlined">arrow_back</span>',
  nextHtml: '<span class="datepicker__nav_arrow material-icons-outlined">arrow_forward</span>',
  navTitles: {
      days: 'MM yyyy'
  },
})