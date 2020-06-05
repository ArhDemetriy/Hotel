"use strict";
Window.sessionStorage.script_load = new Set();
Window.sessionStorage.script_load.loading = function (name_script) {
  if (Window.sessionStorage.script_load.has(name_script)) { return }

 };