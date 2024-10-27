// 初始化时设置class,避免闪烁
if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    globalThis.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
  // document.documentElement.classList.remove("light");
  // localStorage.setItem("color-theme", "dark");
} else {
  document.documentElement.classList.remove("dark");
  // document.documentElement.classList.add("light");
  // localStorage.setItem("color-theme", "light");
}
